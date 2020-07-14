import { SettingActions, SystemActions } from "actions";
import { put, takeLatest, call } from 'redux-saga/effects';
import api from "constants/api";
import { postJWT, getJWT } from "config/axiosConfig";

function* doChangeSetting(data) {
  let error = null;
  let response = null;
  let formData = new FormData()
  const { field, file, exchange_rate } = data.data
  formData.append('field', field)
  if (file) {
    formData.append('file', file)
  }
  if (exchange_rate) {
    formData.append('exchange_rate', exchange_rate)
  }
  try {
    yield postJWT('change-setting', formData)
    .then((res) => {
      response = res
    })
    .catch((err) => {
      error = err
    })
    if (response.status === api.HTTP_OK) {
      yield put({type: SettingActions.CHANGE_SETTING_SUCCESS, data: response.data})
    }
  }
  catch(error) {
    yield put({type: SystemActions.SYSTEM_ERROR})
  }
}

export function* changeSetting() {
  yield takeLatest(SettingActions.CHANGE_SETTING_REQUEST, doChangeSetting);
}

function* doGetSettings() {
  let error = null;
  let response = null;
  try {
    yield getJWT('setting')
    .then((res) => {
      response = res
    })
    .catch((err) => {
      error = err
    })
    if (response.status === api.HTTP_OK) {
      yield put({type: SettingActions.GET_SETTING_SUCCESS, data: response.data})
    }
  }
  catch(error) {
    yield put({type: SystemActions.SYSTEM_ERROR})
  }
}

export function* getSettings() {
  yield takeLatest(SettingActions.GET_SETTING_REQUEST, doGetSettings);
}

function* doGetOverview() {
  let error = null;
  let response = null;
  try {
    yield getJWT('overview')
    .then((res) => {
      response = res
    })
    .catch((err) => {
      error = err
    })
    if (response.status === api.HTTP_OK) {
      localStorage.setItem("customers", JSON.stringify(response.data.customers))
      localStorage.setItem("overview", JSON.stringify(response.data.overview))
    }
  }
  catch(error) {
    yield put({type: SystemActions.SYSTEM_ERROR})
  }
}

export function* getOverview() {
  yield takeLatest(SettingActions.GET_OVERVIEW_REQUEST, doGetOverview);
}

