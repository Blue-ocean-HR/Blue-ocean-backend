require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes.js')
const argon2 = require('argon2');
const path = require('path');
const app = express();
const connectionPool = require('../db/utils/connect.js')
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', routes)

app.listen(port, ()=>{console.log(`listening to port ${port}`)})