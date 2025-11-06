const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { userValidation, validate } = require('../middleware/validator');

// All routes require authentication
router.use(authMiddleware);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userValidation.register, validate, userController.createUser);
router.put('/:id', userValidation.update, validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
