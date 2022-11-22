module.exports.addItemStatement = addItemStatement =
  `insert into pantry (
    user_id, pantry_ingredient, expiry_date,
    category
  )
  values
    (
      (
        select
          id
        from
          users
        where
          email = $4
      ),
      $1,
      $2,
      $3
    )`;

module.exports.userExistsStatement = userExistsStatement =

  `select
  exists (
    select
      1
    from
      users
    where
      email = $1
  ) `

