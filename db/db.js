// const Pool = require('pg').Pool
// require('dotenv').config();
// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DB,
//   password: process.env.PASSWORD,
//   port: process.env.DBPORT
// })

// pool.connect((err)=>{
//   if (err) {
//     console.log('failed to connect to db');
//     throw error;
//   }
//   console.log(`connected to ${process.env.DB} host: ${process.env.HOST} port: ${process.env.DBPORT}`)
// })

// module.exports = {
//   pool,
// }