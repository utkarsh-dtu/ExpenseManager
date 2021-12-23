const express = require("express");
const router = express.Router();
const {
  signup,
  login,

  logout,
} = require("./../controllers/userController");

router.route("/").get((req, res, next) => {
  res.status(200).json({
    chal: "nikal",
  });
});

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
// router.route("/updateUser").post(updateUser); // need to implement protect route first only then this can be done

module.exports = router;
