"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
// Get user's own profile
router.get('/me', async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select('-password');
        res.json({
            status: 'success',
            data: {
                user,
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
// Update user's own profile
router.put('/me', async (req, res) => {
    var _a;
    try {
        const updates = {};
        if (req.body.name)
            updates.name = req.body.name;
        if (req.body.email)
            updates.email = req.body.email;
        const user = await User_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { $set: updates }, { new: true, runValidators: true });
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
        res.status(400).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
});
// Delete user's own account
router.delete('/me', async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findByIdAndDelete((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
            return;
        }
        res.json({
            status: 'success',
            message: 'Account deleted successfully',
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
