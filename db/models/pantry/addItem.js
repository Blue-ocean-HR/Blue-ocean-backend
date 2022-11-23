const connectionPool = require('../../utils/connect.js')
const {addItemStatement} = require('../statements/addPantryItem.js')
const {userExistsStatement} = require('../statements/addPantryItem.js')

const addItem = (req, res, next) => {
<<<<<<< HEAD
  //ask max to make sure these are the changes he wanted
=======

>>>>>>> 6ff57483e664a912100e22fc97b7ec4dedcfd505
  let name = req.body.name;
  let date = req.body.date;
  let category = req.body.category;
  let email = req.body.email;

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
