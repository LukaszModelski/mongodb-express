import { SET_EXPENSES, SET_EXPENSES_CATEGORIES, ADD_EXPENSE } from "./actions";

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
    default:
      return state
  }
}
