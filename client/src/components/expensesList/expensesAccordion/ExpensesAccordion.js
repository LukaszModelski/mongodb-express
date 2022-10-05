import React, { useState } from "react";
import { View, Text } from 'react-native';
import { accordionStyles } from './ExpensesAccordion.styles';
import { PieChartIcon } from '../../svg/PieChartIcon'
import { ExpensesListItem } from '../expensesListItem/ExpensesListItem';
import { Sorting } from '../sorting/Sorting';

export const ExpensesAccrodion = ({date, items, open, navigation}) => {
  const [isOpen, setIsOpen] = useState(open);

  const calculateSum = items => items.reduce((total, item) => total + item.amount, 0);
  
  const renderAccordionItems = items => items.map(item => <ExpensesListItem item={item} key={item._id} />);

  return (
    <View style={accordionStyles.accordion}>
      <Text onPress={() => {setIsOpen(!isOpen)}} style={accordionStyles.accrodionHead}>{date}</Text>
      <Text style={accordionStyles.sum}>Sum: {calculateSum(items)}zł</Text>
      <PieChartIcon
        size={18}
        style={accordionStyles.pieChartIcon}
        onPress={() => navigation.navigate('ChartView', { date })}
      />
      <View style={isOpen ? accordionStyles.accordionOpen : accordionStyles.accordionClose}>
        <Sorting month={date} />
        {items && renderAccordionItems(items)}
      </View>
    </View>
  )
}
