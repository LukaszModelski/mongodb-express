import React, { useState, useEffect } from 'react';
import { Picker } from 'react-native';
import { useSelector } from 'react-redux';

export const Form = () => {
  const expensesCategories = useSelector(state => state.expensesCategories)
  const [selectedValue, setSelectedValue] = useState(expensesCategories[0]);

  useEffect(() => {
    setSelectedValue(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  return (
    <Picker
      selectedValue={selectedValue}
      style={{ height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      {renderPickerList(expensesCategories)}
    </Picker>
  );
}
