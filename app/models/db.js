const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;

// // For Redis connection and integration, we follow the below code

// const mysql = require("mysql2/promise"); // Use mysql2 for Promise-based API
// const dbConfig = require("../config/db.config.js");

// const pool = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = pool;
