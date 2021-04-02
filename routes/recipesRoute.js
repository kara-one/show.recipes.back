const { Router } = require('express');
const router = new Router();
const recipeController = require('../controllers/recipeController');

router
    .get('/recipes', recipeController.getAll)
    .get('/recipes/:id', recipeController.getOne)
    .post('/recipes', recipeController.create)
    .put('/recipes/:id', recipeController.edit)
    .delete('/recipes/:id', recipeController.delete);

module.exports = router;
