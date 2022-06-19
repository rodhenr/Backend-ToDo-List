const express = require("express");
require("dotenv").config();

const app = express();
const router = require("./app/routes");
const port = process.env.PORT || 8080;

app.use(router);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}...`);
});

module.exports = app;
