const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/AppError");
// exports.signup = async (req, res, next) => {
//   console.log("req.body : ", req.body);
//   try {
//     const newUser = {
//       name: req.body.name,
//       Age: req.body.Age,
//       email: req.body.email,
//       password: req.body.password,
//       passwordConfirm: req.body.passwordConfirm,
//       country: req.body.country,
//       city: req.body.city,
//       Profession: req.body.Profession,
//     };

//     console.log("this is what i am sending to the db : ", newUser);
//     console.log(typeof newUser);
//     // const user = await User.create(newUser);

//     const user = await User.create(req.body);
//     const token = jwt.sign({ payload: user._id }, process.env.JWT_KEY);
//     res.cookie("jwt", token, {
//       maxAge: 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });
//     res.status(201).json({
//       res: {
//         data: user,
//         token: token,
//       },
//       message: "User created successfully",
//     });
//   } catch (error) {
//     return next(error);
//   }
// };
exports.signup = async (req, res, next) => {
  console.log("req.body : ", req.body);

  try {
    // const newUser = {
    //   name: req.body.name,
    //   Age: req.body.Age,
    //   email: req.body.email,
    //   password: req.body.password,
    //   passwordConfirm: req.body.passwordConfirm,
    //   country: req.body.country,
    //   city: req.body.city,
    //   Profession: req.body.Profession,
    // };
    // console.log(newUser);
    // console.log(typeof newUser);
    // const user = await User.create(newUser);
    // if (!user) return next(new AppError("Could not create", 501));
    // res.status(201).json({
    //   data: user,
    //   message: "User created successfully",
    // });

    const newUser = new User({
      name: req.body.name,
      Age: req.body.Age,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      country: req.body.country,
      city: req.body.city,
      Profession: req.body.Profession,
    });

    const user = await newUser.save();
    res.status(201).json({
      data: user,
      message: "User saved successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  // console.log("request has been hit");
  // res.json("hi");
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password must be provided", 400));
  }

  const user = await User.findOne({ email });
  try {
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Username or Password", 401));
    }

    const token = jwt.sign({ payload: user._id }, process.env.JWT_KEY);
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      res: {
        data: user,
        token,
        message: "Logged In successfully",
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 2 * 1000),
  });
  res.status(200).json({
    res: {
      data: "none",
      message: "logged out",
    },
  });
};

// exports.forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({
//         res: {
//           data: "none",
//           message: "Please sign up",
//         },
//       });

//     let passwordResetToken = user.createPasswordResetToken();
//     let link = `${req.protocol}://${req.host}:${req.port}/api/v1/users/${resetPassword}/:${passwordResetToken}`;

//     console.log(link);
//   } catch (err) {
//     res.status(500).json({
//       res: {
//         data: "None",
//         message: err.message,
//       },
//     });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const token = req.params.token;
//   let { password, passwordConfirm } = req.body;
//   // const user = await User.findOne({resetPassword: password})
// };

// exports.forgotPassword = async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     // return res.status()
//     // handle the error here
//     res.status(404).json("user not found");
//   }

//   const resetToken = user.createPasswordResetToken();
//   await user.save();
// };
