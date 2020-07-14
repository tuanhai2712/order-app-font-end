import { combineReducers } from "redux";
import { registered, logged, resetPassword } from "./authReducers";
import { loading, updateOrderLoading, confirmOrderLoading, changeSettingLoading, updatePriceListLoading } from "./loadingReducers";
import { system_error } from "./systemReducers";
import {
  filterConditions,
  orders,
  imageOrders,
  createOrderResult,
  updateOrderResult,
  confirmOrderResult,
  orderBeingTransportedStatus,
  checkBarcodeResult,
  importWaybillCodeResult,
  findWaybillCodeResult
} from "./orderReducers";

import { settings } from "./settingReducers";
import { userFilterConditions, users, updatePriceListForUserResult } from "./userReducers";

const allReducer = combineReducers({
  registered,
  logged,
  loading,
  updateOrderLoading,
  confirmOrderLoading,
  system_error,
  filterConditions,
  orders,
  imageOrders,
  createOrderResult,
  updateOrderResult,
  confirmOrderResult,
  orderBeingTransportedStatus,
  checkBarcodeResult,
  settings,
  changeSettingLoading,
  resetPassword,
  importWaybillCodeResult,
  findWaybillCodeResult,
  userFilterConditions,
  users,
  updatePriceListForUserResult,
  updatePriceListLoading
})

export default allReducer;