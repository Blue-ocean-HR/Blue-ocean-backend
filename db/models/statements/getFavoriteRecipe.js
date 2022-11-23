module.exports.getFavoriteRecipeText =  `select
json_agg(json_build_object(
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
          user_id = (select id from users where email = $1 )
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
          user_id = (select id from users where email = $1 )
          and recipe_ingredients.ingredients_name like ('%' || pantry_ingredient || '%')
      )
  ),
'favorited',
(select exists(select 1 from favorites where (select id from users where email = $1 ) = 1 and favorites.recipe_id = recipes.id))
)) as results
from
recipes
where
id in (
select
  recipe_id
from
  favorites
where
  user_id in (SELECT id FROM users WHERE email = $1))
`