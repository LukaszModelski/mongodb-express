const mongoose = require('mongoose');

const expenseCategories = ['sport', 'cloths', 'sport gear', 'bills', 'software', 'food', 'other'];

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: expenseCategories
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true,
  }
});

export const categories = expenseCategories;
export const Expense = mongoose.model('expense', expenseSchema);