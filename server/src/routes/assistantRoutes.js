const express = require('express');
const { handleChat } = require('../controllers/assistantController');
const { assistantRateLimiter } = require('../middleware/rateLimiter');
const { validateAssistantChat } = require('../middleware/validator');

const router = express.Router();

router.post('/chat', assistantRateLimiter, validateAssistantChat, handleChat);

module.exports = router;
