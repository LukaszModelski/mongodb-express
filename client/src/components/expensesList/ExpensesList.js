import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ExpensesListItem } from './expensesListItem/ExpensesListItem';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, setExpensesCategories, setSum } from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { colors } from "../../vars/colors";
import { listStyles } from "./ExpensesList.styles";
import { fetchExpenses, handleAPIerror } from "../../js/api";
import { calculateSum } from "../../js/utils";

export const ExpensesList = ({navigation}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const sum = useSelector(state => state.sum);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if(!fetched) {
        setIsLoading(true);
        const initExpenses = async () => {
          try {
            const response = await fetchExpenses();
            dispatch(setExpenses(response.data.expenses));
            dispatch(setExpensesCategories(response.data.categories));
            setFetched(true);
          } catch (error) {
            handleAPIerror(error, navigation);
          } finally {
            setIsLoading(false);
          }
        }
        initExpenses();
      }
    }, [fetched])
  );

  useEffect(() => {
    if(expenses.length !== 0) {
      dispatch(setSum(calculateSum(expenses)));
    }
  }, [expenses]);

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
