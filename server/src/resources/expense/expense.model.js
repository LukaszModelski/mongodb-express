const mongoose = require('mongoose');

const expense = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['sport', 'cloths', 'sport gear', 'bills', 'softwear', 'food', 'other']
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

export const Expense = mongoose.model('expense', expense);