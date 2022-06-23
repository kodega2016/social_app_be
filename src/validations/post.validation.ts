import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import ErrorResponse from "../utils/ErrorResponse";

export const validateSave = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title is required.")
    .bail(),
  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Content is required.")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((e) => e["msg"])
        .join(",");
      return next(new ErrorResponse(message, 403));
    }
    next();
  },
];
