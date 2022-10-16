/**
 * @param {Object} options
 * @param {Error} options.error
 * @param {Object} oprions.res
 * @return {number} - HTTP status code
 */
function getHttpStatusCode({ error, res }) {
  const errorStatusCode = error.status || error.errorStatusCode;
  if (isErrorStatusCode(errorStatusCode)) {
    return errorStatusCode;
  }

  const responseStatusCode = res.statusCode;
  if (isErrorStatusCode(responseStatusCode)) {
    return responseStatusCode;
  }

  // fallback to generic error HTTP status code 500 (Internal Server Error)
  return 500;
}

/**
 * Determines if an HTTP status code falls in the 4xx or 5xx error ranges.
 *
 * @param {number} statusCode - HTTP status code
 * @return {boolean}
 */
function isErrorStatusCode(statusCode) {
  return statusCode >= 400 && statusCode < 600;
}

/**
 * Extract the message from error object
 *
 * @param {Error} error - An Error object
 * @return {string} - String representaion of the error message
 */
function getErrorMessage(error) {
  if (error.stack) {
    return error.stack;
  }

  if (typeof error.toString === "function") {
    return error.toString();
  }

  return "";
}

module.exports = {
  getHttpStatusCode,
  getErrorMessage,
};
