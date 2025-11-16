import React from "react";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ExpensesView } from "./src/views/ExpensesView/ExpensesView";
import { AddExpenseView } from "./src/views/AddExpenseView/AddExpenseView";
import { ChartView } from "./src/views/ChartView/ChartView";
import { LoginView } from "./src/views/LoginView/LoginView";
import { reducers } from "./src/store/reducers";

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ title: "Expenses" }}
            name="ExpensesView"
            component={ExpensesView}
          />
          <Stack.Screen
            options={{ title: "New Expense" }}
            name="AddExpenseView"
            component={AddExpenseView}
          />
          <Stack.Screen
            options={{ title: "Chart" }}
            name="ChartView"
            component={ChartView}
          />
          <Stack.Screen
            options={{ title: "Login" }}
            name="LoginView"
            component={LoginView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
