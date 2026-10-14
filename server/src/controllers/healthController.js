const config = require('../config');
const { getDatabaseStatus } = require('../config/db');

function getHealth(req, res) {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    services: {
      geminiConfigured: config.gemini.isConfigured,
      geminiModel: config.gemini.model,
      database: {
        configured: dbStatus.configured,
        connected: dbStatus.connected
      }
    }
  });
}

module.exports = {
  getHealth
};
