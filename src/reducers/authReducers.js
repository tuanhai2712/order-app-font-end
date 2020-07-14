import { AuthActions } from "actions"

const registered = (data = {}, action) => {
  switch (action.type) {
    case AuthActions.REGISTER_SUCCESS:
      return action.data
    case AuthActions.REGISTER_FAIL:
      return action.data
    default:
      return data
  }
}

const logged = (data = {}, action) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token)
      localStorage.setItem("user", JSON.stringify(action.data.user))
      localStorage.setItem("customers", JSON.stringify(action.data.customers))
      localStorage.setItem("overview", JSON.stringify(action.data.overview))
      return window.location.href="/"
    default:
      return data
  }
}
const resetPassword = (data = {}, action) => {
  switch (action.type) {
    case AuthActions.RESET_PASSWORD_SUCCESS:
      localStorage.clear()
      return window.location.href="/dang-nhap"
    case AuthActions.RESET_PASSWORD_FAIL:
      return action.data
    default:
      return data
  }
}

export {
  registered,
  logged,
  resetPassword
}