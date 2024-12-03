import express from 'express';
import {
  registerUser,
  loginUser,
  getUser,
  getProfile,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/profile', authMiddleware, getProfile);


export default router; // Use ES modules export
