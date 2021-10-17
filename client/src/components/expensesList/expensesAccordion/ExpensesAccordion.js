import React, { useState } from "react";
import { View, Text } from 'react-native';
import { accordionStyles } from './ExpensesAccordion.styles';
import { ExpensesListItem } from '../expensesListItem/ExpensesListItem';

export const ExpensesAccrodion = ({date, items, open}) => {
  const [isOpen, setIsOpen] = useState(open);

  const renderAccordionItems = (items) => {
    return items.map(item => {
      return  <ExpensesListItem item={item} key={item._id} />
    });
  }
  
  return (
    <View style={accordionStyles.accordion}>
      <Text onPress={() => {setIsOpen(!isOpen)}} style={accordionStyles.accrodionHead}>{date}</Text>
      <View style={isOpen ? accordionStyles.accordionOpen : accordionStyles.accordionClose}>
        {items && renderAccordionItems(items)}
      </View>
    </View>
  )
}
