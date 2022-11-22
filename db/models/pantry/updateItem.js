const connectionPool = require('../../utils/connect.js')
const {updateItemStatement} = require('../statements/updateItem.js')

const updateItem = (req, res, next) => {
  console.log(req);
  let updateItemOption = {
    text: updateItemStatement,
    values: [req.query.name, req.query.date, req.query.id]
  }
  connectionPool.query(updateItemOption)
  .then(data=>{
    console.log('update successful', data);
    res.status(200).send('update successful');
  })
  .catch(err=>{
    console.log('err updating', err);
    res.status(500).send('failed to update pantry item');
  })
}

module.exports = updateItem