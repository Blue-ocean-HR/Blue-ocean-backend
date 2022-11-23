const connectionPool = require('../../utils/connect.js');
const {deleteFavoriteStatement} = require('../statements/deleteFavorite.js');

const getFavoriteRecipe = (req, res)=> {
  const getFavoriteRecipeOption = {
    text: ,
    values: [req.body.email]
  }
  connectionPool.query(getFavoriteRecipeOption)
  .then(data=>{
    console.log(data.rows);
    res.status(200).send(data.rows);
  })
  .catch(err=>{
    console.log('error occured fetching favorites', err);
    res.status(500).send('error occured fetching favorites');
  })
}

module.exports = getFavoriteRecipe;