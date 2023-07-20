import jwt from 'jsonwebtoken';
import { ErrorHandler } from './errorHandler.js';
import { NO_TOKEN_PROVIDED, INVALID_TOKEN } from '../constants/messages.js';

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new ErrorHandler(401, NO_TOKEN_PROVIDED);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ErrorHandler(401, INVALID_TOKEN);
    }
};

export default authenticateUser;