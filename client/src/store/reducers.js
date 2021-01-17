import {
  SET_EXPENSES,
  SET_EXPENSES_CATEGORIES,
  ADD_EXPENSE,
  SET_LOADER_STATE,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_AMOUNT_REQUIRED
} from "./actions";

const initialState = {
  expenses: [],
  expensesCategories: [],
  loaderActive: false,
  showNotification: {
    success: false,
    fail: false,
    amountRequired: false
  }
}

export function reducers(state = initialState, action) {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.expenses
      }
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          action.expense
        ]
      }
    case SET_EXPENSES_CATEGORIES:
      return {
        ...state,
        expensesCategories: action.expensesCategories
      }
    case SET_LOADER_STATE:
      return {
        ...state,
        loaderActive: action.state
      }
    case SET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          success: action.state
        }
      }
    case SET_NOTIFICATION_FAIL:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          fail: action.state
        }
      }
    case SET_NOTIFICATION_AMOUNT_REQUIRED:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          amountRequired: action.state
        }
      }
    default:
      return state
  }
}
