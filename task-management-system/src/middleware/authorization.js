import { ErrorHandler } from "./errorHandler.js";
import { USER_NOT_AUTHORIZED } from "../constants/messages.js";
import UserRepository from '../repository/userRepository.js';
import jwt from 'jsonwebtoken';
const userRepository = new UserRepository();

const authorize = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ErrorHandler(401, USER_NOT_AUTHORIZED);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userId = decoded.userId;
            const user = await userRepository.getById(userId);

            if (!user) {
                throw new ErrorHandler(401, USER_NOT_AUTHORIZED);
            } else if (!allowedRoles.includes(user.role)) {
                throw new ErrorHandler(403, USER_NOT_AUTHORIZED);
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default authorize;
