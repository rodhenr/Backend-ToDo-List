const express = require("express");
const controllers = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllTodos)
  .post(controllers.addTodo)
  .patch(controllers.updateTodo)
  .delete(controllers.deleteTodo);

module.exports = router;