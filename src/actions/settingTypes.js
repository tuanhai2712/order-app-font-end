const CHANGE_SETTING_REQUEST = "CHANGE_SETTING_REQUEST"
const CHANGE_SETTING_SUCCESS = "CHANGE_SETTING_SUCCESS"

const GET_SETTING_REQUEST = "GET_SETTING_REQUEST"
const GET_SETTING_SUCCESS = "GET_SETTING_SUCCESS"

const GET_OVERVIEW_REQUEST = "GET_OVERVIEW_REQUEST"

const changeSetting = (data) => {
  return {
    type: CHANGE_SETTING_REQUEST,
    data,
  }
}

const getSettings = () => {
  return {
    type: GET_SETTING_REQUEST
  }
}

const getOverview = () => {
  return {
    type: GET_OVERVIEW_REQUEST
  }
}

export default {
  CHANGE_SETTING_REQUEST,
  CHANGE_SETTING_SUCCESS,
  changeSetting,
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  getSettings,
  GET_OVERVIEW_REQUEST,
  getOverview,
}