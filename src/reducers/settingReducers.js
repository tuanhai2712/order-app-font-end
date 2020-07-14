import { SettingActions } from "actions"

const settings = (data = {}, action) => {
  switch (action.type) {
    case SettingActions.GET_SETTING_SUCCESS:
      localStorage.setItem("settings", JSON.stringify(action.data))
      return action.data
    case SettingActions.CHANGE_SETTING_SUCCESS:
      localStorage.setItem("settings", JSON.stringify(action.data))
      return action.data
    default:
      return data
  }
}

export {
  settings,
}