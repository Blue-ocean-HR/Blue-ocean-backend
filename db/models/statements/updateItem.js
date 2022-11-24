module.exports.updateItemStatement = `
  UPDATE
    pantry
  SET
    (pantry_ingredient, expiry_date) = ($1, $2)
  WHERE
    id = $3
`