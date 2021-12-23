const Expense = require("./../models/expenseModel");
const AppError = require("./../utils/AppError");
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    // const expenses = await Expense.find({ deleted: { $ne: true } });
    // if (!expenses) res.status(404).json({ message: "not found" });
    if (!expenses) return next(new AppError("No results", 404));

    res.status(200).json({
      res: {
        data: expenses,
        message: "Success",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyExpenses = async (req, res, next) => {
  try {
    const myExpenses = await Expense.find({ userId: req.user._id.toString() });
    res.status(200).json({
      res: {
        data: myExpenses,
        message: "success",
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    // const { userId, name, value, category } = req.body;
    const { name, value, category } = req.body;
    const newExpense = {
      userId: req.user._id.toString(),
      name: name,
      value: value,
      category: category,
    };
    const expense = await Expense.create(newExpense);
    // console.log(expense);
    res.status(201).json({
      res: {
        data: expense,
        message: "Expense added successfully!",
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.statusCode));
  }
};

// not yet addded this to the routes
exports.editExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await Expense.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      res: {
        data: updated,
        message: "Expense updated successfully",
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);

    const expense = await Expense.findById(id);

    if (!expense) return next(new AppError("Expense Not found", 404));
    if (expense.deleted === true)
      return next(new AppError("Expense was already Deleted", 400));

    await Expense.findByIdAndUpdate(id, { deleted: true });

    res.status(200).json({
      res: {
        message: "Item was deleted successfully!",
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.undoDelete = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) return next(new AppError("No such expense found", 404));
    if (expense.deleted === false)
      return next(new AppError("Expense already exists", 400));
    await Expense.findByIdAndUpdate(req.params.id, { deleted: false });
    res.status(200).json({ message: "Undone delete" });
  } catch (error) {
    return next(error);
  }
};

// aggregation pipeline for calculating sum of all expenses

// it takes in an array of stages, the first stage is the match stage, which will filter out documents (here in this case, it will filter out documents whose deleted === false)
// second stage is the group stage, it will sum the value for each of the document
exports.getExpenseSum = async (req, res, next) => {
  // console.log("hi");
  try {
    // console.log("ruid", req.user._id);

    const result = await Expense.aggregate([
      {
        $match: { deleted: false, userId: req.user._id.toString() },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$value" },
        },
      },
    ]);

    res.status(200).json({
      res: {
        data: result,
        message: "Success",
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getExpensesByCategory = async (req, res, next) => {
  try {
    // console.log("ruid", req.user._id);
    // for (let i = 0; i < req.user._id.length; i++) console.log(req.user._id[i]);
    // console.log(typeof req.user._id);
    // , userId: req.user._id
    const result = await Expense.aggregate([
      {
        $match: { deleted: false, userId: req.user._id.toString() },
      },

      {
        $group: {
          _id: "$category",
          totalExpenses: { $sum: "$value" },
        },
      },
      {
        $project: {
          category: "$_id",
          _id: 0,
          totalExpenses: "$totalExpenses",
        },
      },
    ]);

    res.status(200).json({
      res: {
        data: result,
        message: "Success",
      },
    });
  } catch (error) {
    return next(error);
  }
};
