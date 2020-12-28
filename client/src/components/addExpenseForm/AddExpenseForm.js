import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Picker } from 'react-native';
import { useSelector } from 'react-redux';
import { viewStyles } from "../view/view.styles";
import { utilStyles } from "../view/utils.styles";
import { formStyles } from "./AddExpenseForm.styles";
import { colors } from "../../vars/colors";

export const AddExpenseForm = () => {
  const expensesCategories = useSelector(state => state.expensesCategories)
  const [selectedValue, setSelectedValue] = useState(expensesCategories[0]);
  const [amountInputRef, setAmountInputRef] = useState();
  const [descriptionInputRef, setDescriptionInputRef] = useState();

  useEffect(() => {
    setSelectedValue(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  return (
    <View style={viewStyles.container}>
      <View style={formStyles.flex}>
        <View style={[formStyles.labelInputWrapper, formStyles.wrapperShort, utilStyles.paddingRight5]}>
          <Text style={formStyles.label}>Amount</Text>
          <TextInput
            style={formStyles.input}
            placeholder="0.00 zł"
            ref={ref => setAmountInputRef(ref)}
            onFocus={() => amountInputRef.style.outlineColor = colors.blue}
          />
        </View>
        <View style={[formStyles.labelInputWrapper, formStyles.wrapperShort, utilStyles.paddingLeft5]}>
          <Text style={formStyles.label}>Select category</Text>
          <Picker
            selectedValue={selectedValue}
            style={[formStyles.input, formStyles.picker]}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
            {renderPickerList(expensesCategories)}
          </Picker>
        </View>
        <View style={formStyles.labelInputWrapper}>
          <Text style={formStyles.label}>Description</Text>
          <TextInput
            style={formStyles.input}
            placeholder="lorem ipsum..."
            ref={ref => setDescriptionInputRef(ref)}
            onFocus={() => descriptionInputRef.style.outlineColor = colors.blue}
          />
        </View>
      </View>
      <Button
        title="Add expense"
        onPress={() => navigation.navigate('AddExpenseForm')}
      />
    </View>
  );
}
