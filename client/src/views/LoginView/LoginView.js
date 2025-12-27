import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, TextInput, Button } from "react-native";
import {
  setIsUserSignedIn,
  setNotificationEmailAndPassRequired,
  setNotificationFail,
  setNotificationLoginFail,
  clearNotifications,
} from "../../store/actions";
import { Notifications } from "../../components/notifications/Notifications";
import { saveJWT } from "../../js/jwt";
import { loginUser } from "../../js/api";
import { viewStyles } from "../../styles/view.styles";
import { loginViewStyles } from "./LoginView.styles";

export const LoginView = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginBtn = async (email, password) => {
    dispatch(clearNotifications());
    if (email && password) {
      try {
        const res = await loginUser(email, password);
        await saveJWT(res.data.token);
        dispatch(setIsUserSignedIn(true));
      } catch (error) {
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
  };

  return (
    <View style={viewStyles.container}>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholder="email"
        style={loginViewStyles.input}
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        placeholder="password"
        style={loginViewStyles.input}
      />
      <Button
        title="Login"
        onPress={() => {
          handleLoginBtn(email, password);
        }}
      />
      <Notifications />
    </View>
  );
};
