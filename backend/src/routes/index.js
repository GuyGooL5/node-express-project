const authenticate = require('../middlewares/authenticate');

const apiRouter = require('express').Router();

apiRouter.post('/login', require('./login'));
apiRouter.post('/register', require('./register'));
apiRouter.get('/auth', authenticate, require('./auth'));

apiRouter.use('/costs', authenticate, require('./costs'));

module.exports = apiRouter;
