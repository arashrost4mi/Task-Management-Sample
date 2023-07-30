import express from 'express';
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router.post('/user', createUser);
router.post('/user/login', loginUser);
router.get('/users', authenticateUser, getAllUsers);
router.get('/user/:id', authenticateUser, getUserById);
router.get('/user/username/:username', authenticateUser, getUserByUsername);
router.put('/user/:id', authenticateUser, authorize(['admin']), updateUser);
router.delete('/user/:id', authenticateUser, authorize(['admin']), deleteUser);

export default router;
