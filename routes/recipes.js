const express = require('express');
const router = express.Router();

const recipesListController = require('../controllers/recipesController');


router.get('/', recipesListController.getAllRecipes);

router.get('/:id', recipesListController.getRecipeById);

router.post('/', recipesListController.addNewRecipe);

router.put('/:id', recipesListController.updateRecipe);

router.delete('/:id', recipesListController.deleteRecipe);

module.exports = router;
