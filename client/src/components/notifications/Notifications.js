import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { notificationsStyles } from "./Notifications.styles";

export const Notifications = () => {
  const showNotification = useSelector(state => state.showNotification);

  return (
    <View style={notificationsStyles.notificationContainer}>
      { showNotification.success ? <Text style={notificationsStyles.notificationSuccess}>Expense added successfully.</Text> : <></> }
      { showNotification.fail ? <Text style={notificationsStyles.notificationFalse}>Something went wrong.</Text> : <></> }
      { showNotification.amountRequired ? <Text style={notificationsStyles.notificationFalse}>"Amount" is required and must be a number. </Text> : <></> }
    </View>
  );
}
