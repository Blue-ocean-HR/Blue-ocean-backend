require('dotenv').config()
const Pool = require('pg').Pool


let config = {
  user: process.env.USER,
  host:process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  idle_session_timeout: process.env.IDLE_SESSION_TIMEOUT
}

let connectionPool = new Pool(config);

module.exports = connectionPool;
