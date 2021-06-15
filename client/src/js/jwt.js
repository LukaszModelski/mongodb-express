import cookie from 'cookie';
import { isNative } from "./utils";

export const getJWTfromStorage = () => isNative() ? getJWTFromNative() : getJWTFromWebCookies();

export const saveJWTinStorage = (jwt) => {
  if (isNative()) {
    saveJWYinNativeStorage(jwt);
  } else {
    saveJWTinWebCookies(jwt);
  }
}

const getJWTFromWebCookies = () => {
  const parsedCookies = cookie.parse(document.cookie);
  return parsedCookies.jwt ? parsedCookies.jwt : '';
}

const getJWTFromNative = () => {
  // TO DO - get token from native storage
  console.log('Get JWT from native storage');
}

const saveJWTinWebCookies = (jwt) => {
  document.cookie=`jwt=${jwt}`
}

const saveJWYinNativeStorage = () => {
  // TO DO - save token to native storage
  console.log('Save JWT to native storage');
}
