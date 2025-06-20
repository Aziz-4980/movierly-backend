import { Request, Response, NextFunction } from 'express';
import {
  body,
  validationResult,
  ValidationChain,
  ValidationError as ExpressValidationError,
} from 'express-validator';

// Validation rules for signup
export const signupValidationRules: ValidationChain[] = [
  // Name validation
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  // Password validation
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
];

// Validation rules for login
export const loginValidationRules: ValidationChain[] = [
  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  // Password validation
  body('password').trim().notEmpty().withMessage('Password is required'),
];

interface ValidationError {
  field: string;
  message: string;
}

// Middleware to validate the request
export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      errors: errors.array().map((err: ExpressValidationError) => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      })) as ValidationError[],
    });
    return;
  }
  next();
};
