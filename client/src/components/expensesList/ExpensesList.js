import React, { useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ExpensesListItem } from './expensesListItem/ExpensesListItem';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, setExpensesCategories } from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { colors } from "../../vars/colors";
import { listStyles } from "./ExpensesList.styles";
import { fetchExpenses, handleAPIerror } from "../../js/api";

export const ExpensesList = ({navigation}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const [sum, setSum] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(() => {
      if(expenses.length === 0) {
        setIsLoading(true);
        const initExpenses = async () => {
          try {
            const response = await fetchExpenses();
            dispatch(setExpenses(response.data.expenses));
            dispatch(setExpensesCategories(response.data.categories));
            setSum(calculateSum(response.data.expenses));
          } catch (error) {
            handleAPIerror(error, navigation);
          } finally {
            setIsLoading(false);
          }
        }
        initExpenses();
      }
  }, []);

  const calculateSum = (expensesArray) => {
    return expensesArray.reduce((prev, curr) => {
      return {amount: prev.amount + curr.amount}
    }).amount;
  }

  const renderExpenseList = list => {
    return <View  style={listStyles.list}>
      {list.map(item => <ExpensesListItem key={item._id} item={item}/>)}
    </View>
  }
  
  return (
    <View style={viewStyles.container}>
      <ScrollView>
      {renderExpenseList(expenses)}
      {sum ? <Text style={listStyles.sum}>Sum: {sum} zł</Text> : <></>}
      {isLoading 
        ? <ActivityIndicator
          size="large"
          color={colors.blue}
          style={utilStyles.marginBottom20}
        />
        : <></>}
      <Button
        title="New expense"
        onPress={() => navigation.navigate('AddExpenseForm')}
        />
      </ScrollView>
    </View>
  );
}
