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

const router = express.Router();

router.post('/user', createUser);
router.post('/user/login', loginUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.get('/user/username/:username', getUserByUsername);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
