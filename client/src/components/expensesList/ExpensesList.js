import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, setExpensesCategories } from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { colors } from "../../vars/colors";
import { listStyles } from "./ExpensesList.styles";
import { fetchExpenses } from "../../js/api";

export const ExpensesList = ({navigation}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const [sum, setSum] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const initExpenses = async () => {
      try {
        const response = await fetchExpenses();
        dispatch(setExpenses(response.data.expenses));
        dispatch(setExpensesCategories(response.data.categories));
        setSum(calculateSum(response.data.expenses));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initExpenses();
  }, []);

  const calculateSum = (expensesArray) => {
    return expensesArray.reduce((prev, curr) => {
      return {amount: prev.amount + curr.amount}
    }).amount;
  }

  const renderExpenseItem = (listItem) => {
    return <View style={listStyles.listItem} key={listItem._id}>
      <View style={listStyles.descriptionContainer}>
        <Text style={[listStyles.amount, listStyles.textBlue]}>{listItem.amount} zł</Text>
        <Text style={[listStyles.description, listStyles.textBlue]}>
          {listItem.category}
          {listItem.description ? ` - ${listItem.description}` : ''}
        </Text>
      </View>
      <Text style={[listStyles.data]}>12.12.2020</Text>
    </View>
  }

  const renderExpenseList = list => {
   return <View  style={listStyles.list}>
     {list.map(item => renderExpenseItem(item))}
   </View>
  }
  
  return (
    <View style={viewStyles.container}>
      <ScrollView>
      {renderExpenseList(expenses)}
      {sum ? <Text style={listStyles.sum}>Sum: {sum} zł</Text> : <></>}
      { isLoading 
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
