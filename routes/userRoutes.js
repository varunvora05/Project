const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/:id', authMiddleware, getUser);        
router.put('/:id', authMiddleware, updateUser);     
router.delete('/:id', authMiddleware, deleteUser);  

module.exports = router;
