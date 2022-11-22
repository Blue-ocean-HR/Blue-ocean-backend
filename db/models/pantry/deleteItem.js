const connectionPool = require('../../utils/connect.js')
const {userExistsStatement} = require('../statements/addPantryItem.js')

const deleteItem = (req, res, next) => {
  let id=req.query.pantryId
  connectionPool.query(`delete from pantry where id=${id}`)
    .then((response) => res.send('deleteItem'))
    .catch((error) => console.log('ERROR: ', error));
}

module.exports = deleteItem