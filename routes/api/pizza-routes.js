const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// Set up GET all and POST -- /api/pizzas --
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// Set up GET 1, PUT, and DELETE -- /api/pizzas/:id --
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

// exporting...   ...   ...
module.exports = router;