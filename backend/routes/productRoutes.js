const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const { uploadImage, uploadBulk } = require('../middleware/upload');
const { productValidation, validate } = require('../middleware/validator');

// All routes require authentication
router.use(authMiddleware);

// Product CRUD
router.get('/', productController.getAllProducts);
router.get('/export', productController.exportProducts);
router.get('/:id', productController.getProductById);
router.post('/', uploadImage.single('image'), productValidation.create, validate, productController.createProduct);
router.put('/:id', uploadImage.single('image'), productValidation.update, validate, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Bulk operations
router.post('/bulk/upload', uploadBulk.single('file'), productController.bulkUpload);

module.exports = router;
