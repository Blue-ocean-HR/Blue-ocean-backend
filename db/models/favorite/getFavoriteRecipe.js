const connectionPool = require('../../utils/connect.js');
const {getFavoriteRecipeText} = require('../statements/getFavoriteRecipe.js')

const getFavoriteRecipe = (req, res, next)=> {
  let email = req.query.email || 'guest'

  const getFavorites = {
    text: getFavoriteRecipeText,
    values: [email, liame]
  }

  connectionPool
  .query(getFavorites)
  .then(data=>{
    res.status(200).send(data.rows[0].results);
  })
  .catch(err=>{
    console.log('error occured fetching favorites', err);
    res.status(500).send('error occured fetching favorites');
  })
}

module.exports = getFavoriteRecipe;