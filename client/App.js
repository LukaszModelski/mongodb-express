import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedValue, setSelectedValue] = useState("java");

  useEffect(() => {
    axios.get('https://nodejs-expenses.herokuapp.com/api/expense')
      .then(function (response) {
        setExpenses(response.data.expenses);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const printListItem = (listItem) => {
    return <Text key={listItem._id} >{listItem.description}, cat: {listItem.category}, amount: {listItem.amount}</Text>
  }

  const printList = list => list.map(listItem => printListItem(listItem));

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Text>List of expenses:</Text>
      {printList(expenses)}
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