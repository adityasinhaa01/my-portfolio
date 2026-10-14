const { generateAssistantReply } = require('../services/aiService');

async function handleChat(req, res, next) {
  try {
    const { message, history } = req.body;
    const result = await generateAssistantReply(message, history);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleChat
};
