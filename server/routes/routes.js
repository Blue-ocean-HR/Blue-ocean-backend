const express = require('express')
const router = express.Router()
// recipes
const getRecipes = require('../../db/models/recipes/getRecipes.js')
// pantry
const getItem = require('../../db/models/pantry/getItem.js')
const addItem = require('../../db/models/pantry/addItem.js')
const updateItem = require('../../db/models/pantry/updateItem.js')
const deleteItem = require('../../db/models/pantry/deleteItem.js')
//Recipes
router.get('/recipes', getRecipes)

//Pantry
router.get('/pantry', getItem)
router.post('/pantry', addItem)
router.put('/pantry', updateItem)
router.delete('/pantry', deleteItem)
module.exports = router;

// Create: Takes in a name, date, category and email
// Read: Takes in a email
// Update: Takes in a IngredientName, ExpiryDate, pantryId
// Destroy: Removes an Ingredient, Takes in an pantryId