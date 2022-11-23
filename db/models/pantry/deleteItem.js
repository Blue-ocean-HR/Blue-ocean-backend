const connectionPool = require('../../utils/connect.js');
const {deleteItemStatement} = require('../statements/deleteItem.js');

const deleteItem = (req, res, next) => {
  const deleteItemOption = {
    text: deleteItemStatement,
    values: [req.body.id]
  }
  connectionPool.query(deleteItemOption)
  .then(data=>{
    console.log('delete item complete');
    res.status(201).send('item deleted from pantry');
  })
  .catch(err=>{
    console.log('delete item err')
    res.status(500).send('invalid id input');
  })
}

module.exports = deleteItem