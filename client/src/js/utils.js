import { Platform } from "react-native";

export const isNative = () => Platform.select({
  native: () => true,
  default: () => false
})();

export const objectDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const calculateSum = expenses => expenses
  .reduce((total, curr) => ({amount: total.amount + curr.amount}), {amount: 0})
  .amount;

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  const year = date.getFullYear();
  return `${year}.${month}`;
}

/** 
 * @function
 * @param {string} amount - string value that comes from input
 * @returns {boolean}  true if amount is a valid value
*/
export const validateAmount = (amount) => /^[0-9]+$/.test(amount); // accepts only solid numbers

export const sortExpensesByDate = expenses => {
  expenses.sort((exp1, exp2) => exp1.date < exp2.date ? 1 : -1);
}

export const sortExpensesByPrice = expenses => {
  expenses.sort((exp1, exp2) => exp1.amount < exp2.amount ? 1 : -1);
}

export const sortExpensesByCategory = expenses => {
  expenses.sort((exp1, exp2) => exp1.category < exp2.category ? 1 : -1);
}

export const groupExpensesByMonth = expensesArray => {
  let expensesObj = {};
  expensesArray.forEach(exp => {
    expensesObj = appendExpense(expensesObj, exp);
  });
  return expensesObj;
}

export const expensesArrayToObj = (expenses) => expenses.reduce((prev, curr) => {
  prev[curr.category] = (prev[curr.category] || 0) + curr.amount;
  return prev
}, {})

/** 
 * @function
 * @param {Object} expensesObj - expenses object that we want to append new expense to
 * @param {Object} newExpense - expense that we want to append to expenses obj
 * @returns {Object}  New object with appended expense
*/
export const appendExpense = (expensesObj, newExpense) => {
  const formatedDate = formatDate(newExpense.date);
  const deepCopy = objectDeepCopy(expensesObj); // Creates deep copy of an object. Works only for simple object, without function, etc.
  if(deepCopy[formatedDate]) {
    deepCopy[formatedDate].push(newExpense);
  } else {
    deepCopy[formatedDate] = [newExpense];
  }
  sortExpensesByDate(deepCopy[formatedDate]);
  return deepCopy;
}

/** 
 * @function
 * @param {Object} expensesObj - expenses object we want to delete specific expense from
 * @param {Object} expToDelete - expense to delete from expenses object
 * @returns {Object}  New object with deleted expense
*/
export const deleteExpense = (expensesObj, expToDelete) => {
  const formatedDate = formatDate(expToDelete.date);
  const deepCopy = JSON.parse(JSON.stringify(expensesObj)); // Creates deep copy of an object. Works only for simple object, without function, etc.
  return {
    ...deepCopy,
    [formatedDate]: deepCopy[formatedDate].filter(exp => exp.date !== expToDelete.date),
  }
}
