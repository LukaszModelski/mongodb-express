import axios from 'axios';

export const fetchExpenses = () => {
  return axios.get('https://nodejs-expenses.herokuapp.com/api/expense');
}
