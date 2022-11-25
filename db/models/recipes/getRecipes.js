const connectionPool = require('../../utils/connect.js')

const getRecipes = (req, res, next) => {
  let page = req.query.page || 1
  let count = req.query.count || 5
  let email = req.query.email || 'guest'
  let ingredients = req.body.ingredients

  let transformedIngredients = ingredients.map(function(string) {
    let transformed = `'%${string}%'`
    return transformed;
  })

  let ingredientsText = `${transformedIngredients}`

  const getRecipes = {
    text: `select
    json_agg(
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
                user_id = (select id from users where email = '${email}')
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
                user_id = (select id from users where email = '${email}')
                and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient || '%')
            )
        ),
      'favorited',
      (select exists(select 1 from favorites where (select id from users where email = '${email}') = user_id and favorites.recipe_id = recipes.id))
        )
    )
  from
    recipes
  where
    id in (
      select
        recipes_id
      from
        (
          select
            array_agg(ingredients_name) as match,
            recipes_id
          from
            recipe_ingredients
          where
            ingredients_name like any (array[${ingredientsText}])
          group by
            recipes_id limit ${count} offset((${count} * ${page}) - ${count})
        ) as matching
      where
        array_to_string(match, ',') like all (array[${ingredientsText}])
    )`
  }

  connectionPool
  .query(getRecipes)
  .then((data) => {
    console.log(data)
    res.send(data.rows[0].json_agg)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).end()
  })
}

module.exports = getRecipes