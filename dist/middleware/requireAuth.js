"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const requireAuth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                status: 'error',
                message: 'Access denied. No token provided.',
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Get user from database
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({
                status: 'error',
                message: 'User not found.',
            });
            return;
        }
        // Add user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token. Access denied.',
        });
    }
};
exports.default = requireAuth;
