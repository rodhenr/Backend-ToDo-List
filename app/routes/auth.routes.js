const express = require("express");
const router = express.Router();
const controllers = require("../controllers/auth.controller");
const refresh = require("../controllers/refreshToken.controller");
const auth = require("../middleware/auth");
const { signupValidation } = require("../middleware/inputValidation");

router
  .route("/auth/register")
  .post(signupValidation, auth.verifySignUp, controllers.signUp);

router
  .route("/auth/login")
  .post(loginValidation, auth.verifyLogIn, controllers.logIn);

module.exports = router;
