import {
  USERNAME_PASSWORD_REQUIRED,
  USER_NOT_FOUND,
  USERNAME_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST,
  INVALID_CREDENTIALS
} from '../constants/messages.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import UserRepository from "../repository/userRepository.js";
import User from '../models/userModel.js';
const userRepository = new UserRepository();


//User Login and Generate JWT
export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ErrorHandler(400, USERNAME_PASSWORD_REQUIRED);
        }

        const user = await userRepository.getByUsername(username);
        if (!user) {
            throw new ErrorHandler(404, USER_DOES_NOT_EXIST);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandler(401, INVALID_CREDENTIALS);
        }

        const token = user.generateAuthToken();
        return res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
}

// Create a user
export const createUser = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            throw new ErrorHandler(400, USERNAME_PASSWORD_REQUIRED);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await userRepository.getByUsername(username);
        if (existingUser) {
            throw new ErrorHandler(403, USERNAME_ALREADY_EXISTS);
        }

        const userRole = role || 'user';
        const userData = {
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashedPassword,
            role: userRole
        };
        const createdUser = await userRepository.create(userData);

        return res.status(201).json({ success: true, data: createdUser });
    } catch (error) {
        next(error);
    }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userRepository.getAll();
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// Get a user by ID
export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ErrorHandler(404, USER_NOT_FOUND);
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

//Get a user by username
export const getUserByUsername = async (req, res, next) => {
    try {
      const userUsername = req.params.username; // Use req.params.username instead of req.query.username
      const user = await userRepository.getByUsername(userUsername);
      if (!user) {
        throw new ErrorHandler(404, USER_NOT_FOUND);
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
  
  

// Update a user by ID
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { username, password, role } = req.body;
        if (!username || !password) {
            throw new ErrorHandler(400, USERNAME_PASSWORD_REQUIRED);
        }
        const userRole = role || 'user';
        const updatedData = {
            username,
            password,
            role: userRole
        };
        const updatedUser = await userRepository.update(userId, updatedData);

        if (!updatedUser) {
            throw new ErrorHandler(404, USER_NOT_FOUND);
        }
        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userRepository.delete(userId);
        if (!deletedUser) {
            throw new ErrorHandler(404, USER_NOT_FOUND);
        }
        return res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        next(error);
    }
};
