"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidation_1 = require("../middleware/authValidation");
const router = (0, express_1.Router)();
// Auth routes with validation
router.post('/signup', authValidation_1.signupValidationRules, authValidation_1.validate, authController_1.signup);
router.post('/login', authValidation_1.loginValidationRules, authValidation_1.validate, authController_1.login);
exports.default = router;
