const AppError = require("./../utils/AppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

// this is the global error handling middleware, whenever i pass an argument inside the next function, we automatically reach this global error handling middleware
module.exports = errorController = (err, req, res, next) => {
  //   sendErrorDev(err, res);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "production") sendErrorProd(err, res);
  else sendErrorDev(err, res);
};
