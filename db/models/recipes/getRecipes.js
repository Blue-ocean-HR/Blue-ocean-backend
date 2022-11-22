const connectionPool = require('../../utils/connect.js')



const getRecipes = (req, res, next) => {

  const statement = {
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
                user_id = (select id from users where email = 'drew')
                and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient)
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
                user_id = (select id from users where email = 'drew')
                and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient)
            )
        ),
      'favorited',
      (select exists(select 1 from favorites where (select id from users where email = 'drew') = 1 and favorites.recipe_id = recipes.id)) --   'favorited', (select column from favorites where recipe_id=recipes.id and user_id = //input//)
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
            ingredients_name like any (array[ '%chicken%', '%beef%' ])
          group by
            recipes_id
        ) as matching
      where
        array_to_string(match, ',') like all (array[ '%chicken%', '%beef%' ])
    )`
  }

  connectionPool
  .query(statement)
  .then((data) => {
    res.send(data.rows)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).end()
  })
}

module.exports = getRecipes