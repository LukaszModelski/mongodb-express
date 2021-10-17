import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button } from "react-native";
import {
  setNotificationEmailAndPassRequired,
  setNotificationFail,
  setNotificationLoginFail,
  clearNotifications,
} from "../../store/actions";
import { Notifications } from "../notifications/Notifications";
import { saveJWT } from "../../js/jwt";
import { loginUser } from "../../js/api";
import { viewStyles } from '../../styles/view.styles';
import { loginScreenStyles } from "./LoginScreen.styles";

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginBtn = async (email, password) => {
    dispatch(clearNotifications());
    if(email && password) {
      try {
        const res = await loginUser(email, password);
        await saveJWT(res.data.token);
        navigation.navigate('ExpensesList');
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

  return (
    <View style={viewStyles.container}>
      <TextInput
        onChangeText={text => setEmail(text)}
        placeholder="email"
        style={loginScreenStyles.input}
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        placeholder="password"
        style={loginScreenStyles.input}
      />
      <Button
        title="Login"
        onPress={() => { handleLoginBtn(email, password) }}
      />
      <Notifications />
    </View>
  );
}
