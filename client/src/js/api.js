import axios from "axios";
import { getJWT } from "./jwt";

const domain = "http://czapafunbox.ddns.net:8080/";
// const domain = "https://expenses-sxp4.onrender.com/";
// const domain = 'https://nodejs-expenses.herokuapp.com/';
//expenses-sxp4.onrender.com/
// const domain = 'http://localhost:3000/';

export const handleAPIerror = (error, navigation) => {
  if (error.response && error.response.status === 401) {
    navigation.navigate("LoginScreen");
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
