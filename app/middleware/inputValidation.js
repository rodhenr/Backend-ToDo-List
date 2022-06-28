const { check } = require("express-validator");

signupValidation = [
  check("email", "Por favor, inclua um e-mail válido")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("username", "O nome de usuário deve possuir 5 ou mais digitos")
    .notEmpty()
    .isLength({ min: 5 }),
  check("password", "A senha deve possuir 6 ou mais digitos").isLength({
    min: 6,
  }),
];

loginValidation = [
  check("username")
    .exists()
    .withMessage("Nome de usuário necessário")
    .isLength({ min: 5 })
    .withMessage("O nome de usuário deve possuir 5 ou mais digitos"),
  check("password", "A senha deve possuir 6 ou mais digitos").isLength({
    min: 6,
  }),
];

module.exports = {
  signupValidation,
  loginValidation,
};
