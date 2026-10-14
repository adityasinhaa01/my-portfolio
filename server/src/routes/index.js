const express = require('express');
const healthRoutes = require('./healthRoutes');
const assistantRoutes = require('./assistantRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/assistant', assistantRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
