const getAllCosts = require('./getAllCosts');

const costsRouter = require('express').Router();

costsRouter.get('/',  getAllCosts);

module.exports = costsRouter;
