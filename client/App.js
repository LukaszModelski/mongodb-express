
import React from 'react';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ExpensesList } from "./src/components/expensesList/ExpensesList";
import { AddExpenseForm } from "./src/components/addExpenseForm/AddExpenseForm";
import { ChartView } from "./src/views/ChartView";
import { LoginScreen } from "./src/components/loginScreen/LoginScreen";
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
          <Stack.Screen options={{title: 'Expenses'}} name="ExpensesList" component={ExpensesList} />
          <Stack.Screen options={{title: 'New Expense'}} name="AddExpenseForm" component={AddExpenseForm} />
          <Stack.Screen options={{title: 'Chart'}} name="ChartView" component={ChartView} />
          <Stack.Screen options={{title: 'Login'}} name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
