import React, { useState, useCallback } from "react";
import { View, Button, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ExpensesAccrodion } from "./expensesAccordion/ExpensesAccordion";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpenses,
  setExpensesCategories,
  clearNotifications,
} from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { colors } from "../../vars/colors";
import { fetchExpenses, handleAPIerror } from "../../js/api";
import { groupExpensesByMonth } from "../../js/utils";

export const ExpensesList = ({ navigation }) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearNotifications());
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!fetched) {
        setIsLoading(true);
        const initExpenses = async () => {
          try {
            const response = await fetchExpenses();
            const sortedExpenses = groupExpensesByMonth(response.data.expenses);
            dispatch(setExpenses(sortedExpenses));
            dispatch(setExpensesCategories(response.data.categories));
            setFetched(true);
          } catch (error) {
            handleAPIerror(error, navigation);
          } finally {
            setIsLoading(false);
          }
        };
        initExpenses();
      }
    }, [fetched])
  );

  const renderExpenseAccordions = (expenses) =>
    Object.entries(expenses)
      .sort((acc1, acc2) => (acc1[0] > acc2[0] ? -1 : 1))
      .map((entry, i) => (
        <ExpensesAccrodion
          navigation={navigation}
          date={entry[0]}
          items={entry[1]}
          key={entry[0]}
          open={i === 0}
        />
      ));

  return (
    <View style={viewStyles.container}>
      <ScrollView>
        <Button
          title="New expense"
          onPress={() => navigation.navigate("AddExpenseForm")}
        />
        <View style={utilStyles.marginBottom20}></View>
        {Object.keys(expenses).length ? (
          renderExpenseAccordions(expenses)
        ) : (
          <></>
        )}
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};
