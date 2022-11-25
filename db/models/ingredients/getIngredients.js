const connectionPool = require('../../utils/connect.js');
const {getIngredientsStatement} = require('../statements/getIngredients.js');

const getIngredients = (req, res) => {

  const getIngredientsOptions = {
    text: getIngredientsStatement,
  }

  connectionPool.query(getIngredientsOptions)
  .then(data=>{
    console.log('fetched ingredients by their frequncey', data.rows);
    res.status(200).send(data.rows);
  })
  .catch(err=>{
    console.log('err fetching common ingredients', err);
    res.status(500).send('err fetching common ingredients');
  })
}

module.exports = getIngredients;