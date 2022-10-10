const { isCelebrateError } = require("celebrate");

/**
 * Celebrate Error Handler
 * @param {Object} err Error object
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next object
 * @returns {Object} Response object
 */
exports.celebrateErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get("body") || err.details.get("params");
    const message = errorBody.message;
    return res.status(400).json({ status: 400, message: message });
  }
  return next(err);
};

/**
 * Catch Error Handler
 * @param {Function} fn accept function as an argument
 * @returns {JSONObject} Response JSON object
 */
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      if (typeof err === "string") {
        res.json({
          status: 400,
          message: err,
        });
      } else {
        next(err);
      }
    });
  };
};

/**
 * 404 Page Error handler
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Next} next Next Object
 * @returns {JSONObject} Returns JSON Object
 */
exports.notFound = (req, res, next) => {
  res.json({
    status: 404,
    message: "Route not found",
  });
};
