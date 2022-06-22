"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const error = Object.assign({}, err);
    error.message = err.message;
    error.statusCode = err.statusCode || 500;
    res.status(error.statusCode).json({
        message: error.message,
        success: false,
        data: null,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map