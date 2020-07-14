const REGISTER_REQUEST = "REGISTER_REQUEST"
const REGISTER_SUCCESS = "REGISTER_SUCCESS"

const LOGIN_REQUEST = "LOGIN_REQUEST"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"

const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"
const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL"

const register = (data) => {
  return {
    type: REGISTER_REQUEST,
    data,
  }
}

const login = (data) => {
  return {
    type: LOGIN_REQUEST,
    data
  }
}

const resetPassword = (data) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    data
  }
}
export default {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  register,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  login,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  resetPassword
}