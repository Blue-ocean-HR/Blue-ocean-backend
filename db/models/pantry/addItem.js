const connectionPool = require('../../utils/connect.js')

const addItem = (req, res, next) => {
  res.send('addItem')
}

module.exports = addItem