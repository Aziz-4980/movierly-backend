"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireAdmin = async (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        res.status(403).json({
            status: 'error',
            message: 'Access denied. Admin privileges required.',
        });
        return;
    }
    next();
};
exports.default = requireAdmin;
