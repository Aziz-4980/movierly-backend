import { Response } from 'express';
import { AuthRequest } from '../types';
import Movie from '../models/Movies';

// @desc    Create a new movie
// @route   POST /api/movies
// @access  Private
export const createMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description, thumbnailUrl, ratings } = req.body;

    const movie = await Movie.create({
      title,
      description,
      thumbnailUrl,
      ratings,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find()
      .populate('createdBy', 'name email -_id')
      .select('-__v');

    res.json({
      status: 'success',
      data: {
        movies,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id)
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
export const updateMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id).select('-__v');

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Movie not found',
      });
      return;
    }

    // Check if user is the creator of the movie
    if (movie.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this movie',
      });
      return;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email -_id')
      .select('-__v');

    res.json({
      status: 'success',
      data: {
        movie: updatedMovie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
export const deleteMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id).select('-__v');

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Movie not found',
      });
      return;
    }

    // Check if user is the creator of the movie
    if (movie.createdBy.toString() !== req.user?._id.toString()) {
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};
