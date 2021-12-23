const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => console.log("connected to mongoDB")
// );

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to MongoDB! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB ! :", err);
  });

app.use("/api/v1/user", userRoute);
app.use("/api/v1/expenses", expenseRoute);

app.all("*", (req, res, next) => {
  return next(new AppError("This route does not exist", 404));
});
app.use(globalErrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at Port ${process.env.PORT}`);
});
