"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
// Get public user profile
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
            return;
        }
        res.json({
            status: 'success',
            data: {
                user: user.toPublicProfile(),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
});
router.get('/get-all-users', async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json({
            status: 'success',
            data: {
                users: users.map(user => user.toPublicProfile()),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
});
exports.default = router;
