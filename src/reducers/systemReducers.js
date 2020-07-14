import { SystemActions } from "actions"

const system_error = (err = false, action) => {
  switch (action.type) {
    case SystemActions.SYSTEM_ERROR:
      return true
    default:
      return false
  }
}

export {
  system_error,
}