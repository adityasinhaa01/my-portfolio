/**
 * Input validation middleware for API requests
 */

function validateAssistantChat(req, res, next) {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'A non-empty "message" string is required.'
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Message length exceeds maximum limit of 1000 characters.'
    });
  }

  if (history !== undefined && !Array.isArray(history)) {
    return res.status(400).json({
      success: false,
      error: '"history" must be an array of prior messages.'
    });
  }

  if (Array.isArray(history) && history.length > 30) {
    return res.status(400).json({
      success: false,
      error: 'Conversation history exceeds maximum of 30 messages.'
    });
  }

  next();
}

function validateContact(req, res, next) {
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Valid "name" is required (minimum 1 character).'
    });
  }

  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      error: '"name" cannot exceed 100 characters.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'A valid email address is required.'
    });
  }

  if (email.length > 150) {
    return res.status(400).json({
      success: false,
      error: '"email" cannot exceed 150 characters.'
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'A non-empty "message" is required.'
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({
      success: false,
      error: '"message" cannot exceed 2000 characters.'
    });
  }

  next();
}

module.exports = {
  validateAssistantChat,
  validateContact
};
