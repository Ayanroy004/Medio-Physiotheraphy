const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const { notFound, errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Basic rate limiting on the public booking endpoint to deter spam
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: 'Too many booking attempts. Please try again later.' },
});
app.use('/api/appointments', bookingLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Vitality Physiotherapy API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/testimonials', testimonialRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
