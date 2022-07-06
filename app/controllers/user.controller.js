const { Task } = require("../models");
const uuid = require("uuid");
require("dotenv").config();

const getUserTodo = async (req, res) => {
  const { username } = req;

  try {
    const userData = await Task.findAll({
      where: { user_name: username.toLowerCase() },
    });
    if (!userData) return;

    return res.status(200).json({
      data: userData.map((i) => {
        return { task_uuid: i.task_uuid, task_desc: i.task_desc };
      }),
    });
  } catch (err) {
    return res.status(500).send("Ops... Algo de errado aconteceu!");
  }
};

const addTodo = async (req, res) => {
  const { username } = req;
  const { item } = req.body;
  const task_uuid = uuid.v4();

  try {
    await Task.create(
      {
        task_uuid,
        task_desc: item,
        user_name: username,
      },
      {
        where: { user_name: username.toLowerCase() },
      }
    );

    return res.status(200).send("Item adicionado com sucesso!");
  } catch (err) {
    return res.status(500).send("Ops... Algo de errado aconteceu no cadastro!");
  }
};

const updateTodo = async (req, res) => {
  const { task_uuid, task_desc } = req.body;
  const { username } = req;

  try {
    const toDo = await Task.findOne({
      where: { task_uuid: task_uuid, user_name: username.toLowerCase() },
    });
    toDo.task_desc = task_desc;
    await toDo.save();

    return res.status(200).send("Dados atualizados com sucesso!");
  } catch (err) {
    return res.status(500).send("Ops... Algo de errado aconteceu!");
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.query;
  const { username } = req;

  try {
    await Task.destroy({
      where: { task_uuid: id, user_name: username.toLowerCase() },
    });

    return res.status(200).send("Item deletado com sucesso!");
  } catch (err) {
    return res.status(500).send("Ops... Algo de errado aconteceu!");
  }
};

module.exports = { addTodo, getUserTodo, updateTodo, deleteTodo };
