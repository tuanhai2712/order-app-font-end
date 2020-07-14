import { UserActions, SystemActions } from "actions";
import { put, takeLatest, call } from 'redux-saga/effects';
import { postJWT } from "config/axiosConfig"
import api from "constants/api";

function* doGetUser(data) {
  let error = null;
  let response = null;
  yield postJWT('get-user', data.data)
  .then((res) => {
    response = res
  })
  .catch((err) => {
    error = err
  })
  if (response.status === api.HTTP_OK) {
    yield put({type: UserActions.GET_USERS_SUCCESS, data: response.data})
  } else {
    yield put({type: SystemActions.SYSTEM_ERROR})
  }
}

export function* getUser() {
  yield takeLatest(UserActions.GET_USERS_REQUEST, doGetUser);
  yield takeLatest(UserActions.SEARCH_USER_REQUEST, doGetUser);
  yield takeLatest(UserActions.PAGINATION_USER_REQUEST, doGetUser);
}

function* doUpdatePriceListForUser(data) {
  let error = null;
  let response = null;
  yield postJWT('update-price-list', data.data)
  .then((res) => {
    response = res
  })
  .catch((err) => {
    error = err
  })
  if (response.status === api.HTTP_OK) {
    yield put({type: UserActions.UPDATE_PRICE_LIST_FOR_USER_SUCCESS})
  } else {
    yield put({type: SystemActions.SYSTEM_ERROR})
  }
}

export function* updatePriceListForUser() {
  yield takeLatest(UserActions.UPDATE_PRICE_LIST_FOR_USER, doUpdatePriceListForUser);
}
