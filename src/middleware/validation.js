import { check } from 'express-validator';

export const validateRegister = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('dateOfBirth').isDate().withMessage('Invalid date of birth format'),
  check('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
];


export const validateLogin = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').notEmpty().withMessage('Password is required'),
];
