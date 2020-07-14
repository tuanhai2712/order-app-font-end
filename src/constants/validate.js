import { isEmpty, isNumber } from "lodash"
import regex from "./regex"

export const validateForm = (fields) => {
  let error = {}
  if (fields.name !== undefined) {
    if (isEmpty(fields.name)) {
      error.name = "Tên không được để trống"
    }
    if (fields.name.length > 50) {
      error.name = "Tên có tối đa 50 ký tự"
    }
  }
  if (fields.email !== undefined) {
    if (!regex.email.test(fields.email)) {
      error.email = "Email không đúng định dạng"
    }
  }
  if (fields.phone_number !== undefined) {
    if (!regex.phone_number.test(fields.phone_number)) {
      error.phone_number = "Số điện thoại không đúng định dạng"
    }
  }
  if (fields.address !== undefined) {
    if (fields.name.length > 500) {
      error.phone_number = "Địa chỉ có tối đa 500 ký tư"
    }
  }
  if (fields.password !== undefined) {
    if (isEmpty(fields.password)) {
      error.password = "Mật khẩu không được để trống"
    }
    if ((fields.confirm_password !== undefined) && (fields.password !== fields.confirm_password)) {
      error.confirm_password = "Mật khẩu không khớp"
    }
    if (fields.password.length < 8 || fields.password.length > 16) {
      error.password = "Mật khẩu phải có từ 8 - 16 ký tự"
    }
  }
  if (fields.current_password) {
    if (fields.new_password !== undefined) {
      if (isEmpty(fields.new_password)) {
        error.new_password = "Mật khẩu không được để trống"
      }
      if ((fields.confirm_new_password !== undefined) && (fields.new_password !== fields.confirm_new_password)) {
        error.confirm_new_password = "Mật khẩu không khớp với mật khẩu mới"
      }
      if (fields.new_password.length < 8 || fields.new_password.length > 16) {
        error.new_password = "Mật khẩu phải có từ 8 - 16 ký tự"
      }
    }
  }
  if (fields.tu_ngay !== undefined && fields.tu_ngay !== null) {
    if (!regex.date.test(fields.tu_ngay)) {
      error.tu_ngay = "Ngày không đúng định dạng"
    }
  }
  if (fields.den_ngay !== undefined && fields.den_ngay !== null) {
    if (!regex.date.test(fields.den_ngay)) {
      error.den_ngay = "Ngày không đúng định dạng"
    }
  }
  if (fields.link !== undefined) {
    if (isEmpty(fields.link)) {
      error.link = "Link đơn hàng không được để trống"
    }
  }
  if (fields.waybill_code !== undefined) {
    if (isEmpty(fields.waybill_code)) {
      error.waybill_code = "Mã vận đơn không được để trống"
    }
  }
  if (fields.khoi_luong !== undefined) {
    if (!fields.khoi_luong) {
      error.khoi_luong = "Bạn chưa nhập khối lượng đơn hàng"
    }
    if (!isNumber(parseInt(fields.khoi_luong))) {
      error.khoi_luong = "Khối lượng phải là số"
    }
  }
  if (fields.price1 !== undefined ||
    fields.price2 !== undefined ||
    fields.price3 !== undefined ||
    fields.price4 !== undefined
  ) {
    if (isNaN(fields.price1) ||
      isNaN(fields.price2) ||
      isNaN(fields.price3) ||
      isNaN(fields.price4)
    ) {
      error.price = "Vui lòng nhập số"
    }
  }
  return error
}
