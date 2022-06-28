const conn = require("../config/db.config");
const { validationResult } = require("express-validator");
require("dotenv").config();

verifySignUp = (req, res, next) => {
  const { username, email } = req.body;
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    const errorMessages = errors.array().map((error) => error.msg);

    return res.status(400).send({
      errors: errorMessages,
    });
  } else {
    conn.query(
      "SELECT * FROM users WHERE LOWER(user_name) = LOWER(?)",
      username,
      (err, result) => {
        if (result.length) {
          res.status(409).send({ message: "Este usuário já está cadastrado" });
          return;
        }
        conn.query(
          "SELECT * FROM users WHERE LOWER(user_email) = LOWER(?)",
          email,
          (err, result) => {
            if (result.length) {
              res
                .status(409)
                .send({ message: "Este e-mail já está cadastrado" });
              return;
            }
            next();
          }
        );
      }
    );
  }
};

verifyLogIn = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).send({
      errors: errorMessages,
    });
  } else {
    next();
  }
};

module.exports = { verifySignUp, verifyLogIn };
