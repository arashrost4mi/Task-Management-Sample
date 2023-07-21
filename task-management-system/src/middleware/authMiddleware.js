import jwt from 'jsonwebtoken';
import { ErrorHandler } from './errorHandler.js';
import { INVALID_TOKEN, USER_NOT_AUTHORIZED, TOKEN_EXPIRED } from '../constants/messages.js';
import UserRepository from '../repository/userRepository.js';
const userRepository = new UserRepository();

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new ErrorHandler(401, USER_NOT_AUTHORIZED);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = userRepository.getById(decoded.userId);
        if (!user) {
            throw new ErrorHandler(401, USER_NOT_AUTHORIZED);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ErrorHandler(401, TOKEN_EXPIRED);
        } else {
            throw new ErrorHandler(401, INVALID_TOKEN);
        }
    }
};

export default authenticateUser;