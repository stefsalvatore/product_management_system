const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const userValidation = {
  register: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  update: [
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ]
};

// Category validation rules
const categoryValidation = {
  create: [
    body('name').trim().notEmpty().withMessage('Category name is required')
  ],
  update: [
    body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty')
  ]
};

// Product validation rules
const productValidation = {
  create: [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category_id').isInt({ min: 1 }).withMessage('Valid category ID is required')
  ],
  update: [
    body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category_id').optional().isInt({ min: 1 }).withMessage('Valid category ID is required')
  ]
};

module.exports = {
  validate,
  userValidation,
  categoryValidation,
  productValidation
};
