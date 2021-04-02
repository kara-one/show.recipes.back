const { Router } = require('express');
const router = new Router();
const recipesRoute = require('./recipesRoute');

router.get('/', (req, res) =>
    res.send('Hello Stranger! It is a RESTful API for recipes.back.'),
);
router.use('/api', recipesRoute);

module.exports = router;
