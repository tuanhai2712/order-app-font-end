import { all } from 'redux-saga/effects'
import { register, login, resetPassword } from './authSaga'
import {
  getOrderCheck,
  createOrder,
  getImageOrder,
  updateOrder,
  confirmOrder,
  getOrderBeingTransportedStatus,
  checkBarcode,
  importWaybillCode,
  findWaybillCode
} from './orderSaga'

import { changeSetting, getSettings, getOverview } from './settingSaga';
import { getUser, updatePriceListForUser } from './userSaga';

export default function* rootSaga() {
  yield all([
    register(),
    login(),
    getOrderCheck(),
    createOrder(),
    getImageOrder(),
    updateOrder(),
    confirmOrder(),
    getOrderBeingTransportedStatus(),
    checkBarcode(),
    changeSetting(),
    getSettings(),
    resetPassword(),
    importWaybillCode(),
    findWaybillCode(),
    getOverview(),
    getUser(),
    updatePriceListForUser()
  ])
}