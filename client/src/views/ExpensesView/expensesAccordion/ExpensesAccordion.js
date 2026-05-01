import React, { useState } from "react";
import { View, Text } from "react-native";
import { accordionStyles } from "./ExpensesAccordion.styles";
import { PieChartIcon } from "../../../components/svg/PieChartIcon";
import { ExpensesListItem } from "./expensesListItem/ExpensesListItem";
import { Sorting } from "./sorting/Sorting";

const sortByDate = (a, b) => (a.date >= b.date ? -1 : 1);
const sortByPrice = (a, b) => (a.amount >= b.amount ? -1 : 1);
const sortByCategory = (a, b) => (a.category >= b.category ? 1 : -1);

export const sortOptions = {
  date: "date",
  price: "price",
  category: "category",
};

const sortingFunctions = {
  [sortOptions.date]: sortByDate,
  [sortOptions.price]: sortByPrice,
  [sortOptions.category]: sortByCategory,
};

export const ExpensesAccordion = ({
  date,
  items,
  isAccordionOpen,
  navigation,
}) => {
  const [isOpen, setIsOpen] = useState(isAccordionOpen);
  const [sortBy, setSortBy] = useState(sortOptions.date);

  const calculateSum = (items) =>
    items.reduce((total, item) => total + item.amount, 0);

  const AccordionItems = ({ items }) =>
    items
      .sort(sortingFunctions[sortBy])
      .map((item) => <ExpensesListItem item={item} key={item._id} />);

  return (
    <View style={accordionStyles.accordion}>
      <Text
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        style={accordionStyles.accrodionHead}
      >
        {date}
      </Text>
      <Text style={accordionStyles.sum}>Sum: {calculateSum(items)}zł</Text>
      <PieChartIcon
        size={18}
        style={accordionStyles.pieChartIcon}
        onPress={() => navigation.navigate("ChartView", { date, items })}
      />
      {isOpen && (
        <View>
          <Sorting sortBy={sortBy} setSortBy={setSortBy} />
          {items && <AccordionItems items={items} />}
        </View>
      )}
    </View>
  );
};
