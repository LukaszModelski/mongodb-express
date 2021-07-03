import { Platform } from "react-native";

export const isNative = () => Platform.select({
  native: () => true,
  default: () => false
})();

export const calculateSum = expenses => expenses
  .reduce((total, curr) => ({amount: total.amount + curr.amount}), {amount: 0})
  .amount;
