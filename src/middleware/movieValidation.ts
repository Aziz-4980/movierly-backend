import { body, ValidationChain } from 'express-validator';
import { validate } from './authValidation';

export const movieValidationRules: ValidationChain[] = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('thumbnailUrl')
    .trim()
    .notEmpty()
    .withMessage('Thumbnail URL is required'),
  body('ratings').optional().isFloat({ min: 0, max: 5 }),
];

export { validate };
