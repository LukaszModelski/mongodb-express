import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { viewStyles } from "../../styles/view.styles";
import { searchViewStyles } from "./SearchView.styles";
import { ExpensesListItem } from "../ExpensesView/expensesAccordion/expensesListItem/ExpensesListItem";
import { Sorting } from "../ExpensesView/expensesAccordion/sorting/Sorting";
import {
  sortOptions,
  sortingFunctions,
} from "../ExpensesView/expensesAccordion/ExpensesAccordion";
import { validateJWTFronted } from "../../hooks/validateJWTFrontend";
import { SEARCH_MIN_LENGTH, searchExpensesByDescription } from "../../js/utils";

export const SearchView = () => {
  const expensesStore = useSelector((state) => state.expenses);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions.date);

  validateJWTFronted();

  const results = useMemo(
    () =>
      [...searchExpensesByDescription(expensesStore, query)].sort(
        sortingFunctions[sortBy],
      ),
    [expensesStore, query, sortBy],
  );

  const isQueryLongEnough = query.trim().length >= SEARCH_MIN_LENGTH;

  return (
    <View style={viewStyles.container}>
      <TextInput
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setQuery}
        placeholder="Search by expense name"
        style={searchViewStyles.input}
        value={query}
      />
      {!isQueryLongEnough ? (
        <Text style={searchViewStyles.hint}>
          Type at least {SEARCH_MIN_LENGTH} letters to search.
        </Text>
      ) : results.length === 0 ? (
        <Text style={searchViewStyles.hint}>No expenses found.</Text>
      ) : (
        <>
          <Text style={searchViewStyles.hint}>
            Found: {results.length}
          </Text>
          <Sorting sortBy={sortBy} setSortBy={setSortBy} />
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => <ExpensesListItem item={item} />}
          />
        </>
      )}
    </View>
  );
};
