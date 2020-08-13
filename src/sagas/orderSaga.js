import { OrderActions, SystemActions } from 'actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { postJWT, getJWT } from 'config/axiosConfig';
import api from 'constants/api';
const user = JSON.parse(localStorage.getItem('user'));

function* doGetOrderCheck(data) {
  let response = null;
  yield postJWT('get-order-check', data.data)
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({
      type: OrderActions.GET_ORDER_CHECK_SUCCESS,
      data: response.data,
    });
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* getOrderCheck() {
  yield takeLatest(OrderActions.GET_ORDER_CHECK_REQUEST, doGetOrderCheck);
  yield takeLatest(OrderActions.SEARCH_ORDER_REQUEST, doGetOrderCheck);
  yield takeLatest(OrderActions.PAGINATION_REQUEST, doGetOrderCheck);
}

function* doCreateOrder(data) {
  let response = null;
  let formData = new FormData();
  const {
    customer_id,
    link,
    files,
    user_id,
    role,
    ty_gia,
    ten_san_pham,
    note,
    chuyen_nhanh,
  } = data.data;
  formData.append('customer_id', customer_id);
  formData.append('link', link);
  formData.append('user_id', user_id);
  formData.append('role', role);
  formData.append('ty_gia', ty_gia);
  formData.append('ten_san_pham', ten_san_pham);
  formData.append('chuyen_nhanh', chuyen_nhanh);
  formData.append('note', note);
  if (files && files.length) {
    files.map((file) => {
      formData.append('files[]', file);
    });
  }
  yield postJWT('create', formData)
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({ type: OrderActions.CREATE_ORDER_SUCCESS, data: response.data });
    yield call(doGetOrderCheck, {
      data: {
        user_id: user.id,
        tinh_trang: 8,
        role: user.role,
        tu_ngay: null,
        den_ngay: null,
        ma_don_hang: null,
        customer_id: null,
        page: 1,
      },
    });
    yield takeLatest(OrderActions.GET_ORDER_CHECK_REQUEST, doGetOrderCheck);
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* createOrder() {
  yield takeLatest(OrderActions.CREATE_ORDER_REQUEST, doCreateOrder);
}

function* doGetImageOrder(data) {
  let response = null;
  yield postJWT('get-image-order', { order_id: data.orderId })
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({
      type: OrderActions.GET_IMAGE_ORDER_SUCCESS,
      data: response.data,
    });
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* getImageOrder() {
  yield takeLatest(OrderActions.GET_IMAGE_ORDER, doGetImageOrder);
}
function* doUpdateOrder(data) {
  let response = null;
  yield postJWT('update-order', data.data)
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({ type: OrderActions.UPDATE_ORDER_SUCCESS, data: response.data });
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* updateOrder() {
  yield takeLatest(OrderActions.UPDATE_ORDER, doUpdateOrder);
}

function* doConfirmOrder(data) {
  let response = null;
  yield postJWT('confirm-order', data.data)
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({
      type: OrderActions.CONFIRM_ORDER_SUCCESS,
      data: response.data,
    });
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* confirmOrder() {
  yield takeLatest(OrderActions.CONFIRM_ORDER, doConfirmOrder);
}

function* doGetOrderBeingTransportedStatus() {
  let response = null;
  yield getJWT('get-order-being-transported-status')
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  if (response.status === api.HTTP_OK) {
    yield put({
      type: OrderActions.ORDER_BEING_TRANSPORTED_STATUS_SUCCESS,
      data: response.data,
    });
  } else {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* getOrderBeingTransportedStatus() {
  yield takeLatest(
    OrderActions.ORDER_BEING_TRANSPORTED_STATUS_REQUEST,
    doGetOrderBeingTransportedStatus
  );
}

function* doCheckBarcode(data) {
  let response = null;
  try {
    yield postJWT('check-barcode', data.data)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.status === api.HTTP_OK) {
      yield put({
        type: OrderActions.CHECK_BARCODE_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* checkBarcode() {
  yield takeLatest(OrderActions.CHECK_BARCODE_REQUEST, doCheckBarcode);
}

function* doImportWaybillCode(data) {
  let response = null;
  let formData = new FormData();
  const { file, type } = data.data;
  formData.append('file', file);
  formData.append('type', parseInt(type));
  try {
    yield postJWT('import', formData)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.data.code === api.HTTP_OK) {
      yield put({
        type: OrderActions.IMPORT_WAYBILL_CODE_SUCCESS,
        data: response.data,
      });
    }
    if (response.data.code === api.HTTP_ERROR) {
      yield put({
        type: OrderActions.IMPORT_WAYBILL_CODE_FAIL,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* importWaybillCode() {
  yield takeLatest(
    OrderActions.IMPORT_WAYBILL_CODE_REQUEST,
    doImportWaybillCode
  );
}
function* doFindWaybillCode(data) {
  let response = null;
  try {
    yield postJWT('find-waybill-code', data.data)
      .then((res) => {
        response = res;
      })
      .catch((err) => {});
    if (response.status === api.HTTP_OK) {
      yield put({
        type: OrderActions.FIND_WAYBILL_CODE_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({ type: SystemActions.SYSTEM_ERROR });
  }
}

export function* findWaybillCode() {
  yield takeLatest(OrderActions.FIND_WAYBILL_CODE_REQUEST, doFindWaybillCode);
}
