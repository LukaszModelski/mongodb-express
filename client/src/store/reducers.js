import {
  SET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SET_EXPENSES_CATEGORIES,
  SET_SUM,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_LOGIN_SUCCESS,
  SET_NOTIFICATION_LOGIN_FAIL,
  SET_NOTIFICATION_AMOUNT_REQUIRED,
  SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED
} from "./actions";

import { appendExpense } from "../js/utils";

const initialState = {
  expenses: {},
  expensesCategories: [],
  showNotification: {},
  sum: false
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
      const expensesObj = {...state.expenses};
      appendExpense(expensesObj, action.expense);
      return {
        ...state,
        expenses: expensesObj,
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
    case SET_SUM:
      return {
        ...state,
        sum: action.sum
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
