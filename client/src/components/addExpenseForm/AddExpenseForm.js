import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense } from "../../store/actions";
import { viewStyles } from "../view/view.styles";
import { utilStyles } from "../view/utils.styles";
import { formStyles } from "./AddExpenseForm.styles";
import { postNewExpense } from "../../utils/api";

export const AddExpenseForm = () => {
  const dispatch = useDispatch();
  const expensesCategories = useSelector(state => state.expensesCategories)
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState(expensesCategories[0]);
  const [description, setDescription] = useState();

  useEffect(() => {
    setCategory(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  const handleAddExpenseBtn = async (amount, cat, desc) => {
    if(parseInt(amount)) {
      const response = await postNewExpense(amount, cat, desc);
      dispatch(addExpense(response.data.expense));
      // TO DO: add UI notification about success
    } else {
      // TO DO: add UI notification about wrong amount format
      console.error('Amount must be number');
    }
  }

  return (
    <View style={viewStyles.container}>
      <View style={formStyles.flex}>
        <View style={[formStyles.labelInputWrapper, formStyles.wrapperShort, utilStyles.paddingRight5]}>
          <Text style={formStyles.label}>Amount</Text>
          <TextInput
            style={formStyles.input}
            placeholder="0.00 zł"
            onChangeText={amount => setAmount(amount)}
          />
        </View>
        <View style={[formStyles.labelInputWrapper, formStyles.wrapperShort, utilStyles.paddingLeft5]}>
          <Text style={formStyles.label}>Select category</Text>
          <View style={formStyles.pickerWrapper}>
            <Picker
              selectedValue={category}
              style={formStyles.picker}
              onValueChange={(cat) => setCategory(cat)}
              >
              {renderPickerList(expensesCategories)}
            </Picker>
          </View>
        </View>
        <View style={formStyles.labelInputWrapper}>
          <Text style={formStyles.label}>Description</Text>
          <TextInput
            style={formStyles.input}
            placeholder="lorem ipsum..."
            onChangeText={desc => setDescription(desc)}
          />
        </View>
      </View>
      <Button
        title="Add expense"
        onPress={() => handleAddExpenseBtn(amount, category, description)}
      />
    </View>
  );
}
