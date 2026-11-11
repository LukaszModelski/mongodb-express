import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ExpensesAccordion } from "./expensesAccordion/ExpensesAccordion";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  setExpensesCategories,
  clearNotifications,
  setNotificationAccountCreated,
} from "../../store/actions";
import { Notifications } from "../../components/notifications/Notifications";
import { viewStyles } from "../../styles/view.styles";
import { expensesViewStyles } from "./ExpensesView.styles";
import { SearchIcon } from "../../components/svg/SearchIcon";
import { UserIcon } from "../../components/svg/UserIcon";
import { utilStyles } from "../../styles/utils.styles";
import { colors } from "../../vars/colors";
import {
  fetchCurrnetMonthExpenses,
  fetchExpenses,
  handleAPIerror,
} from "../../js/api";
import { validateJWTFronted } from "../../hooks/validateJWTFrontend";

export const ExpensesView = ({ navigation }) => {
  const dispatch = useDispatch();
  const expensesStore = useSelector((state) => state.expenses);
  const isAccountCreated = useSelector(
    (state) => state.showNotification.accountCreated,
  );
  const [isLoadingFirstMonth, setIsLoadingFirstMonth] = useState(true);
  const [isLoadingAllExpenses, setIsLoadingAllExpenses] = useState(true);
  const hasExpenses = Object.values(expensesStore || {}).some(
    (monthExpenses) => monthExpenses.length > 0,
  );

  validateJWTFronted();

  // "Account created" message shown after sign up, hidden after 5 seconds.
  useEffect(() => {
    if (!isAccountCreated) {
      return;
    }
    const timeoutId = setTimeout(() => {
      dispatch(setNotificationAccountCreated(false));
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [isAccountCreated]);

  useEffect(() => {
    const initExpenses = async () => {
      try {
        const response = await fetchCurrnetMonthExpenses();
        dispatch(setExpenses(response.data.data));
        dispatch(setExpensesCategories(response.data.categories));
      } catch (error) {
        handleAPIerror(error, dispatch);
      } finally {
        setIsLoadingFirstMonth(false);
      }
    };
    initExpenses();
  }, []);

  useEffect(() => {
    if (!isLoadingFirstMonth) {
      const initExpenses = async () => {
        try {
          const response = await fetchExpenses();
          const expenses = response.data.expensesByMonth;
          dispatch(setExpenses(expenses));
        } catch (error) {
          handleAPIerror(error, dispatch);
        } finally {
          setIsLoadingAllExpenses(false);
        }
      };
      initExpenses();
    }
  }, [isLoadingFirstMonth]);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearNotifications());
    }, []),
  );

  const Accordions = ({ expenses }) =>
    Object.keys(expenses)
      .sort((a, b) => (a >= b ? -1 : 1))
      .map((date, i) => (
        <ExpensesAccordion
          key={date}
          navigation={navigation}
          date={date}
          items={expenses[date]}
          isAccordionOpen={i === 0}
        />
      ));

  return (
    <View style={viewStyles.container}>
      <ScrollView contentContainerStyle={expensesViewStyles.listContent}>
        {isAccountCreated && (
          <View style={utilStyles.marginBottom20}>
            <Notifications />
          </View>
        )}
        <Button
          title="New expense"
          onPress={() => navigation.navigate("AddExpenseView")}
        />
        <View style={utilStyles.marginBottom20}></View>
        {hasExpenses ? (
          <Accordions expenses={expensesStore} />
        ) : isLoadingAllExpenses ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <Text style={expensesViewStyles.emptyState}>
            You don't have any expenses yet. Tap "New expense" to add your
            first one.
          </Text>
        )}
      </ScrollView>
      <TouchableOpacity
        accessibilityLabel="User account"
        onPress={() => navigation.navigate("UserView")}
        style={expensesViewStyles.userButton}
      >
        <UserIcon size={21} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Search expenses"
        onPress={() => navigation.navigate("SearchView")}
        style={expensesViewStyles.searchButton}
      >
        <SearchIcon size={21} />
      </TouchableOpacity>
    </View>
  );
};
