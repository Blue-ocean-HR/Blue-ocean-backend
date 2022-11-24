module.exports.getItemStatement = `
  select
    json_agg(
      json_build_object(
        'id',
        id,
        'pantry_ingredient',
        pantry_ingredient,
        'expiryDate',
        to_char(
          to_timestamp(expiry_date / 1000),
          'YYYY-MM-DD'
        ),
        'category',
        category
      )
    ) as results
  FROM
    pantry
  WHERE
    user_id = (
      SELECT
        id
      FROM
        users
      WHERE
        email = $1
    )

`

// to_char(to_timestamp(question_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')