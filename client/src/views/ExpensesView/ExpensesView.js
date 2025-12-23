import React, { useState, useCallback, useEffect } from "react";
import { View, Button, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ExpensesAccrodion } from "./expensesAccordion/ExpensesAccordion";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  setExpensesCategories,
  clearNotifications,
} from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
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

  const isJwtValid = validateJWTFronted(navigation);

  useEffect(() => {
    if (isJwtValid) {
      const initExpenses = async () => {
        try {
          const response = await fetchCurrnetMonthExpenses();
          dispatch(setExpenses(response.data.data));
          dispatch(setExpensesCategories(response.data.categories));
        } catch (error) {
          handleAPIerror(error, navigation);
        } finally {
          setIsLoadingFirstMonth(false);
        }
      };
      initExpenses();
    }
  }, [isJwtValid]);

  useEffect(() => {
    if (isJwtValid && !isLoadingFirstMonth) {
      const initExpenses = async () => {
        try {
          const response = await fetchExpenses();
          const expenses = response.data.expensesByMonth;
          dispatch(setExpenses(expenses));
        } catch (error) {
          handleAPIerror(error, navigation);
        }
      };
      initExpenses();
    }
  }, [isLoadingFirstMonth, isJwtValid]);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearNotifications());
    }, [])
  );

  const Accordions = ({ expenses }) =>
    Object.entries(expenses).map((entry, i) => (
      <ExpensesAccrodion
        navigation={navigation}
        date={entry[0]}
        items={entry[1]}
        key={entry[0]}
        isAccordionOpen={i === 0}
      />
    ));

  if (!isJwtValid) return;

  return (
    <View style={viewStyles.container}>
      <ScrollView>
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
    </View>
  );
};
