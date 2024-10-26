const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; 


const getAllRecipes = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("Recipes").find();
    // console.log(mongodb.getDb().db().Recipes); 
    result.toArray().then((recipes) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(recipes);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recipes.", error: error.message });
  }
};


const getRecipeById = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  try {
    const recipe = await mongodb.getDb().db().collection("Recipes").findOne({ _id: recipeId });
    if (recipe) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the recipe.", error: error.message });
  }
};


const addNewRecipe = async (req, res) => {
  const recipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    preparationTime: req.body.preparationTime,
    difficulty: req.body.difficulty,
    category: req.body.category,
    image: req.body.image,
    author: req.body.author,
    substitutes: req.body.substitutes,
    comments: req.body.comments,
    utensils: req.body.utensils,
    faq: req.body.faq,
    approximatePrices: req.body.approximatePrices,
    servings: req.body.servings,
    tags: req.body.tags,
    createdAt: new Date()
  };

  try {
    const response = await mongodb.getDb().db().collection("Recipes").insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json({ message: "Recipe added successfully", recipeId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to add the recipe." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding the recipe.", error: error.message });
  }
};


const updateRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const recipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    preparationTime: req.body.preparationTime,
    difficulty: req.body.difficulty,
    category: req.body.category,
    image: req.body.image,
    author: req.body.author,
    substitutes: req.body.substitutes,
    comments: req.body.comments,
    utensils: req.body.utensils,
    faq: req.body.faq,
    approximatePrices: req.body.approximatePrices,
    servings: req.body.servings,
    tags: req.body.tags,
    updatedAt: new Date()
  };

  try {
    const response = await mongodb.getDb().db().collection("Recipes").replaceOne({ _id: recipeId }, recipe);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Failed to update the recipe." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the recipe.", error: error.message });
  }
};


const deleteRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection("Recipes").deleteOne({ _id: recipeId });
    if (response.acknowledged && response.deletedCount > 0) {
      res.status(200).json({ message: "Recipe deleted successfully." });
    } else {
      res.status(404).json({ message: "Recipe not found or already deleted." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the recipe.", error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  updateRecipe,
  deleteRecipe
};
