const connectionPool = require('../../utils/connect.js')

const addItem = (req, res, next) => {

  let name = req.query.name;
  let date = req.query.date;
  let category = req.query.category;
  let email = req.query.email;

  const userExists = {
    text: `select exists (select 1 from users where email = ${email})`
  }

  if (name && date && category && email) {
    console.log('yes')
    connectionPool.query(userExists)
    .then((data) => {
      if (data.rows[0].exists === false) {
        res.send('Please make sure you send a registered user')
      } else {
        connectionPool.
        query(
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
                  email = ${email}
              ),
              ${name},
              ${date},
              ${category}
            )
          `
        )
        .then((data) => {
          res.sendStatus(200)
        })
        .catch((err) => {
          console.log(err)
          res.sendStatus(500)
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })

  } else {
    res.send('Please make sure you are sending an ingredient name, a date, a category and a registered email')
  }

  // res.send('addItem')
}

module.exports = addItem
// Create: Takes in a name, date, category and email
// Read: Takes in a email
// Update: Takes in a IngredientName, ExpiryDate, pantryId
// Destroy: Removes an Ingredient, Takes in an pantryId