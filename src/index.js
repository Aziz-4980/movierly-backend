const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

// Import routes
const publicUserRoutes = require('./routes/public/users');
const privateUserRoutes = require('./routes/private/users');
const authRoutes = require('./routes/auth');

// Import middlewares
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const requireAuth = require('./middleware/requireAuth');

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API!',
    authRoutes: [
      'POST /api/auth/signup - Register a new user',
      'POST /api/auth/login - Login user',
    ],
    publicRoutes: ['GET /api/users/profile/:id - Get public user profile'],
    privateRoutes: [
      'GET /api/users/me - Get own profile (requires auth)',
      'PUT /api/users/me - Update own profile (requires auth)',
      'DELETE /api/users/me - Delete own account (requires auth)',
    ],
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Public routes
app.use('/api/users', publicUserRoutes);

// Private routes (require authentication)
app.use('/api/users', requireAuth, privateUserRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
