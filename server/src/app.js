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

// Flexible, resilient CORS configuration
const allowedOrigins = config.clientUrl
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultAllowed = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // In non-production or if explicitly set to '*', allow all origins
      if (!config.isProduction || allowedOrigins.includes('*')) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, '');
      const hostname = (() => {
        try {
          return new URL(origin).hostname;
        } catch {
          return '';
        }
      })();

      const isAllowed =
        allowedOrigins.includes(normalizedOrigin) ||
        defaultAllowed.includes(normalizedOrigin) ||
        allowedOrigins.some((allowed) => {
          const stripped = allowed.replace(/^https?:\/\//, '');
          return hostname === stripped || hostname.endsWith(`.${stripped}`);
        }) ||
        hostname.endsWith('.onrender.com') ||
        hostname.endsWith('.vercel.app') ||
        hostname.endsWith('.netlify.app') ||
        hostname === 'localhost' ||
        hostname === '127.0.0.1';

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`[CORS] Rejected origin: ${origin}. Permitted origins:`, allowedOrigins);
        callback(null, false);
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
app.use('/api', routes);

// Also mount routes at root level (/assistant, /contact, /health) so that calls
// succeed even if VITE_API_BASE_URL was configured without the /api suffix
app.use('/', standardApiLimiter, routes);

// Serve static client assets in unified production deployment if enabled
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (process.env.SERVE_STATIC === 'true' && fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/assistant') ||
      req.path.startsWith('/contact') ||
      req.path.startsWith('/health')
    ) {
      return next();
    }
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
