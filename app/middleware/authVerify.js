const { User } = require("../models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
require("dotenv").config();

verifySignUp = async (req, res, next) => {
  const { username, email } = req.body;
  const errors = validationResult(req);

  if (errors.errors.length > 0)
    return res.status(400).send({
      errors: errors.array().map((error) => error.msg),
    });

  try {
    const users = await User.findOne({
      where: {
        [Op.or]: [
          { user_name: username.toLowerCase() },
          { user_email: email.toLowerCase() },
        ],
      },
    });

    if (users)
      return res
        .status(409)
        .send({ message: "Este usuário já está cadastrado" });

    next();
  } catch (err) {
    return res.status(500).send("Ops... Algo de errado aconteceu!");
  }
};

verifyLogIn = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0)
    return res.status(400).send({
      errors: errors.array().map((error) => error.msg),
    });

  next();
};

module.exports = { verifySignUp, verifyLogIn };
