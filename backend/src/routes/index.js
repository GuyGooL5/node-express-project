const authenticate = require('../middlewares/authenticate');

const auth = require('./auth');
const login = require('./login');

const costsRouter = require('./costs');

const apiRouter = require('express').Router();

apiRouter.post('/login', login);
apiRouter.get('/auth', authenticate, auth);
apiRouter.use('/costs', authenticate, costsRouter);

module.exports = apiRouter;
