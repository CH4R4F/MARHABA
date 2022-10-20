const { getErrorMessage, getHttpStatusCode } = require("../utils/errorHelpers");
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Global Express error handler middleware.
 *
 * @param {Error} error - An Error object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express `next()` function
 */
function errorHandler(error, req, res, next) {
  const errorMessage = getErrorMessage(error);

  // log error message
  console.log(errorMessage);

  if (res.headersSent) {
    return next(error);
  }

  // check if there is a error code (in case of jwt-expired or unAuthorized)
  const code = error.code || undefined;
  const errorResponse = {
    statusCode: getHttpStatusCode({ error, res }),
    error: undefined,
    message: error.message,
    code: code,
  };

  // hide error details in case of running the app in production
  // send the error message in case of development envirenment
  if (NODE_ENV !== "production") {
    errorResponse.error = errorMessage;
  }

  // set the response status code
  res.status(errorResponse.statusCode);

  res.json(errorResponse);

  // run any next middleware
  next();
}

module.exports = errorHandler;
