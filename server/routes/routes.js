const express = require('express');
const router = express.Router();
// recipes
const getRecipes = require('../../db/models/recipes/getRecipes.js')
// ingredients
const getIngredients = require('../../db/models/ingredients/getIngredients.js')
// pantry
const getItem = require('../../db/models/pantry/getItem.js')
const addItem = require('../../db/models/pantry/addItem.js')
const updateItem = require('../../db/models/pantry/updateItem.js')
const deleteItem = require('../../db/models/pantry/deleteItem.js')
const addUser = require('../../db/models/user/addUser.js');
// favorite
const favoriteRecipe = require('../../db/models/favorite/favoriteRecipe.js')
const deleteFavorite = require('../../db/models/favorite/deleteFavorite.js')
const getFavoriteRecipe = require('../../db/models/favorite/getFavoriteRecipe.js')

//Recipes
router.get('/recipes', getRecipes);

//Ingredients
router.get('/ingredients', getIngredients);

//Pantry
router.get('/pantry', getItem);
router.post('/pantry', addItem);
router.put('/pantry', updateItem);
router.delete('/pantry', deleteItem);

//Users
router.post('/users', addUser);

//Grocery
router.post('/grocery'); // getting body of grocery name as key and boolean as value other key email, recipe_id
router.get('/grocery'); // user_id group by recipe_id
router.put('/grocery'); // id of the grocery change toggle
router.delete('/grocery'); // recipe id user id delete alll related to those two

//favoirte
router.get('/favorite', getFavoriteRecipe)
router.delete('/favorite', deleteFavorite)
router.post('/favorite', favoriteRecipe);

module.exports = router;
// Create: Takes in a name, date, category and email
// Read: Takes in a email
// Update: Takes in a IngredientName, ExpiryDate, pantryId
// Destroy: Removes an Ingredient, Takes in an pantryId