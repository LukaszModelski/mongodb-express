import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [expensesCategories, setexpensesCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    axios.get('https://nodejs-expenses.herokuapp.com/api/expense')
      .then(function (response) {
        setExpenses(response.data.expenses);
        setexpensesCategories(response.data.categories);
        setSelectedValue(response.data.categories[0]);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const renderExpenseItem = (listItem) => <Text key={listItem._id} >{listItem.description}, cat: {listItem.category}, amount: {listItem.amount}</Text>

  const renderExpenseList = list => list.map(item => renderExpenseItem(item));

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {renderPickerList(expensesCategories)}
      </Picker>
      <Text>List of expenses:</Text>
      {renderExpenseList(expenses)}
      <StatusBar style="auto" />
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
