import React, { useState, useEffect } from 'react';
import { Notifications } from "../notifications/Notifications";
import { View, TextInput, Text, Button, Picker, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addExpense,
  setNotificationSuccess,
  setNotificationFail,
  setNotificationAmountRequired
} from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { formStyles } from "./AddExpenseForm.styles";
import { postNewExpense } from "../../js/api";
import { colors } from "../../vars/colors";

export const AddExpenseForm = () => {
  const dispatch = useDispatch();
  const expensesCategories = useSelector(state => state.expensesCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(expensesCategories[0]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setCategory(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  const clearNotificationa = () => {
    dispatch(setNotificationSuccess(false));
    dispatch(setNotificationFail(false));
    dispatch(setNotificationAmountRequired(false));
  }

  const clearForm = () => {
    setAmount('');
    setDescription('');
  }

  const handleAddExpenseBtn = async (amount, cat, desc) => {
    clearNotificationa();
    if(parseInt(amount)) {
      dispatch(setLoaderState(true));
      setIsLoading(true);
      try {
        const response = await postNewExpense(amount, cat, desc);
        dispatch(addExpense(response.data.expense));
        dispatch(setNotificationSuccess(true));
        clearForm();
      } catch (error) {
        console.error(error);
        dispatch(setNotificationFail(true));
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(setNotificationAmountRequired(true));
    }
  }

  return (
    <View style={viewStyles.container}>
      <View style={formStyles.flex}>
        <View style={[formStyles.labelInputWrapper, formStyles.wrapperShort, utilStyles.paddingRight5]}>
          <Text style={formStyles.label}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={amount => setAmount(amount)}
            placeholder="0.00 zł"
            style={formStyles.input}
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
            value={description}
            onChangeText={desc => setDescription(desc)}
            placeholder="lorem ipsum..."
            style={formStyles.input}
          />
        </View>
      </View>
      <Button
        title="Add expense"
        onPress={() => handleAddExpenseBtn(amount, category, description)}
        />
      <Notifications />
      { isLoading 
        ? <ActivityIndicator
          size="large"
          color={colors.blue}
          style={utilStyles.marginTop20}
        />
        : <></>}
    </View>
  );
}
