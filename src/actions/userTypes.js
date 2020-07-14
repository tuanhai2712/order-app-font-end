const GET_USERS_REQUEST = "GET_USERS_REQUEST"
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"

const SEARCH_USER_REQUEST = "SEARCH_USER_REQUEST"
const PAGINATION_USER_REQUEST = "PAGINATION_USER_REQUEST"

const UPDATE_PRICE_LIST_FOR_USER = "UPDATE_PRICE_LIST_FOR_USER"
const UPDATE_PRICE_LIST_FOR_USER_SUCCESS = "UPDATE_PRICE_LIST_FOR_USER_SUCCESS"


const updatePriceListForUser = (data) => {
  return {
    type: UPDATE_PRICE_LIST_FOR_USER,
    data
  }
}
const getUsers = (data) => {
  return {
    type: GET_USERS_REQUEST,
    data,
  }
}
const search = (data) => {
  return {
    type: SEARCH_USER_REQUEST,
    data,
  }
}
const pagination = (data) => {
  return {
    type: PAGINATION_USER_REQUEST,
    data,
  }
}

export default {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  getUsers,
  PAGINATION_USER_REQUEST,
  pagination,
  SEARCH_USER_REQUEST,
  search,
  UPDATE_PRICE_LIST_FOR_USER,
  UPDATE_PRICE_LIST_FOR_USER_SUCCESS,
  updatePriceListForUser
}