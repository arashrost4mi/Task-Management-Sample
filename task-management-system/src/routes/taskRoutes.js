import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/task', authenticateUser, createTask);
router.get('/tasks',authenticateUser, getAllTasks);
router.get('/task/:id',authenticateUser, getTaskById);
router.put('/task/:id',authenticateUser, updateTask);
router.delete('/task/:id',authenticateUser, deleteTask);

export default router;
