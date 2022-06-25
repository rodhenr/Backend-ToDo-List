const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const port = process.env.PORT || 8080;

app.use(cors({ "Access-Control-Allow-Origin": "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}...`);
});

module.exports = app;
