const conn = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  const sql =
    "INSERT INTO user(user_name, user_password, user_email) VALUES(?, ?, ?)";
  const hash = await bcrypt.hash(password, 10);
  const values = [username, hash, email];
  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).send({
        msg: "Aconteceu um erro no seu registro...",
      });
    } else {
      res.status(201).send({
        msg: "O usuário foi registrado com sucesso",
      });
    }
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT * FROM user WHERE LOWER(user_email) = LOWER(?)",
    email,
    async (err, result) => {
      if (err) {
        throw err;
      } else if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].user_password);
        if (!match) {
          res.status(401).send({ message: "Login inválido! Tente novamente." });
        } else {
          const user = result[0].user_name;
          const accessToken = jwt.sign({ user }, process.env.SECRET, {
            expiresIn: "15m",
          });
          res.json({ user, accessToken });
        }
      } else {
        res.status(401).send({ message: "Login inválido! Tente novamente." });
        return;
      }
    }
  );
};

module.exports = { signUp, logIn };
