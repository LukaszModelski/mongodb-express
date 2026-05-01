import React from "react";
import { View, Text } from "react-native";
import { sortingStyles } from "./Sorting.styles";
import { sortOptions } from "../ExpensesAccordion";

export const Sorting = ({ sortBy, setSortBy }) => {
  return (
    <View style={sortingStyles.sortingTab}>
      <Text style={sortingStyles.item}>Sort by: </Text>
      <Text
        style={[
          sortingStyles.item,
          sortBy === sortOptions.date && sortingStyles.active,
        ]}
        onPress={() => setSortBy(sortOptions.date)}
      >
        Date
      </Text>
      <Text
        style={[
          sortingStyles.item,
          sortBy === sortOptions.price && sortingStyles.active,
        ]}
        onPress={() => setSortBy(sortOptions.price)}
      >
        Price
      </Text>
      <Text
        style={[
          sortingStyles.item,
          sortBy === sortOptions.category && sortingStyles.active,
        ]}
        onPress={() => setSortBy(sortOptions.category)}
      >
        Category
      </Text>
    </View>
  );
};
