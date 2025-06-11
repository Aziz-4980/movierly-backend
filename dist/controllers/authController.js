"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Generate JWT Token
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d',
    });
};
// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                status: 'error',
                message: 'User already exists',
            });
            return;
        }
        // Create new user
        const user = await User_1.default.create({
            name,
            email,
            password,
        });
        // Generate token
        const token = generateToken(user._id.toString());
        res.status(201).json({
            status: 'success',
            data: {
                user: user.toPublicProfile(),
                token,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
};
exports.signup = signup;
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid credentials',
            });
            return;
        }
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid credentials',
            });
            return;
        }
        // Generate token
        const token = generateToken(user._id.toString());
        res.json({
            status: 'success',
            data: {
                user: user.toPublicProfile(),
                token,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
};
exports.login = login;
