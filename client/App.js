
import React from 'react';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ExpensesList } from "./src/components/expensesList/ExpensesList";
import { AddExpenseForm } from "./src/components/addExpenseForm/AddExpenseForm";
import { reducers } from "./src/store/reducers";

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesList" component={ExpensesList} />
          <Stack.Screen name="AddExpenseForm" component={AddExpenseForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
