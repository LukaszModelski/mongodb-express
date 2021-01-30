import axios from 'axios';

export const fetchExpenses = () => {
  return axios.get('https://nodejs-expenses.herokuapp.com/api/expense');
}

export const postNewExpense = (amount, category, description) => {
  return axios.post('https://nodejs-expenses.herokuapp.com/api/expense', {
    amount,
    category,
    description
  });
}

export const deleteExpenseApi = (id) => {
  return axios.delete('https://nodejs-expenses.herokuapp.com/api/expense', {
    data: { id }
   })
}
