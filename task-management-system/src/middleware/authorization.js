import { ErrorHandler } from "./errorHandler.js";
import { USER_NOT_AUTHORIZED } from "../constants/messages.js";
import UserRepository from '../repository/userRepository.js';
const userRepository = new UserRepository();

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        
        if (!user) {
            throw new ErrorHandler(401, USER_NOT_AUTHORIZED);
        } else if (allowedRoles.includes('user') && user.role === 'user') {
            throw new ErrorHandler(403, USER_NOT_AUTHORIZED);
        } else if (allowedRoles.includes('admin') && user.role === 'admin'){
            next();
        }

    };
};

export default authorize;
