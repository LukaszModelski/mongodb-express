const mongoose = require('mongoose')

const config = {
  database: 'expenses',
  env: 'localhost:27017'
}

const expense = new mongoose.Schema({
  category: String
});

const Expense = mongoose.model('expense', expense);

mongoose.connect('mongodb://'+ config.env + '/' + config.database)
  .then(async connection => {
    const expense = await Expense.create({category: 'tennis 2'});
    console.log(expense);
  })
  .catch(error => console.log(error))

export const logFunction = () => {
  console.log('test from log function');
}