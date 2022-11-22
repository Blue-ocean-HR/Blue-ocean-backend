const connectionPool = require('../../utils/connect.js')

const deleteItem = (req, res, next) => {
  let id=req.query.pantryId
  if (id >= 0) {
    connectionPool.query(`delete from pantry where id=${id}`)
    .then((response) => res.send('deleteItem'))
    .catch((error) => console.log('ERROR: ', error));
  }
}

module.exports = deleteItem