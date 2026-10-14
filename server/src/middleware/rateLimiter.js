const rateLimit = require('express-rate-limit');

/**
 * Standard rate limiter for all general API routes
 */
const standardApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // limit each IP to 120 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

/**
 * Strict rate limiter for AI assistant chat route to prevent abuse
 */
const assistantRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 chat requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Assistant request rate limit reached. Please wait a few minutes before submitting another question.'
  }
});

/**
 * Rate limiter for contact submissions to prevent spamming
 */
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 contact requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Contact form submission limit reached. Please email adityasinhaa001@gmail.com directly.'
  }
});

module.exports = {
  standardApiLimiter,
  assistantRateLimiter,
  contactRateLimiter
};
