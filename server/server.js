require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const path = require('path');
const app = express();

// db controllers
// const {pool} = require('../db/db.js');


// middleware
app.use(express.json());

// get

// post

// put

// delete



const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)})