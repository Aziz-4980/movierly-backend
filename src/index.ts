import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Import routes
import publicUserRoutes from './routes/public/users';
import privateUserRoutes from './routes/private/users';
import authRoutes from './routes/auth';
import movieRoutes from './routes/movies';

// Import middlewares
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import requireAuth from './middleware/requireAuth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Basic route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the API!',
    authRoutes: [
      'POST /api/auth/signup - Register a new user',
      'POST /api/auth/login - Login user',
    ],
    publicRoutes: [
      'GET /api/users/profile/:id - Get public user profile',
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
    ],
    privateRoutes: [
      'GET /api/users/me - Get own profile (requires auth)',
      'PUT /api/users/me - Update own profile (requires auth)',
      'DELETE /api/users/me - Delete own account (requires auth)',
      'POST /api/movies - Create a new movie (requires auth)',
      'PUT /api/movies/:id - Update a movie (requires auth)',
      'DELETE /api/movies/:id - Delete a movie (requires auth)',
    ],
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Public routes
app.use('/api/users', publicUserRoutes);

// Movie routes
app.use('/api/movies', movieRoutes);

// Private routes (require authentication)
app.use('/api/users', requireAuth, privateUserRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
