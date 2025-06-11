"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.movieValidationRules = void 0;
const express_validator_1 = require("express-validator");
const authValidation_1 = require("./authValidation");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return authValidation_1.validate; } });
exports.movieValidationRules = [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('thumbnailUrl')
        .trim()
        .notEmpty()
        .withMessage('Thumbnail URL is required'),
    (0, express_validator_1.body)('ratings').optional().isFloat({ min: 0, max: 5 }),
];
