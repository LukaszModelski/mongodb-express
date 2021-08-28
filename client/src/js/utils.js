import { Platform } from "react-native";

export const isNative = () => Platform.select({
  native: () => true,
  default: () => false
})();

export const calculateSum = expenses => expenses
  .reduce((total, curr) => ({amount: total.amount + curr.amount}), {amount: 0})
  .amount;

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}.${date.getFullYear()}`;
}

export const sortExpenses = expenses => {
  expenses.sort((exp1, exp2) => exp1.date < exp2.date ? 1 : -1);
}

export const groupExpensesByMounth = expensesArray => {
  const expensesObj = {};
  expensesArray.forEach(exp => {
    appendExpense(expensesObj, exp);
  });
  return expensesObj;
}

export const appendExpense = (expensesObj, newExpense) => {
  const formatedDate = formatDate(newExpense.date);
  if(expensesObj[formatedDate]) {
    expensesObj[formatedDate].push(newExpense);
  } else {
    expensesObj[formatedDate] = [newExpense];
  }
  sortExpenses(expensesObj[formatedDate]);
}
