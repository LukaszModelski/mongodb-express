import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Notifications } from "../notifications/Notifications";
import {
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker' 
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  addExpense,
  setNotificationSuccess,
  setNotificationFail,
  setNotificationAmountRequired,
  clearNotifications
} from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { formStyles } from "./AddExpenseForm.styles";
import { postNewExpense } from "../../js/api";
import { validateAmount } from "../../js/utils";
import { colors } from "../../vars/colors";

export const AddExpenseForm = ({navigation}) => {
  const dispatch = useDispatch();
  const expensesCategories = useSelector(state => state.expensesCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(expensesCategories[0]);
  const [description, setDescription] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearNotifications());
    }, [])
  );
  
  // IS THIS NEEDED?
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => console.log('BLURR form add expense'));

  //   return unsubscribe.remove();
  // }, [navigation]);

  useEffect(() => {
    setCategory(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => <Picker.Item key={item} label={item} value={item} />

  const renderPickerList = (list) => list.map(item => renderPickerItem(item));

  const clearForm = () => {
    setAmount('');
    setDescription('');
  }

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  }

  const handleDateChange = (event, selectedDate) => {
    const newDate = selectedDate || date;
    setIsDatePickerVisible(Platform.OS === 'ios');
    setDate(newDate);
  }

  const handleAddExpenseBtn = async (amount, cat, desc, dateString) => {
    dispatch(clearNotifications());

    if(validateAmount(amount)) {
      setIsLoading(true);
      try {
        const response = await postNewExpense(amount, cat, desc, dateString);
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
            placeholder="0 zł"
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
        <View style={formStyles.datePicker}>
          <TouchableOpacity onPress={showDatePicker}>
            <Fontisto style={formStyles.callendarIcon} name="date" size={20} color={colors.blue} />
          </TouchableOpacity>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
      {isDatePickerVisible
        ? <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
        : <></>}
      <Button
        title="Add expense"
        onPress={() => handleAddExpenseBtn(amount, category, description, date.toJSON())}
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
