import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cookie from "cookie";
import { isNative } from "./utils";
import { logError } from "./logger";

const NATIVE_ACCESS_KEY = "@jwt";
const NATIVE_REFRESH_KEY = "@refreshToken";
const WEB_ACCESS_KEY = "jwt";
const WEB_REFRESH_KEY = "refreshToken";

export const getJWT = async () => {
  if (isNative()) {
    return await getFromNative(NATIVE_ACCESS_KEY);
  }
  return getFromWebCookies(WEB_ACCESS_KEY);
};

export const getRefreshToken = async () => {
  if (isNative()) {
    return await getFromNative(NATIVE_REFRESH_KEY);
  }
  return getFromWebCookies(WEB_REFRESH_KEY);
};

export const checkJWTValid = (jwt) => {
  try {
    const { exp } = jwtDecode(jwt);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (err) {
    logError(err, "jwt.checkValid");
    return false;
  }
};

export const saveAuthTokens = async (accessToken, refreshToken) => {
  await saveJWT(accessToken);
  await saveRefreshToken(refreshToken);
};

export const saveJWT = async (jwt) => {
  if (isNative()) {
    await saveInNativeStorage(NATIVE_ACCESS_KEY, jwt);
  } else {
    saveInWebCookies(WEB_ACCESS_KEY, jwt);
  }
};

export const saveRefreshToken = async (refreshToken) => {
  if (isNative()) {
    await saveInNativeStorage(NATIVE_REFRESH_KEY, refreshToken);
  } else {
    saveInWebCookies(WEB_REFRESH_KEY, refreshToken);
  }
};

export const clearAuthTokens = async () => {
  if (isNative()) {
    try {
      await AsyncStorage.multiRemove([NATIVE_ACCESS_KEY, NATIVE_REFRESH_KEY]);
    } catch (error) {
      logError(error, "jwt.clearTokens");
    }
  } else {
    document.cookie = `${WEB_ACCESS_KEY}=; max-age=0`;
    document.cookie = `${WEB_REFRESH_KEY}=; max-age=0`;
  }
};

const getFromNative = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    logError(error, "jwt.readNative");
    return false;
  }
};

const getFromWebCookies = (key) => {
  const parsedCookies = cookie.parse(document.cookie);
  return parsedCookies[key] ? parsedCookies[key] : "";
};

const saveInNativeStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    logError(error, "jwt.saveNative");
  }
};

const saveInWebCookies = (key, value) => {
  document.cookie = `${key}=${value}`;
};
