const Sequelize = require("sequelize");
const database = require("../../db");

const User = database.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
