import { UserActions, SystemActions } from "actions"

const userFilterConditions = (conditions = {
  name: null,
  phone_number: null,
  page: 1
}, action) => {
  switch (action.type) {
    case UserActions.SEARCH_USER_REQUEST:
      conditions.page = 1
      return Object.assign(conditions, action.data);
    case UserActions.PAGINATION_USER_REQUEST:
      return Object.assign(conditions, action.data);
    default:
      return conditions
  }
}

const users = (data = [], action) => {
  switch (action.type) {
    case UserActions.GET_USERS_SUCCESS:
      return action.data
    default:
      return data
  }
}

const updatePriceListForUserResult = (status = false, action) => {
  switch (action.type) {
    case UserActions.UPDATE_PRICE_LIST_FOR_USER_SUCCESS:
      return true
    default:
      return status
  }
}
export {
  userFilterConditions,
  users,
  updatePriceListForUserResult
}