import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, Button } from "react-native";
import {
  clearExpenses,
  setIsUserSignedIn,
  setNotificationAccountCreated,
  setNotificationEmailTaken,
  setNotificationEmailAndPassRequired,
  setNotificationFail,
  setNotificationLoginFail,
  clearNotifications,
} from "../../store/actions";
import { Notifications } from "../../components/notifications/Notifications";
import { createAccount, loginUser } from "../../js/api";
import { logError } from "../../js/logger";
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
        await loginUser(email, password);
        // Drops expenses of a previously signed in user, if any.
        dispatch(clearExpenses());
        dispatch(setIsUserSignedIn(true));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(setNotificationLoginFail(true));
        } else {
          logError(error, "login");
          dispatch(setNotificationFail(true));
        }
      }
    } else {
      dispatch(setNotificationEmailAndPassRequired(true));
    }
  };

  const handleCreateAccountBtn = async (email, password) => {
    dispatch(clearNotifications());
    if (email && password) {
      try {
        await createAccount(email, password);
        // Shown on the expenses screen (it disappears after a few seconds).
        dispatch(setNotificationAccountCreated(true));
        // Drops expenses of a previously signed in user, if any.
        dispatch(clearExpenses());
        dispatch(setIsUserSignedIn(true));
      } catch (error) {
        // 4xx = expected problem (email taken, wrong email format), nothing to report.
        const isClientError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        if (!isClientError) {
          logError(error, "createAccount");
        }
        if (error.response && error.response.status === 409) {
          dispatch(setNotificationEmailTaken(true));
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
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="username"
        textContentType="username"
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
      <Text style={loginViewStyles.createAccountHint}>
        If you don't have an account yet, create one.
      </Text>
      <Button
        title="Create account"
        onPress={() => {
          handleCreateAccountBtn(email, password);
        }}
      />
      <Notifications />
    </View>
  );
};
