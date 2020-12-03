import { SET_EXPENSES, SET_EXPENSES_CATEGORIES } from "./actions";

const initialState = {
  expenses: [],
  expensesCategories: []
}

export function reducers(state = initialState, action) {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.expenses
      }
    case SET_EXPENSES_CATEGORIES:
      return {
        ...state,
        expensesCategories: action.expensesCategories
      }
    default:
      return state
  }
}
