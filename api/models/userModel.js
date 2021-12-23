const mongoose = require("mongoose");
// import { isEmail } from "validator";
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is a required Field"],
    minLength: 4,
    maxLength: 65,
  },

  Age: {
    type: Number,
    min: [18, "user must be at least 18 years old"],
    max: [120, "please enter a valid age"],
    required: [true, "Age Is a required Field"],
  },

  email: {
    type: String,
    unique: [true, "Email Should be unique"],
    required: [true, "Please enter email"],
    validate: [validator.isEmail, "Please enter a valid email ID"],
  },

  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: 8,
    // select: false,
    // you can make select : false later in the schema to avoid querying for the password
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },

  country: {
    type: String,
    required: [true, "Please enter yout country name"],
  },

  city: {
    type: "String",
    maxLength: [120, "please enter a valid city name"],
  },

  Profession: {
    type: String,
    minLength: [4, "please enter a valid Profession"],
  },
  passswordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  //   if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // this token is going to be sent to the user

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
