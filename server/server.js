require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const path = require('path');
const app = express();
const connectionPool = require('../db/utils/connect.js')
const port = process.env.PORT;

connectionPool.connect((err)=>{
  if (err) {
    console.log('failed to connect to db', err);
  } else {
    console.log(`connected to ${process.env.DB} host: ${process.env.HOST} port: ${process.env.DBPORT}`)
  }
})

// middleware
app.use(express.json());

// get

// post

// put

// delete

app.listen(port, ()=>{console.log(`listening to port ${port}`)})