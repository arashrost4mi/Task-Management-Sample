import {
  TITLE_DESCRIPTION_REQUIRED,
  TASK_NOT_FOUND,
} from '../constants/messages.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';

import TaskRepository from "../repository/taskRepository.js";
const taskRepository = new TaskRepository();

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      throw new ErrorHandler(400, TITLE_DESCRIPTION_REQUIRED);
    }

    const taskStatus = status || 'Pending';
    const taskData = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        status: taskStatus
    };
    const createdTask = await taskRepository.create(taskData);
    
    return res.status(201).json({ success: true, data: createdTask });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskRepository.getAll();
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Get a task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await taskRepository.getById(taskId);
    if (!task) {
      throw new ErrorHandler(404, TASK_NOT_FOUND);
    }
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Update a task by ID
export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    if (!title || !description) {
      throw new ErrorHandler(400, TITLE_DESCRIPTION_REQUIRED);
    }

    const taskStatus = status || 'Pending';
    const updatedData = { title, description, status: taskStatus };
    const updatedTask = await taskRepository.update(taskId, updatedData);

    if (!updatedTask) {
      throw new ErrorHandler(404, TASK_NOT_FOUND);
    }
    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete a task by ID
export const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await taskRepository.delete(taskId);
    if (!deletedTask) {
      throw new ErrorHandler(404, TASK_NOT_FOUND);
    }
    return res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    next(error);
  }
};
