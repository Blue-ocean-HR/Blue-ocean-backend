const connectionPool = require('../../utils/connect.js')

const deleteItem = (req, res, next) => {
  res.send('deleteItem')
}

module.exports = deleteItem