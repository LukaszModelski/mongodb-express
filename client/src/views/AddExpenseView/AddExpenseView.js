import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Notifications } from "../../components/notifications/Notifications";
import {
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  setNotificationSuccess,
  setNotificationFail,
  setNotificationAmountRequired,
  clearNotifications,
} from "../../store/actions";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { addExpenseViewStyles } from "./AddExpenseView.styles";
import { postNewExpense } from "../../js/api";
import { validateAmount } from "../../js/utils";
import { colors } from "../../vars/colors";

export const AddExpenseView = ({ navigation }) => {
  const dispatch = useDispatch();
  const expensesCategories = useSelector((state) => state.expensesCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(expensesCategories[0]);
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearNotifications());
    }, [])
  );

  useEffect(() => {
    setCategory(expensesCategories[0]);
  }, [expensesCategories]);

  const renderPickerItem = (item) => (
    <Picker.Item key={item} label={item} value={item} />
  );

  const renderPickerList = (list) => list.map((item) => renderPickerItem(item));

  const clearForm = () => {
    setAmount("");
    setDescription("");
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const newDate = selectedDate || date;
    setIsDatePickerVisible(Platform.OS === "ios");
    setDate(newDate);
  };

  const handleAddExpenseBtn = async (amount, cat, desc, dateString) => {
    dispatch(clearNotifications());

    if (validateAmount(amount)) {
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
  };

  return (
    <View style={viewStyles.container}>
      <View style={addExpenseViewStyles.flex}>
        <View
          style={[
            addExpenseViewStyles.labelInputWrapper,
            addExpenseViewStyles.wrapperShort,
            utilStyles.paddingRight5,
          ]}
        >
          <Text style={addExpenseViewStyles.label}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
            placeholder="0 zł"
            keyboardType="numeric"
            style={addExpenseViewStyles.input}
          />
        </View>
        <View
          style={[
            addExpenseViewStyles.labelInputWrapper,
            addExpenseViewStyles.wrapperShort,
            utilStyles.paddingLeft5,
          ]}
        >
          <Text style={addExpenseViewStyles.label}>Select category</Text>
          <View style={addExpenseViewStyles.pickerWrapper}>
            <Picker
              selectedValue={category}
              style={addExpenseViewStyles.picker}
              onValueChange={(cat) => setCategory(cat)}
            >
              {renderPickerList(expensesCategories)}
            </Picker>
          </View>
        </View>
        <View style={addExpenseViewStyles.labelInputWrapper}>
          <Text style={addExpenseViewStyles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(desc) => setDescription(desc)}
            placeholder="lorem ipsum..."
            style={addExpenseViewStyles.input}
          />
        </View>
        <View style={addExpenseViewStyles.datePicker}>
          <TouchableOpacity onPress={showDatePicker}>
            <Fontisto
              style={addExpenseViewStyles.callendarIcon}
              name="date"
              size={20}
              color={colors.blue}
            />
          </TouchableOpacity>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
      {isDatePickerVisible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      ) : (
        <></>
      )}
      <Button
        title="Add expense"
        onPress={() =>
          handleAddExpenseBtn(amount, category, description, date.toJSON())
        }
      />
      <Notifications />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={utilStyles.marginTop20}
        />
      ) : (
        <></>
      )}
    </View>
  );
};
