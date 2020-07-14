import { OrderActions, SystemActions } from "actions"
import orderTypes from "actions/orderTypes";
const token = localStorage.getItem("token")
let userId = null;
let role = null;
if (token) {
  const user = JSON.parse(localStorage.getItem("user"))
  userId = user.id
  role = user.role
}
const filterConditions = (conditions = {
  user_id: userId,
  tinh_trang: 8,
  role,
  tu_ngay: null,
  den_ngay: null,
  ma_don_hang: null,
  customer_id: null,
  page: 1
}, action) => {
  switch (action.type) {
    case orderTypes.SEARCH_ORDER_REQUEST:
      conditions.page = 1
      return Object.assign(conditions, action.data);
    case orderTypes.PAGINATION_REQUEST:
      return Object.assign(conditions, action.data);
    default:
      return conditions
  }
}

const orders = (data = [], action) => {
  switch(action.type) {
    case OrderActions.GET_ORDER_CHECK_SUCCESS:
      return action.data
    case OrderActions.UPDATE_ORDER_SUCCESS:
      const orderUpdated = action.data
      data.data.find((i, k) => {
        if (i.id === orderUpdated.id) {
          data.data[k] = orderUpdated
        }
      })
      return data
    case OrderActions.CONFIRM_ORDER_SUCCESS:
      const confirmed = action.data
      data.data.find((i, k) => {
        if (i.id === confirmed.id) {
          data.data[k].tinh_trang = confirmed.tinh_trang
        }
      })
      return data
    default:
      return data
  }
}

const confirmOrderResult = (data = {}, action) => {
  switch (action.type) {
    case OrderActions.CONFIRM_ORDER_SUCCESS:
      return action.data
    default:
      return data
  }
}

const imageOrders = (data = [], action) => {
  switch(action.type) {
    case OrderActions.GET_IMAGE_ORDER_SUCCESS:
      return action.data.images
    default:
      return data
  }
}

const createOrderResult = (status = false, action) => {
  switch(action.type) {
    case OrderActions.CREATE_ORDER_SUCCESS:
      return true
    case SystemActions.CLEAR:
      return false
    default:
      return status
  }
}

const updateOrderResult = (status = false, action) => {
  switch(action.type) {
    case OrderActions.UPDATE_ORDER_SUCCESS:
      return true
    case SystemActions.CLEAR:
      return false
    default:
      return status
  }
}

const orderBeingTransportedStatus = (data = [], action) => {
  switch(action.type) {
    case OrderActions.ORDER_BEING_TRANSPORTED_STATUS_SUCCESS:
      return action.data
    default:
      return data
  }
}

const checkBarcodeResult = (status = false, action) => {
  switch(action.type) {
    case OrderActions.CHECK_BARCODE_SUCCESS:
      return true
    case SystemActions.CLEAR:
      return false
    default:
      return status
  }
}

const importWaybillCodeResult = (data = {}, action) => {
  switch(action.type) {
    case OrderActions.IMPORT_WAYBILL_CODE_SUCCESS:
      return action.data
    case OrderActions.IMPORT_WAYBILL_CODE_FAIL:
      return action.data
    case SystemActions.CLEAR:
      return {}
    default:
      return data
  }
}
const findWaybillCodeResult = (data = {}, action) => {
  switch(action.type) {
    case OrderActions.FIND_WAYBILL_CODE_SUCCESS:
      return action.data
    default:
      return data
  }
}
export {
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
}