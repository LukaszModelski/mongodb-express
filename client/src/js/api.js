import axios from 'axios';
import { getJWTfromStorage } from "./jwt";

export const handleAPIerror = (error, navigation) => {
  if (error.response && error.response.status === 401) {
    navigation.navigate('LoginScreen');
    console.info('Redirecting to login page');
  } else {
    console.error(error);
  }
}

export const loginUser = (email, password) => {
  return axios.post(`${domain}api/user/login`, { email, password });
}

export const fetchExpenses = () => {
  return axios.get(`${domain}api/expense`, {
    params: { jwt: getJWTfromStorage() }
  });
}

export const postNewExpense = (amount, category, description, dateString) => {
  return axios.post(`${domain}api/expense`,
    {
      amount,
      category,
      description,
      dateString
    },
    { 
      params: { jwt: getJWTfromStorage() }
    }
  );
}

export const deleteExpenseApi = (id) => {
  return axios.delete(`${domain}api/expense`,
    {
      data: { id },
      params: { jwt: JWT }
    }
  );
}
