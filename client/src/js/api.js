import axios from "axios";
import { logError, logInfo } from "./logger";
import { setIsUserSignedIn } from "../store/actions";
import {
  getJWT,
  getRefreshToken,
  saveAuthTokens,
  clearAuthTokens,
  checkJWTValid,
} from "./jwt";

const domain = "http://czapafunbox.ddns.net:8080/";
// const domain = "https://expenses-sxp4.onrender.com/";
// const domain = 'https://nodejs-expenses.herokuapp.com/';
//expenses-sxp4.onrender.com/
// const domain = "http://localhost:3000/";

let refreshInFlight = null;

const refreshAccessToken = () => {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const res = await axios.post(`${domain}api/user/refresh`, {
      refreshToken,
    });
    if (!res.data?.token || !res.data?.refreshToken) {
      throw new Error("Auth response is missing tokens");
    }
    await saveAuthTokens(res.data.token, res.data.refreshToken);
    return res.data.token;
  })().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
};

export const restoreSession = async () => {
  const accessToken = await getJWT();
  if (accessToken && checkJWTValid(accessToken)) {
    return true;
  }

  try {
    await refreshAccessToken();
    return true;
  } catch (error) {
    if (isAuthFailure(error)) {
      await clearAuthTokens();
      return false;
    }
    // Network/server problem: we can't tell if the session is dead, so keep it.
    logError(error, "api.restoreSession");
    return true;
  }
};

const authorizedRequest = async (config) => {
  let accessToken = await getJWT();
  if (!accessToken || !checkJWTValid(accessToken)) {
    accessToken = await refreshAccessToken();
  }

  const send = (token) =>
    axios({ ...config, params: { ...(config.params || {}), jwt: token } });

  try {
    return await send(accessToken);
  } catch (error) {
    if (!error.response || error.response.status !== 401) {
      throw error;
    }
    try {
      accessToken = await refreshAccessToken();
    } catch (retryError) {
      if (isAuthFailure(retryError)) {
        await clearAuthTokens();
        throw error;
      }
      // Network/server problem during refresh: don't log the user out.
      throw retryError;
    }
    return send(accessToken);
  }
};

const isAuthFailure = (error) =>
  (error.response && error.response.status === 401) ||
  error.message === "No refresh token";

export const handleAPIerror = async (error, dispatch) => {
  if (isAuthFailure(error)) {
    await clearAuthTokens();
    dispatch(setIsUserSignedIn(false));
    logInfo("Session expired, user logged out");
    console.info("Session expired, redirecting to login");
  } else {
    logError(error, "api.request");
  }
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${domain}api/user/login`, {
    email,
    password,
  });
  if (!res.data?.token || !res.data?.refreshToken) {
    throw new Error("Auth response is missing tokens");
  }
  await saveAuthTokens(res.data.token, res.data.refreshToken);
  return res;
};

export const revokeRefreshToken = async ({
  refreshToken,
  accessToken,
} = {}) => {
  const tokenToRevoke = refreshToken || (await getRefreshToken());
  const jwt = accessToken || (await getJWT());

  if (tokenToRevoke) {
    return axios.post(`${domain}api/user/revoke`, {
      refreshToken: tokenToRevoke,
    });
  }

  if (jwt) {
    return axios.post(`${domain}api/user/revoke`, {}, { params: { jwt } });
  }

  throw new Error("No refresh token or access token to revoke");
};

export const fetchExpenses = async () => {
  return authorizedRequest({ method: "get", url: `${domain}api/expense` });
};

/**
 * @function
 * @param {String} year - ex. 2024, 2021
 * @param {String} month - ex. 12, 3, 1
 * @returns {Array} Expenses list for the month
 */
const fetchMonthExpenses = async (year, month) => {
  return authorizedRequest({
    method: "get",
    url: `${domain}api/expense/month/${year}/${month}`,
  });
};

export const fetchCurrnetMonthExpenses = async () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  return await fetchMonthExpenses(year, month);
};

export const postNewExpense = async (
  amount,
  category,
  description,
  dateString,
) => {
  return authorizedRequest({
    method: "post",
    url: `${domain}api/expense`,
    data: { amount, category, description, dateString },
  });
};

export const deleteExpenseApi = async (id) => {
  return authorizedRequest({
    method: "delete",
    url: `${domain}api/expense`,
    data: { id },
  });
};
