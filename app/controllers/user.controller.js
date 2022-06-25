const conn = require("../config/db.config");
const uuid = require("uuid");
require("dotenv").config();

const addTodo = (req, res) => {
  const item = req.body;
  const u_id = 1;
  const t_id = uuid.v4();
  const sql = "INSERT INTO task(user_id, task_id, task_desc) VALUES (?, ?, ?)";
  const values = [u_id, t_id, JSON.stringify(item)];

  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).send("Item adicionado com sucesso!");
    }
  });
};

const getAllTodos = (req, res) => {
  const { id } = req.query;
  const sql = "SELECT * FROM task WHERE user_id=?";
  const values = [id];

  conn.query(sql, values, (err, data) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).json({
        data,
      });
    }
  });
};

const updateTodo = (req, res) => {
  const {
    data: { id, item },
  } = req.body;
  const sql = "UPDATE task SET task_desc=? WHERE task_id=?";
  const values = [JSON.stringify(item), id];

  conn.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).send("Dados atualizados com sucesso!");
    }
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.query;
  const sql = "DELETE FROM task WHERE task_id=?";
  const values = [id];

  conn.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).send("Item deletado com sucesso!");
    }
  });
};

module.exports = { addTodo, getAllTodos, updateTodo, deleteTodo };
