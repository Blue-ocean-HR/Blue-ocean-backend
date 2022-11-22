const connectionPool = require('../../utils/connect.js')

const addUser = (req, res, next) => {
  var email = req.query.email;
  if (email !== '') {
    connectionPool.query(`insert into users (email) values ('${req.body.email}');`)
    .then((response) => res.status(200)send('addUser'))
    .catch((error) => console.log('ERROR: ', error));
  }
}

module.exports = addUser