import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getJWT } from "../js/jwt";
import { jwtDecode } from "jwt-decode";

export const validateJWTFronted = (navigation) => {
  const [isValid, setIsValid] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const check = async () => {
        const token = await getJWT();
        if (!token) {
          navigation.navigate("LoginView");
          return;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            navigation.navigate("LoginView");
          }
          setIsValid(true);
        } catch (err) {
          console.error(err);
          navigation.navigate("LoginView");
        }
      };

      check();
    }, [navigation])
  );

  return isValid;
};
