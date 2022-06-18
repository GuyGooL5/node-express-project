const { MODE } = require('../config/env');

const withStopReturnErrorHandler = (fn) => async (req, res, next) =>
  fn(req, res, next).catch((err) => {
    res.status(500).json({ error: err.message });
  });

const withStopErrorHandler = (fn) => async (req, res) =>
  fn(req, res).catch(() =>
    res.status(500).json({ error: 'Internal server error' }),
  );

module.exports = {
  withStopReturnErrorHandler:
    MODE !== 'production' ? withStopReturnErrorHandler : withStopErrorHandler,
  withStopErrorHandler,
};
