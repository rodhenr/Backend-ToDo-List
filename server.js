const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./app/middleware/errorHandler");

const app = express();
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const port = process.env.PORT || 8080;

app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}...`);
});

module.exports = app;
