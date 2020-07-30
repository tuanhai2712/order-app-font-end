import { AuthActions, SystemActions } from 'actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { post, postJWT } from 'config/axiosConfig';
import api from 'constants/api';

function* doRegister(data) {
  let response = null;
  try {
    yield post('signup', data.data)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.status === api.HTTP_OK) {
      yield call(doLogin, {
        data: {
          email: data.data.email,
          password: data.data.password,
        },
      });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* register() {
  yield takeLatest(AuthActions.REGISTER_REQUEST, doRegister);
}

function* doLogin(data) {
  let response = null;
  try {
    yield post('login', data.data)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.status === api.HTTP_OK) {
      yield put({ type: AuthActions.LOGIN_SUCCESS, data: response.data });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* login() {
  yield takeLatest(AuthActions.LOGIN_REQUEST, doLogin);
}

function* doResetPassword(data) {
  let response = null;
  try {
    yield postJWT('reset-password', data.data)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.data.code === api.HTTP_OK) {
      yield put({
        type: AuthActions.RESET_PASSWORD_SUCCESS,
        data: response.data,
      });
    }
    if (response.data.code === api.HTTP_ERROR) {
      yield put({ type: AuthActions.RESET_PASSWORD_FAIL, data: response.data });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* resetPassword() {
  yield takeLatest(AuthActions.RESET_PASSWORD_REQUEST, doResetPassword);
}
