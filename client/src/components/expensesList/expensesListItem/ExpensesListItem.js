import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { listItemStyles } from "./ExpensesListItem.styles";

export const ExpensesListItem = ({item}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleIsPanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  }

  const deleteItem = () => {
    // TO DO create delete request to API
    console.log('delete item');
  }

  return (
    <View style={listItemStyles.listItem} key={item._id}>
      <TouchableOpacity onPress={toggleIsPanelOpen}>
        <View style={listItemStyles.descriptionContainer}>
          <Text style={[listItemStyles.amount, listItemStyles.textBlue]}>{item.amount} zł</Text>
          <Text style={[listItemStyles.description, listItemStyles.textBlue]}>
            {item.category}
            {item.description ? ` - ${item.description}` : ''}
          </Text>
        </View>
      </TouchableOpacity>
      {/* TO DO unhardcode data */}
      <Text style={[listItemStyles.data]}>12.12.2020</Text>
      <View style={[listItemStyles.editPanel, isPanelOpen ? listItemStyles.editPanelOpen : listItemStyles.editPanelClose]}>
        <TouchableOpacity onPress={deleteItem}>
          <Text style={listItemStyles.editPanelText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
