import {
  SET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SET_EXPENSES_CATEGORIES,
  SET_SUM,
  SORT_MONTH_EXPENSES_BY_PRICE,
  SORT_MONTH_EXPENSES_BY_DATE,
  SORT_MONTH_EXPENSES_BY_CATEGORY,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_LOGIN_SUCCESS,
  SET_NOTIFICATION_LOGIN_FAIL,
  SET_NOTIFICATION_AMOUNT_REQUIRED,
  SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED,
} from "./actions";

import {
  appendExpense,
  deleteExpense,
  objectDeepCopy,
  sortExpensesByPrice,
  sortExpensesByDate,
  sortExpensesByCategory,
} from "../js/utils";

const initialState = {
  expenses: {},
  expensesCategories: [],
  showNotification: {},
  sum: false,
};

export function reducers(state = initialState, action) {
  switch (action.type) {
    // expenses
    case SET_EXPENSES: {
      return {
        ...state,
        expenses: { ...action.expenses, ...state.expenses },
      };
    }
    case ADD_EXPENSE: {
      return {
        ...state,
        expenses: appendExpense(state.expenses, action.expense),
      };
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
        expenses: deleteExpense(state.expenses, action.expense),
      };
    }
    case SET_EXPENSES_CATEGORIES: {
      return {
        ...state,
        expensesCategories: action.expensesCategories,
      };
    }
    case SET_SUM: {
      return {
        ...state,
        sum: action.sum,
      };
    }
    case SORT_MONTH_EXPENSES_BY_DATE: {
      const newState = objectDeepCopy(state);
      sortExpensesByDate(newState.expenses[action.month]);
      return newState;
    }
    case SORT_MONTH_EXPENSES_BY_PRICE: {
      const newState = objectDeepCopy(state);
      sortExpensesByPrice(newState.expenses[action.month]);
      return newState;
    }
    case SORT_MONTH_EXPENSES_BY_CATEGORY: {
      const newState = objectDeepCopy(state);
      sortExpensesByCategory(newState.expenses[action.month]);
      return newState;
    }
    // notifications
    case CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        showNotification: {},
      };
    }
    case SET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          success: action.state,
        },
      };
    }
    case SET_NOTIFICATION_FAIL: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          fail: action.state,
        },
      };
    }
    case SET_NOTIFICATION_LOGIN_SUCCESS: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          loginSuccess: action.state,
        },
      };
    }
    case SET_NOTIFICATION_LOGIN_FAIL: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          loginFail: action.state,
        },
      };
    }
    case SET_NOTIFICATION_AMOUNT_REQUIRED: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          amountRequired: action.state,
        },
      };
    }
    case SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED: {
      return {
        ...state,
        showNotification: {
          ...state.showNotification,
          emailAndPassRequired: action.state,
        },
      };
    }
    default:
      return state;
  }
}
