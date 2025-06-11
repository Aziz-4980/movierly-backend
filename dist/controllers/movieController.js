"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getMovies = exports.createMovie = void 0;
const Movies_1 = __importDefault(require("../models/Movies"));
// @desc    Create a new movie
// @route   POST /api/movies
// @access  Private
const createMovie = async (req, res) => {
    var _a;
    try {
        const { title, description, thumbnailUrl, ratings } = req.body;
        const movie = await Movies_1.default.create({
            title,
            description,
            thumbnailUrl,
            ratings,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        res.status(201).json({
            status: 'success',
            data: {
                movie,
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
exports.createMovie = createMovie;
// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (_req, res) => {
    try {
        const movies = await Movies_1.default.find()
            .populate('createdBy', 'name email -_id')
            .select('-__v');
        res.json({
            status: 'success',
            data: {
                movies,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
};
exports.getMovies = getMovies;
// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
    try {
        const movie = await Movies_1.default.findById(req.params.id)
            .populate('createdBy', 'name email -_id')
            .select('-__v');
        if (!movie) {
            res.status(404).json({
                status: 'error',
                message: 'Movie not found',
            });
            return;
        }
        res.json({
            status: 'success',
            data: {
                movie,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
};
exports.getMovieById = getMovieById;
// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
const updateMovie = async (req, res) => {
    var _a;
    try {
        const movie = await Movies_1.default.findById(req.params.id).select('-__v');
        if (!movie) {
            res.status(404).json({
                status: 'error',
                message: 'Movie not found',
            });
            return;
        }
        // Check if user is the creator of the movie
        if (movie.createdBy.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
            res.status(403).json({
                status: 'error',
                message: 'Not authorized to update this movie',
            });
            return;
        }
        const updatedMovie = await Movies_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })
            .populate('createdBy', 'name email -_id')
            .select('-__v');
        res.json({
            status: 'success',
            data: {
                movie: updatedMovie,
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
exports.updateMovie = updateMovie;
// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovie = async (req, res) => {
    var _a;
    try {
        const movie = await Movies_1.default.findById(req.params.id).select('-__v');
        if (!movie) {
            res.status(404).json({
                status: 'error',
                message: 'Movie not found',
            });
            return;
        }
        // Check if user is the creator of the movie
        if (movie.createdBy.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
            res.status(403).json({
                status: 'error',
                message: 'Not authorized to delete this movie',
            });
            return;
        }
        await movie.deleteOne();
        res.json({
            status: 'success',
            message: 'Movie deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An error occurred',
        });
    }
};
exports.deleteMovie = deleteMovie;
