import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  res.status(error.statusCode).json({
    message: error.message,
    success: false,
    data: null,
  });
};

export { errorHandler };
