// action types 
export const SET_EXPENSES = 'SET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_EXPENSES_CATEGORIES = 'SET_EXPENSES_CATEGORIES';

// action creators
export function setExpenses(expenses) {
  return { type: SET_EXPENSES, expenses }
}

export function addExpense(expense) {
  return { type: ADD_EXPENSE, expense }
}

export function setExpensesCategories(expensesCategories) {
  return { type: SET_EXPENSES_CATEGORIES, expensesCategories }
}
