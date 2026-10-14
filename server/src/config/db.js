const mongoose = require('mongoose');
const config = require('./index');

let isConnected = false;

async function connectDatabase() {
  if (!config.mongodb.isConfigured) {
    console.log('[Database] MongoDB URI is not configured. Running in stateless mode (safe default).');
    return false;
  }

  try {
    const conn = await mongoose.connect(config.mongodb.uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] Warning: Could not connect to MongoDB: ${error.message}. Continuing without persistent database.`);
    return false;
  }
}

function getDatabaseStatus() {
  return {
    configured: config.mongodb.isConfigured,
    connected: isConnected,
    state: mongoose.connection.readyState
  };
}

module.exports = {
  connectDatabase,
  getDatabaseStatus
};
