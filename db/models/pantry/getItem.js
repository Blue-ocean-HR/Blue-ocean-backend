const connectionPool = require('../../utils/connect.js')
const {getItemStatement} = require('../statements/getItem.js')

const getItem = (req, res, next) => {
  console.log('GET TRIGGERED', req.query)
  const getItemOption = {
    text: getItemStatement,
    values: [req.query.email]
  }
  connectionPool.query(getItemOption)
  .then(data=>{
    console.log('fetched item', data);
    res.status(200).send(data.rows);;
  })
}

module.exports = getItem