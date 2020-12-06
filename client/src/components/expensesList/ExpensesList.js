
import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

export const ExpensesList = () => {
  const expenses = useSelector(state => state.expenses);

  const renderExpenseItem = (listItem) => <Text key={listItem._id} >{listItem.description}, cat: {listItem.category}, amount: {listItem.amount}</Text>;

  const renderExpenseList = list => list.map(item => renderExpenseItem(item));

  return (
    <>
      <Text>List of expenses:</Text>
      {renderExpenseList(expenses)}
    </>
  );
}
