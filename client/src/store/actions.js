// action types 
export const SET_EXPENSES = 'SET_EXPENSES';
export const SET_EXPENSES_CATEGORIES = 'SET_EXPENSES_CATEGORIES';

// action creators
export function setExpenses(expenses) {
  return { type: SET_EXPENSES, expenses }
}

export function setExpensesCategories(expensesCategories) {
  return { type: SET_EXPENSES_CATEGORIES, expensesCategories }
}
