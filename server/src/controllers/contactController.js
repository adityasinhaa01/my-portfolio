const { processContactMessage } = require('../services/contactService');

async function handleContact(req, res, next) {
  try {
    const { name, email, message } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';

    const result = await processContactMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      ipAddress: String(ipAddress),
      userAgent: String(userAgent)
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleContact
};
