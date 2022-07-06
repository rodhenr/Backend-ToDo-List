const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Nenhum token encontrado." });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Falha ao autenticar o token.", err });
    }
    req.username = decoded.userName;
    next();
  });
};

module.exports = verifyToken;
