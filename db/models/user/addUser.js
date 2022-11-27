const connectionPool = require('../../utils/connect.js')
const {addUserText} = require('../statements/addUser.js')

const addUser = (req, res, next) => {

  var email = req.body.email;
  const addUser = {
    text: addUserText,
    values: [email]
  }

  if (email !== '') {
    connectionPool.query(addUser)
    .then((response) => res.status(200).send('addUser'))
    .catch((error) => console.log('ERROR: ', error));
  }
}

module.exports = addUser