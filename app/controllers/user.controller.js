const conn = require("../config/db.config");
const uuid = require("uuid");
require("dotenv").config();

const getUserTodo = (req, res) => {
  const sql = "SELECT * FROM tasks WHERE user_name=?";

  conn.query(sql, req.username, (err, data) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).json({
        data: data.map((i) => {
          return { task_uuid: i.task_uuid, task_desc: i.task_desc };
        }),
      });
    }
  });
};

const addTodo = (req, res) => {
  const { item } = req.body;
  const task_uuid = uuid.v4();
  const sql =
    "INSERT INTO tasks(user_name, task_uuid, task_desc) VALUES (?, ?, ?)";
  const values = [req.username, task_uuid, JSON.stringify(item)];

  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu no cadastro!");
    } else {
      res.status(200).send("Item adicionado com sucesso!");
    }
  });
};

const updateTodo = (req, res) => {
  const { task_uuid, task_desc } = req.body;
  const sql = "UPDATE tasks SET task_desc=? WHERE task_uuid=? AND user_name=?";
  const values = [JSON.stringify(task_desc), task_uuid, req.username];

  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).send("Dados atualizados com sucesso!");
    }
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.query;
  const sql = "DELETE FROM tasks WHERE task_uuid=? AND user_name=?";
  const values = [id, req.username];

  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).send("Ops... Algo de errado aconteceu!");
    } else {
      res.status(200).send("Item deletado com sucesso!");
    }
  });
};

module.exports = { addTodo, getUserTodo, updateTodo, deleteTodo };
