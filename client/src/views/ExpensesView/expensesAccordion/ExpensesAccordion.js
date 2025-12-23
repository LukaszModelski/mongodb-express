import React, { useState } from "react";
import { View, Text } from "react-native";
import { accordionStyles } from "./ExpensesAccordion.styles";
import { PieChartIcon } from "../../../components/svg/PieChartIcon";
import { ExpensesListItem } from "../expensesListItem/ExpensesListItem";
import { Sorting } from "../sorting/Sorting";

export const ExpensesAccrodion = ({
  date,
  items,
  isAccordionOpen,
  navigation,
}) => {
  const [isOpen, setIsOpen] = useState(isAccordionOpen);

  const calculateSum = (items) =>
    items.reduce((total, item) => total + item.amount, 0);

  const AccordionItems = ({ items }) =>
    items.map((item) => <ExpensesListItem item={item} key={item._id} />);

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
          <Sorting month={date} />
          {items && <AccordionItems items={items} />}
        </View>
      )}
    </View>
  );
};
