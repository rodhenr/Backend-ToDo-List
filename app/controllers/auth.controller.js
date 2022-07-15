const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      user_name: username,
      user_password: hashedPassword,
      user_email: email,
    });
    res.status(201).send({
      msg: "O usuário foi registrado com sucesso",
    });
  } catch (err) {
    res.status(500).send({
      msg: "Aconteceu um erro no seu registro...",
    });
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userLogin = await User.findOne({
      where: { user_name: username.toLowerCase() },
    });

    if (!userLogin)
      return res
        .status(401)
        .send({ message: "Login inválido! Tente novamente." });

    const match = await bcrypt.compare(password, userLogin.user_password);
    if (!match)
      return res
        .status(401)
        .send({ message: "Login inválido! Tente novamente." });

    const userName = userLogin.user_name;
    const accessToken = jwt.sign({ userName }, process.env.SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ userName }, process.env.REFRESH_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).send({
      msg: "Aconteceu um erro no seu registro...",
    });
  }
};

module.exports = { signUp, logIn };
