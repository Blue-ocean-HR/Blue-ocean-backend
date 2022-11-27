const connectionPool = require('../../utils/connect.js');
const {favoriteRecipeStatement} = require('../statements/favoriteRecipe.js');

const favoriteRecipe = (req, res)=>{

  const favoriteRecipeOption= {
    text: favoriteRecipeStatement,
    values: [req.body.recipe_id, req.body.email]
  }
  connectionPool.query(favoriteRecipeOption)
  .then(data=>{
    console.log('favorited recipe added');
    res.status(201).send('favorite recipe added');
  })
  .catch(err=>{
    console.log('posting favorite recipe failed', err);
    res.status(500).send('posting favorite recipec failed');
  })
}

module.exports =favoriteRecipe;