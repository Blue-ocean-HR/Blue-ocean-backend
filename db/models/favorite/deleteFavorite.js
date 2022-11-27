const connectionPool = require('../../utils/connect.js');
const {deleteFavoriteStatement} = require('../statements/deleteFavorite.js');

const deleteFavorite = (req, res) => {

  const deleteFavoriteOption = {
    text: deleteFavoriteStatement,
    values: [req.body.recipe_id, req.body.email]
  }
  connectionPool.query(deleteFavoriteOption)
  .then(data=>{
    console.log('deleted from favorited recipe');
    res.status(201).send('deleted from favorited');
  })
  .catch(err=>{
    console.log('err deleting favorited recipe');
    res.status(500).send('err deleteing from favorited recipes');
  })
}

module.exports = deleteFavorite;