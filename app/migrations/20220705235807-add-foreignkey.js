"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "user_name", {
      type: Sequelize.STRING(30),
      allowNull: false,
      references: {
        model: "users",
        key: "user_name",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tasks", "user_name");
  },
};
