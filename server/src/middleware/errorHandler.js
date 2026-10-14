const config = require('../config');

/**
 * 404 Not Found Handler
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

/**
 * Centralized Global Error Handler
 * Sanitizes errors and hides sensitive internal stack traces in production
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected internal server error occurred.';

  console.error(`[Error] ${req.method} ${req.originalUrl} - ${statusCode} - ${err.stack || message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.isProduction ? {} : { stack: err.stack })
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
