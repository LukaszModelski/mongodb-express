import React, { useState, useCallback, useEffect } from "react";
import {
  View,
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
} from "../../store/actions";
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
  const [isLoadingFirstMonth, setIsLoadingFirstMonth] = useState(true);

  validateJWTFronted();

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
        <Button
          title="New expense"
          onPress={() => navigation.navigate("AddExpenseView")}
        />
        <View style={utilStyles.marginBottom20}></View>
        {expensesStore && Object.entries(expensesStore).length ? (
          <Accordions expenses={expensesStore} />
        ) : (
          <ActivityIndicator size="large" color={colors.blue} />
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
