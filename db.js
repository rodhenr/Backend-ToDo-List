const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    dialect: process.env.DB_DIALECT,
  }
);

const serverConnect = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Conectou...");
    })
    .catch((err) => {
      console.log(err);
    });
};

serverConnect();

module.exports = sequelize;
