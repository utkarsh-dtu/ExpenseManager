const mongoose = require("mongoose");

const expenseModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please specify the name of the expene"],
  },
  category: {
    type: String,
    required: [true, "category should be specified"],
  },
  value: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Expense = mongoose.model("Expense", expenseModel);

module.exports = Expense;
