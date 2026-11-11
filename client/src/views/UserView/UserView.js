import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { viewStyles } from "../../styles/view.styles";
import { userViewStyles } from "./UserView.styles";
import { clearExpenses, setIsUserSignedIn } from "../../store/actions";
import { revokeRefreshToken } from "../../js/api";
import { clearAuthTokens, getUserEmail } from "../../js/jwt";
import { validateJWTFronted } from "../../hooks/validateJWTFrontend";

export const UserView = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  validateJWTFronted();

  useEffect(() => {
    getUserEmail().then(setEmail);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Invalidates the refresh token on the server. If it fails (ex. no network)
      // the user is still logged out on this device.
      await revokeRefreshToken();
    } catch (error) {
      console.info("Could not revoke refresh token on the server");
    }
    await clearAuthTokens();
    dispatch(clearExpenses());
    // Navigation shows only the login screen when the user is not signed in.
    dispatch(setIsUserSignedIn(false));
  };

  return (
    <View style={[viewStyles.container, userViewStyles.container]}>
      <View>
        <Text style={userViewStyles.label}>Logged in as</Text>
        <Text style={userViewStyles.email}>{email || "-"}</Text>
      </View>
      <Button
        title="Log out"
        onPress={handleLogout}
        disabled={isLoggingOut}
      />
    </View>
  );
};
