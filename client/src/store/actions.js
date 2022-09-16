// action types 
// expenses
export const SET_EXPENSES = 'SET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EXPENSES_CATEGORIES = 'SET_EXPENSES_CATEGORIES';
export const SET_SUM = 'SET_SUM';
export const SORT_MONTH_EXPENSES_BY_PRICE = 'SORT_MONTH_EXPENSES_BY_PRICE';
export const SORT_MONTH_EXPENSES_BY_DATE = 'SORT_MONTH_EXPENSES_BY_DATE';
export const SORT_MONTH_EXPENSES_BY_CATEGORY = 'SORT_MONTH_EXPENSES_BY_CATEGORY';
// notifications
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const SET_NOTIFICATION_SUCCESS = 'SET_NOTIFICATION_SUCCESS';
export const SET_NOTIFICATION_FAIL = 'SET_NOTIFICATION_FAIL';
export const SET_NOTIFICATION_LOGIN_SUCCESS = 'SET_NOTIFICATION_LOGIN_SUCCESS';
export const SET_NOTIFICATION_LOGIN_FAIL = 'SET_NOTIFICATION_LOGIN_FAIL';
export const SET_NOTIFICATION_AMOUNT_REQUIRED = 'SET_NOTIFICATION_AMOUNT_REQUIRED';
export const SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED = 'SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED';

// action creators
// expenses
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

export function setSum(sum) {
  return { type: SET_SUM, sum }
}

export function sortMonthExpensesByDate(month) {
  return { type: SORT_MONTH_EXPENSES_BY_DATE, month }
}

export function sortMonthExpensesByPrice(month) {
  return { type: SORT_MONTH_EXPENSES_BY_PRICE, month }
}

export function sortMonthExpensesByCategory(month) {
  return { type: SORT_MONTH_EXPENSES_BY_CATEGORY, month }
}

// notifications
export function clearNotifications() {
  return { type: CLEAR_NOTIFICATIONS }
}

export function setNotificationSuccess(state) {
  return { type: SET_NOTIFICATION_SUCCESS, state }
}

export function setNotificationFail(state) {
  return { type: SET_NOTIFICATION_FAIL, state }
}

export function setNotificationLoginSuccess(state) {
  return { type: SET_NOTIFICATION_LOGIN_SUCCESS, state }
}

export function setNotificationLoginFail(state) {
  return { type: SET_NOTIFICATION_LOGIN_FAIL, state }
}

export function setNotificationAmountRequired(state) {
  return { type: SET_NOTIFICATION_AMOUNT_REQUIRED, state }
}

export function setNotificationEmailAndPassRequired(state) {
  return { type: SET_NOTIFICATION_EMAIL_AND_PASS_REQUIRED, state }
}
