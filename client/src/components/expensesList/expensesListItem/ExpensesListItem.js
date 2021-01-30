import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../../store/actions";
import { View, Text, TouchableOpacity } from 'react-native';
import { listItemStyles } from "./ExpensesListItem.styles";
import { deleteExpenseApi } from "../../../js/api";

export const ExpensesListItem = ({item}) => {
  const dispatch = useDispatch();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleIsPanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  }

  const deleteButtonHandler = async () => {
    const deletedExpense = await deleteExpenseApi(item._id);
    dispatch(deleteExpense(deletedExpense.data.removed));
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
        <TouchableOpacity onPress={deleteButtonHandler}>
          <Text style={listItemStyles.editPanelText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
