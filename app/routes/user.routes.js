const express = require("express");
const router = express.Router();

const {
  getUserTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/user.controller");

const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/users")
  .get(verifyJWT, getUserTodo)
  .post(verifyJWT, addTodo)
  .patch(verifyJWT, updateTodo)
  .delete(verifyJWT, deleteTodo);

/*
  .post(controllers.addTodo)
  .patch(controllers.updateTodo)
  .delete(controllers.deleteTodo);
*/

module.exports = router;
