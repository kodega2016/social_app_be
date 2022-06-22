import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import ErrorResponse from "../utils/ErrorResponse";

export const validateLogin = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .bail(),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required.")
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
export const validateRegister = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail(),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .bail(),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required.")
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
