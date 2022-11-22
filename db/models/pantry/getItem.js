const connectionPool = require('../../utils/connect.js')

const getItem = (req, res, next) => {
  res.send('getItem')
}

module.exports = getItem