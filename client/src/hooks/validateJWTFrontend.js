import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getJWT, checkJWTValid } from "../js/jwt";
import { useDispatch } from "react-redux";
import { setIsUserSignedIn } from "../store/actions";

export const validateJWTFronted = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const verifyUser = async () => {
        const token = await getJWT();
        if (!token) {
          dispatch(setIsUserSignedIn(false));
          return;
        }
        const isJWTValid = checkJWTValid(token);
        dispatch(setIsUserSignedIn(isJWTValid));
      };
      verifyUser();
    }, [])
  );
};
