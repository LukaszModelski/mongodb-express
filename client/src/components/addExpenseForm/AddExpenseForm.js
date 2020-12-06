import React, { useState, useEffect } from 'react';
import { View, TextInput, Text ,Picker } from 'react-native';
import { useSelector } from 'react-redux';
import { viewStyles } from "../view/view.styles";

export const AddExpenseForm = () => {
  const expensesCategories = useSelector(state => state.expensesCategories)
  const [selectedValue, setSelectedValue] = useState(expensesCategories[0]);

  useEffect(() => {
    setSelectedValue(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  return (
    <View style={viewStyles.container}>
      <Text>Amount</Text>
      <TextInput placeholder="0.00 zł" />
      <Text>Description</Text>
      <TextInput placeholder="lorem ipsum..." />
      <Text>Select category</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
        {renderPickerList(expensesCategories)}
      </Picker>
    </View>
  );
}
