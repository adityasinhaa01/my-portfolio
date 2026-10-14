const app = require('./app');
const config = require('./config');
const { connectDatabase } = require('./config/db');

async function startServer() {
  // Connect to database if configured (optional)
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`  Aditya Sinha Portfolio API Server`);
    console.log(`  Environment : ${config.nodeEnv}`);
    console.log(`  Port        : ${config.port}`);
    console.log(`  Health Check: http://localhost:${config.port}/api/health`);
    console.log(`  Assistant   : http://localhost:${config.port}/api/assistant/chat`);
    console.log(`  Gemini AI   : ${config.gemini.isConfigured ? 'Configured (' + config.gemini.model + ')' : 'Stateless Grounded Fallback'}`);
    console.log(`====================================================`);
  });

  const handleShutdown = (signal) => {
    console.log(`[Server] Received ${signal}. Gracefully terminating server...`);
    server.close(() => {
      console.log('[Server] HTTP server closed cleanly.');
      process.exit(0);
    });

    // Force shutdown after 10 seconds if still hanging
    setTimeout(() => {
      console.error('[Server] Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer();
