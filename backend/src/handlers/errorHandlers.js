const { MODE } = require('../config/env');

const withStopErrorHandler = (withDetail) => (fn) => async (req, res, next) => {
  try {
    return fn(req, res, next);
  } catch (err) {
    res
      .status(500)
      .json({ error: withDetail ? err.message : 'Internal server error' });
  }
};
module.exports = {
  withStopReturnErrorHandler: withStopErrorHandler(MODE !== 'production'),
  withStopErrorHandler: withStopErrorHandler(false),
};
