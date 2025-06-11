"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
const movieValidation_1 = require("../middleware/movieValidation");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const requireAdmin_1 = __importDefault(require("../middleware/requireAdmin"));
const router = (0, express_1.Router)();
// Public routes
router.get('/', movieController_1.getMovies);
router.get('/:id', movieController_1.getMovieById);
// Admin routes (require authentication and admin role)
router.use(requireAuth_1.default, requireAdmin_1.default);
router.post('/', movieValidation_1.movieValidationRules, movieValidation_1.validate, movieController_1.createMovie);
router.put('/:id', movieValidation_1.movieValidationRules, movieValidation_1.validate, movieController_1.updateMovie);
router.delete('/:id', movieController_1.deleteMovie);
exports.default = router;
