module.exports.deleteFavoriteStatement = `
  DELETE FROM
    favorites
  WHERE
    recipe_id = $1
    AND user_id in (
      SELECT
        id
      from
        users
      WHERE
        email = $2
    )
`
