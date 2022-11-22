const express = require('express')
const router = express.Router()
const getRecipes = require('../../db/models/getRecipes.js')

router.get('/recipes', getRecipes.getRecipes)

module.exports = router;