const costsRouter = require('express').Router();

costsRouter.get('/', require('./getAllCosts'));
costsRouter.post('/', require('./addCost'));
costsRouter.delete('/:costId', require('./deleteCost'));

module.exports = costsRouter;
