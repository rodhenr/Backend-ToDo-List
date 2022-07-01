const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./app/middleware/errorHandler");
const cors = require("cors");

const app = express();
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const port = 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}...`);
});

module.exports = app;
