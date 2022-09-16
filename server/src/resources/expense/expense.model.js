const mongoose = require('mongoose');

const expenseCategories = ['sport', 'sport gear', 'food', 'alcohol', 'health', 'transport', 'holidays', 'bills', 'hardware', 'software', 'cloths', 'other'];

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