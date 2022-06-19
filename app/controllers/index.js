const conn = require("../config/db");

exports.getAllTodos = (req, res, next) => {
  const sql = "SELECT * FROM testes";

  conn.query(sql, (err, data, fields) => {
    if (err) {
      console.log(err);
    }

    res.status(200).json({
      status: "sucess",
      length: data?.length,
      data,
    });
  });
};
