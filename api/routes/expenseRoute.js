const express = require("express");
const router = express.Router();
const {
  addExpense,
  editExpense,
  deleteExpense,
  getAllExpenses,
  undoDelete,
  getExpenseSum,
  getExpensesByCategory,
  getMyExpenses,
} = require("./../controllers/expenseController");

const { protect } = require("./../controllers/authController");
router.route("/").post(addExpense).get(getAllExpenses);
router.use(protect);
// router.route("/").post(addExpense).get(getAllExpenses);
router.route("/edit/:id").patch(editExpense);
router.route("/delete/:id").patch(deleteExpense);
router.route("/undoDelete/:id").patch(undoDelete);
router.route("/getExpenseSum").get(getExpenseSum);
router.route("/getExpensesByCategory").get(getExpensesByCategory);
router.route("/getMyExpenses").get(getMyExpenses);

// router.route()

module.exports = router;

// add expenses , edit and delete expenses
