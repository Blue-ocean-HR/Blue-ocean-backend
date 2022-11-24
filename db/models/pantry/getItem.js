const connectionPool = require('../../utils/connect.js')
const {getItemStatement} = require('../statements/getItem.js')

const getItem = (req, res, next) => {

  const getItemOption = {
    text: getItemStatement,
    values: [req.query.email]
  }

  connectionPool.query(getItemOption)
  .then(data=>{
    console.log('fetched item', data);
    res.status(200).send(data.rows[0].results);
  })
}

module.exports = getItem