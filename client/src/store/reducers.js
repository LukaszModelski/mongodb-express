import {
  SET_EXPENSES,
  SET_EXPENSES_CATEGORIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_LOGIN_SUCCESS,
  SET_NOTIFICATION_LOGIN_FAIL,
  SET_NOTIFICATION_AMOUNT_REQUIRED,
  SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED
} from "./actions";

const initialState = {
  expenses: [],
  expensesCategories: [],
  showNotification: {}
}

export function reducers(state = initialState, action) {
  switch (action.type) {
    // expenses
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
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.expense._id)
      }
    case SET_EXPENSES_CATEGORIES:
      return {
        ...state,
        expensesCategories: action.expensesCategories
      }
    // notifications
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        showNotification: {}
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
    case SET_NOTIFICATION_LOGIN_SUCCESS:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          loginSuccess: action.state
        }
      }
    case SET_NOTIFICATION_LOGIN_FAIL:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          loginFail: action.state
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
    case SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED:
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          emailAndPassRequired: action.state
        }
      }
    default:
      return state
  }
}
