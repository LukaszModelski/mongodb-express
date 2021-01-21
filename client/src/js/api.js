import axios from 'axios';

export const fetchExpenses = () => {
  return axios.get('https://nodejs-expenses.herokuapp.com/api/expense');
}

export const postNewExpense = (amount, category, description) => {
  return axios.post('https://nodejs-expenses.herokuapp.com/api/expense', {
    amount: amount,
    category: category,
    description: description
  });
}
