"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
// Import routes
const users_1 = __importDefault(require("./routes/public/users"));
const users_2 = __importDefault(require("./routes/private/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const movies_1 = __importDefault(require("./routes/movies"));
// Import middlewares
const logger_1 = __importDefault(require("./middleware/logger"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const requireAuth_1 = __importDefault(require("./middleware/requireAuth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Connect to database
(0, database_1.default)();
// Global Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
// Basic route
app.get('/', (_req, res) => {
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
app.use('/api/auth', auth_1.default);
// Public routes
app.use('/api/users', users_1.default);
// Movie routes
app.use('/api/movies', movies_1.default);
// Private routes (require authentication)
app.use('/api/users', requireAuth_1.default, users_2.default);
// Error handling middleware
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
