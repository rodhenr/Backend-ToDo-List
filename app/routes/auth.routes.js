const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../controllers/auth.controller");
const {
  handleRefreshToken,
} = require("../controllers/refreshToken.controller");
const { verifySignUp, verifyLogIn } = require("../middleware/authVerify");
const { signupValidation } = require("../middleware/inputValidation");

router.route("/auth/register").post(signupValidation, verifySignUp, signUp);

router.route("/auth/login").post(loginValidation, verifyLogIn, logIn);

router.route("/auth/refresh").get(handleRefreshToken);

module.exports = router;
