import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button } from "react-native";
import {
  setNotificationLoginSuccess,
  setNotificationEmailAndPassRequired,
  setNotificationFail,
  setNotificationLoginFail,
  clearNotifications,
} from "../../store/actions";
import { Notifications } from "../notifications/Notifications";
import { saveJWT } from "../../js/jwt";
import { loginUser } from "../../js/api";

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginBtn = async (email, password) => {
    dispatch(clearNotifications());
    if(email && password) {
      try {
        const res = await loginUser(email, password);
        dispatch(setNotificationLoginSuccess(true));
        await saveJWT(res.data.token);
        navigation.navigate('ExpensesList')
      } catch(error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          dispatch(setNotificationLoginFail(true));
        } else {
          dispatch(setNotificationFail(true));
        }
      }
    } else {
      dispatch(setNotificationEmailAndPassRequired(true));
    }
  } 

  return (<View>
    <TextInput
      onChangeText={text => setEmail(text)}
      placeholder="email"
    />
    <TextInput
      secureTextEntry={true}
      onChangeText={text => setPassword(text)}
      placeholder="password"
    />
    <Button
      title="Login"
      onPress={() => { handleLoginBtn(email, password) }}
    />
    <Notifications />
  </View>);
}
