import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import authenticateUser from '../middleware/authMiddleware.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router.post('/task', authenticateUser, createTask);
router.get('/tasks',authenticateUser, getAllTasks);
router.get('/task/:id',authenticateUser, getTaskById);
router.put('/task/:id',authenticateUser, authorize(['admin']), updateTask);
router.delete('/task/:id',authenticateUser, authorize(['admin']), deleteTask);

export default router;
