const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    connection.query(`use ${process.env.DB_DATABASE}`, (err, result) => {
      if (err) {
        throw err;
      } else {
        connection.query(
          "CREATE TABLE IF NOT EXISTS Users(user_id INT AUTO_INCREMENT PRIMARY KEY, user_name VARCHAR(30) NOT NULL UNIQUE, user_password VARCHAR(255) NOT NULL, user_email VARCHAR(255) NOT NULL UNIQUE);",
          (err, result) => {
            if (err) {
              throw err;
            } else {
              connection.query(
                "CREATE TABLE IF NOT EXISTS Tasks(task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user_name VARCHAR(30) NOT NULL, task_uuid CHAR(36) NOT NULL UNIQUE, task_desc JSON NOT NULL, FOREIGN KEY(user_name) REFERENCES Users(user_name));",
                (err, result) => {
                  if (err) {
                    throw err;
                  }
                }
              );
            }
          }
        );
      }
    });
  }
});

module.exports = connection;
