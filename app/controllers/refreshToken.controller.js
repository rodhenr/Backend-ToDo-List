const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(406).json({ message: "Refresh Token expired" });
    } else {
      const user = decoded.user;
      const accessToken = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: "10m",
      });

      const refreshToken = jwt.sign({ user }, process.env.REFRESH_SECRET, {
        expiresIn: "15m",
      });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken });
    }
  });
};

module.exports = { handleRefreshToken };
