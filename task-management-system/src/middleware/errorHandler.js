import { INTERNAL_SERVER_ERROR } from '../constants/messages.js';

class ErrorHandler extends Error {
  constructor(statusCode, messageKey) {
    super();
    this.statusCode = statusCode;
    this.messageKey = messageKey;
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, messageKey } = err;
  const message = messageKey || INTERNAL_SERVER_ERROR;
  const errorStatus = statusCode || 500;

  res.status(200).json({
    success: false,
    errorCode: errorStatus,
    error: message,
  });
};

export { ErrorHandler, errorHandlerMiddleware };
