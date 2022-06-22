"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
exports.validateLogin = [
    (0, express_validator_1.check)("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .bail(),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required.")
        .bail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const message = errors
                .array()
                .map((e) => e["msg"])
                .join(",");
            return next(new ErrorResponse_1.default(message, 403));
        }
        next();
    },
];
exports.validateRegister = [
    (0, express_validator_1.check)("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Name can not be empty!")
        .bail(),
    (0, express_validator_1.check)("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .bail(),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required.")
        .bail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const message = errors
                .array()
                .map((e) => e["msg"])
                .join(",");
            return next(new ErrorResponse_1.default(message, 403));
        }
        next();
    },
];
//# sourceMappingURL=auth.validation.js.map