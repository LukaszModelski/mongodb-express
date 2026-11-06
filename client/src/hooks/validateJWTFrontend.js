import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsUserSignedIn } from "../store/actions";
import { restoreSession } from "../js/api";

export const validateJWTFronted = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const verifyUser = async () => {
        const hasSession = await restoreSession();
        dispatch(setIsUserSignedIn(hasSession));
      };
      verifyUser();
    }, [])
  );
};
