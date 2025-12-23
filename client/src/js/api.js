import axios from "axios";
import { getJWT } from "./jwt";

const domain = "http://czapafunbox.ddns.net:8080/";
// const domain = "https://expenses-sxp4.onrender.com/";
// const domain = 'https://nodejs-expenses.herokuapp.com/';
//expenses-sxp4.onrender.com/
// const domain = "http://localhost:3000/";

export const handleAPIerror = (error, navigation) => {
  if (error.response && error.response.status === 401) {
    navigation.navigate("LoginView");
    console.info("Redirecting to login page");
  } else {
    console.error(error);
  }
};

export const loginUser = (email, password) => {
  return axios.post(`${domain}api/user/login`, { email, password });
};

export const fetchExpenses = async () => {
  const jwt = await getJWT();
  return axios.get(`${domain}api/expense`, {
    params: { jwt: jwt },
  });
};

/**
 * @function
 * @param {String} year - ex. 2024, 2021
 * @param {String} month - ex. 12, 3, 1
 * @returns {Array} Expenses list for the month
 */
const fetchMonthExpenses = async (year, month) => {
  const jwt = await getJWT();
  return axios.get(`${domain}api/expense/month/${year}/${month}`, {
    params: { jwt: jwt },
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
  dateString
) => {
  return axios.post(
    `${domain}api/expense`,
    {
      amount,
      category,
      description,
      dateString,
    },
    {
      params: { jwt: await getJWT() },
    }
  );
};

export const deleteExpenseApi = async (id) => {
  return axios.delete(`${domain}api/expense`, {
    data: { id },
    params: { jwt: await getJWT() },
  });
};
