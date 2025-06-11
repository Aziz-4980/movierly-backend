import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import {
  signupValidationRules,
  loginValidationRules,
  validate,
} from '../middleware/authValidation';

const router = Router();

// Auth routes with validation
router.post('/signup', signupValidationRules, validate, signup);
router.post('/login', loginValidationRules, validate, login);

export default router;
