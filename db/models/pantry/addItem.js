const connectionPool = require('../../utils/connect.js')
const {addItemStatement} = require('../statements/addPantryItem.js')
const {userExistsStatement} = require('../statements/addPantryItem.js')

const addItem = (req, res, next) => {

  let name = req.query.name;
  let date = req.query.date;
  let category = req.query.category;
  let email = req.query.email;

  const userExists = {
    text: userExistsStatement,
    values: [email]
  }

  const addItemText = {
    text: addItemStatement,
    values: [name, date, category, email]
  }

  if (name && date && category && email) {
    connectionPool.query(userExists)
    .then((data) => {
      if (data.rows[0].exists === false) {
        res.send('Please make sure you send a registered/valid user')
      } else {

        connectionPool.
        query(addItemText)
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
}

module.exports = addItem
// Create: Takes in a name, date, category and email
// Read: Takes in a email
// Update: Takes in a IngredientName, ExpiryDate, pantryId
// Destroy: Removes an Ingredient, Takes in an pantryId