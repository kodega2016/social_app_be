"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSave = void 0;
const express_validator_1 = require("express-validator");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
exports.validateSave = [
    (0, express_validator_1.check)("title")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title is required.")
        .bail(),
    (0, express_validator_1.check)("content")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Content is required.")
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
//# sourceMappingURL=post.validation.js.map