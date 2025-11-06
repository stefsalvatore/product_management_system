const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');
const { categoryValidation, validate } = require('../middleware/validator');

// All routes require authentication
router.use(authMiddleware);

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryValidation.create, validate, categoryController.createCategory);
router.put('/:id', categoryValidation.update, validate, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
