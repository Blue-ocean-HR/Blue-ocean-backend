const connectionPool = require('../../utils/connect.js');

const getFavoriteRecipe = (req, res, next)=> {
  let email = req.query.email || 'guest'
  const getFavoriteRecipeOption = {
    text: `select
    json_build_object(
      'recipe_id',
      id,
      'title',
      title,
      'steps',
      directions,
      'ingredients',
      recipes_ingredients,
      'ingredientsNotInPantry',
      (
        select
          json_agg(ingredients_name)
        from
          recipe_ingredients
        where
          recipes_id = recipes.id
          and not exists (
            select
              1
            from
              pantry
            where
              user_id = (select id from users where email = '${email}' )
              and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient || '%')
          )
      ),
      'ingredientsInPantry',
      (
        select
          json_agg(ingredients_name)
        from
          recipe_ingredients
        where
          recipes_id = recipes.id
          and exists (
            select
              1
            from
              pantry
            where
              user_id = (select id from users where email = '${email}' )
              and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient || '%')
          )
      ),
    'favorited',
    (select exists(select 1 from favorites where exists (select id from users where email = '${email}' ) and favorites.recipe_id = recipes.id))
  )
from
  recipes
where
  id in (
    select
      recipe_id
    from
      favorites
    where
      user_id in (SELECT id FROM users WHERE email = '${email}'))
    `
  }
  connectionPool
  .query(getFavoriteRecipeOption)
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