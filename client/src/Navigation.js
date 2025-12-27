import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpensesView } from "./views/ExpensesView/ExpensesView";
import { AddExpenseView } from "./views/AddExpenseView/AddExpenseView";
import { ChartView } from "./views/ChartView/ChartView";
import { LoginView } from "./views/LoginView/LoginView";
import { useDispatch, useSelector } from "react-redux";
import { SplashView } from "./views/SplashView/SplashView";
import { setIsUserSignedIn } from "./store/actions";
import { getJWT, checkJWTValid } from "./js/jwt";

const Stack = createStackNavigator();

export const Navigation = () => {
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector((state) => state.isUserSignedIn);
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = await getJWT();
      if (!token) {
        dispatch(setIsUserSignedIn(false));
        setIsVerifyingUser(false);
        return;
      }
      const isJWTValid = checkJWTValid(token);
      dispatch(setIsUserSignedIn(isJWTValid));
      setIsVerifyingUser(false);
    };
    verifyUser();
  }, []);

  if (isVerifyingUser) {
    return <SplashView />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserSignedIn ? (
          <>
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
          </>
        ) : (
          <Stack.Screen
            options={{ title: "Login" }}
            name="LoginView"
            component={LoginView}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
