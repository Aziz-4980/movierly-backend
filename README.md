# Node.js API Learning Project

This is a basic Node.js API project to help learn API development.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-apis
```

3. Make sure MongoDB is installed and running on your system

4. Start the development server:
```bash
npm run dev
```

## Available Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID

## API Documentation

### Create User
POST `/api/users`
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Project Structure

- `src/index.js` - Main application file
- `src/config/database.js` - Database configuration
- `src/models/User.js` - User model schema
- `src/routes/users.js` - User routes

## Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Mongoose - MongoDB object modeling
- dotenv - Environment variables
- cors - Cross-Origin Resource Sharing
- nodemon - Development server with hot reload 