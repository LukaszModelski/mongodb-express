
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, setExpensesCategories } from "../../store/actions";
import { viewStyles } from "../view/view.styles";
import axios from 'axios';

export const ExpensesList = ({navigation}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);

  useEffect(() => {
    axios.get('https://nodejs-expenses.herokuapp.com/api/expense')
      .then(function (response) {
        dispatch(setExpenses(response.data.expenses));
        dispatch(setExpensesCategories(response.data.categories));
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const renderExpenseItem = (listItem) => <Text key={listItem._id} >{listItem.description}, cat: {listItem.category}, amount: {listItem.amount}</Text>;

  const renderExpenseList = list => list.map(item => renderExpenseItem(item));

  return (
    <View style={viewStyles.container}>
      <Text>List of expenses:</Text>
      {renderExpenseList(expenses)}
      <Button
        title="Add expense"
        onPress={() => navigation.navigate('AddExpenseForm')}
      />
    </View>
  );
}
