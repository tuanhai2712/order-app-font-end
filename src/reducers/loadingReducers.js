import { OrderActions, SettingActions, UserActions } from "actions"
const loading = (status = false, action) => {
  if (action.type.includes("_REQUEST")) {
    return true
  }
  if (action.type.includes("_SUCCESS")) {
    return false
  }
  return false
}

const updateOrderLoading = (status = false, action) => {
  switch(action.type) {
    case OrderActions.UPDATE_ORDER:
      return true
    case OrderActions.UPDATE_ORDER_SUCCESS:
      return false
    default:
      return status
  }
}

const confirmOrderLoading = (status = false, action) => {
  switch(action.type) {
    case OrderActions.CONFIRM_ORDER:
      return true
    case OrderActions.CONFIRM_ORDER_SUCCESS:
      return false
    default:
      return status
  }
}


const changeSettingLoading = (data = {field: "", status: false}, action) => {
  switch(action.type) {
    case SettingActions.CHANGE_SETTING_REQUEST:
      return {
        field: action.data.field,
        status: true
      }
    case SettingActions.CHANGE_SETTING_SUCCESS:
      return {field: "", status: false}
    default:
      return data
  }
}

const updatePriceListLoading = (status = false, action) => {
  switch(action.type) {
    case UserActions.UPDATE_PRICE_LIST_FOR_USER:
      return true
    case UserActions.UPDATE_PRICE_LIST_FOR_USER_SUCCESS:
      return false
    default:
      return status
  }
}
export {
  loading,
  updateOrderLoading,
  confirmOrderLoading,
  changeSettingLoading,
  updatePriceListLoading
}