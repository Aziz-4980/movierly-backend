import { Router } from 'express';
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController';
import { movieValidationRules, validate } from '../middleware/movieValidation';
import requireAuth from '../middleware/requireAuth';
import requireAdmin from '../middleware/requireAdmin';

const router = Router();

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Admin routes (require authentication and admin role)
router.use(requireAuth, requireAdmin);
router.post('/', movieValidationRules, validate, createMovie);
router.put('/:id', movieValidationRules, validate, updateMovie);
router.delete('/:id', deleteMovie);

export default router;
