import { Platform } from "react-native";

export const isNative = () => Platform.select({
  native: () => true,
  default: () => false
})();

export const calculateSum = expenses => expenses
  .reduce((total, curr) => ({amount: total.amount + curr.amount}), {amount: 0})
  .amount;

export const sortExpenses = expenses => {
  expenses.sort((exp1, exp2) => exp1.date < exp2.date ? 1 : -1);
}

export const groupExpensesByMounth = expenses => {
  const groupedExpenses = {};
  expenses.forEach(exp => {
    const date = new Date(exp.date);
    const formated = `${date.getMonth() + 1}.${date.getFullYear()}` 
    if(groupedExpenses[formated]) {
      groupedExpenses[formated].push(exp);
    } else {
      groupedExpenses[formated] = [exp];
    }
  });
  Object.values(groupedExpenses).forEach(arr => {
    sortExpenses(arr);
  });
  return groupedExpenses;
}
