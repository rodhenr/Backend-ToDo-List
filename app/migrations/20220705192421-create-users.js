"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      user_password: { type: Sequelize.STRING, allowNull: false },
      user_email: { type: Sequelize.STRING, allowNull: false, unique: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
