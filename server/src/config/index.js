const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
    isConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0)
  },
  mongodb: {
    uri: process.env.MONGODB_URI || '',
    isConfigured: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0)
  },
  contact: {
    receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || 'adityasinhaa001@gmail.com'
  }
};

module.exports = config;
