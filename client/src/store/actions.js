// action types 
export const SET_EXPENSES = 'SET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EXPENSES_CATEGORIES = 'SET_EXPENSES_CATEGORIES';
export const SET_NOTIFICATION_SUCCESS = 'SET_NOTIFICATION_SUCCESS';
export const SET_NOTIFICATION_FAIL = 'SET_NOTIFICATION_FAIL';
export const SET_NOTIFICATION_AMOUNT_REQUIRED = 'SET_NOTIFICATION_AMOUNT_REQUIRED';

// action creators
export function setExpenses(expenses) {
  return { type: SET_EXPENSES, expenses }
}

export function addExpense(expense) {
  return { type: ADD_EXPENSE, expense }
}

export function deleteExpense(expense) {
  return { type: DELETE_EXPENSE, expense }
}

export function setExpensesCategories(expensesCategories) {
  return { type: SET_EXPENSES_CATEGORIES, expensesCategories }
}

export function setNotificationSuccess(state) {
  return { type: SET_NOTIFICATION_SUCCESS, state }
}

export function setNotificationFail(state) {
  return { type: SET_NOTIFICATION_FAIL, state }
}

export function setNotificationAmountRequired(state) {
  return { type: SET_NOTIFICATION_AMOUNT_REQUIRED, state }
}
