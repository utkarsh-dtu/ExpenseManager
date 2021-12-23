// const express = require('express')
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const AppError = require("../utils/AppError");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return next(new AppError("You are not logged in", 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    // console.log("decoded : ", decoded);
    // console.log(typeof decoded.payload);
    const currentUser = await User.findById(decoded.payload);

    if (!currentUser)
      return next(new AppError("This user no longer exists", 401));
    // console.log(typeof currentUser);
    req.user = currentUser;
    // console.log(req.user);
    // console.log("req.user._id", req.user._id);
    // console.log("currentUser", currentUser);
    // console.log(currentUser._id);
    // console.log("req.user._id", req.user._id);
    // console.log("req.user._id", req.user._id.toString());

    // the problem here was : when i took req.user_id, it was an object actually
    // but this id needs to be converted to a string, hence we use toString() function

    next();
  } catch (error) {
    return next(error);
  }
};
