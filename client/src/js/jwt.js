import AsyncStorage from "@react-native-async-storage/async-storage";
import cookie from "cookie";
import { isNative } from "./utils";

export const getJWT = async () => {
  if (isNative()) {
    return await getJWTFromNative();
  } else {
    return getJWTFromWebCookies();
  }
};

const getJWTFromNative = async () => {
  try {
    const jwt = await AsyncStorage.getItem("@jwt");
    return jwt;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getJWTFromWebCookies = () => {
  const parsedCookies = cookie.parse(document.cookie);
  return parsedCookies.jwt ? parsedCookies.jwt : "";
};

export const saveJWT = async (jwt) => {
  if (isNative()) {
    await saveJWTinNativeStorage(jwt);
  } else {
    saveJWTinWebCookies(jwt);
  }
};

const saveJWTinNativeStorage = async (jwt) => {
  try {
    await AsyncStorage.setItem("@jwt", jwt);
  } catch (error) {
    console.error(error);
  }
};

const saveJWTinWebCookies = (jwt) => {
  document.cookie = `jwt=${jwt}`;
};
