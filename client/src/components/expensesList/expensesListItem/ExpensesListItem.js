import React from 'react';
import { View, Text } from 'react-native';
import { listItemStyles } from "./ExpensesListItem.styles";

export const ExpensesListItem = ({item}) => {

  return (
    <View style={listItemStyles.listItem} key={item._id}>
      <View style={listItemStyles.descriptionContainer}>
        <Text style={[listItemStyles.amount, listItemStyles.textBlue]}>{item.amount} zł</Text>
        <Text style={[listItemStyles.description, listItemStyles.textBlue]}>
          {item.category}
          {item.description ? ` - ${item.description}` : ''}
        </Text>
      </View>
      {/* TO DO unhardcode data */}
      <Text style={[listItemStyles.data]}>12.12.2020</Text>
      {/* <View style={listItemStyles.editPanel}>Test</View> */}
    </View>
  );
}
