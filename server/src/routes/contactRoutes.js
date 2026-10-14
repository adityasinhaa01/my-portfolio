const express = require('express');
const { handleContact } = require('../controllers/contactController');
const { contactRateLimiter } = require('../middleware/rateLimiter');
const { validateContact } = require('../middleware/validator');

const router = express.Router();

router.post('/', contactRateLimiter, validateContact, handleContact);

module.exports = router;
