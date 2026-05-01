require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Route imports
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const contactRoutes = require('./routes/contact');

const app = express();

// ── CORS ──
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://127.0.0.1:5500',  // Live Server
    'http://localhost:5500'
  ],
  credentials: true
}));

// ── Body Parser ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many submissions, please try again later.' }
});

app.use('/api/', limiter);
app.use('/api/applications/apply', strictLimiter);
app.use('/api/contact', strictLimiter);

// ── MongoDB Connection ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ── Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

// ── Health Check ──
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    service: 'SkyDevOps Solution API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      login: 'POST /api/auth/login',
      apply: 'POST /api/applications/apply',
      contact: 'POST /api/contact',
      applications: 'GET /api/applications (Admin)',
      stats: 'GET /api/applications/stats/summary (Admin)'
    }
  });
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SkyDevOps Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
});
