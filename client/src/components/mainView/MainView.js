import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setExpenses, setExpensesCategories } from "../../store/actions";
import axios from 'axios';

import { ExpensesList } from "../expensesList/ExpensesList";
import { AddExpenseForm } from "../addExpenseForm/AddExpenseForm";

export const MainView = () => {
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <AddExpenseForm />
      <ExpensesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
