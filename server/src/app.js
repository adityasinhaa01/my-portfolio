const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const routes = require('./routes');
const { standardApiLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Trust reverse proxies (Render, Vercel, Railway, etc.)
app.set('trust proxy', 1);

// Security HTTP headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allowed when API is consumed by external frontend
    crossOriginEmbedderPolicy: false
  })
);

// Restrictive CORS configuration
const allowedOrigins = config.clientUrl
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .concat(['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some((allowed) => {
        return origin === allowed || (allowed === '*' && config.nodeEnv !== 'production');
      });

      if (isAllowed || !config.isProduction) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // Cache preflight for 24 hours
  })
);

// Body parser with strictly capped payload size
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Apply standard API rate limiter to all /api routes
app.use('/api', standardApiLimiter);

// Mount main API routes
app.use('/api', routes);

// Serve static client assets in unified production deployment if enabled
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (process.env.SERVE_STATIC === 'true' && fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Root route for API verification in standalone mode
  app.get('/', (req, res) => {
    res.json({
      name: 'Aditya Sinha Portfolio API',
      status: 'running',
      healthCheck: '/api/health'
    });
  });
}

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
