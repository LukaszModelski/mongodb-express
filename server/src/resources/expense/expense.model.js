const mongoose = require('mongoose');

const expense = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

export const Expense = mongoose.model('expense', expense);