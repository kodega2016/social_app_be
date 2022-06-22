import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import { User } from "./../models/user.model";

const protect: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    req.body.user = user;
    next();
  } catch (e) {
    return next(new ErrorResponse("Not authorized", 401));
  }
};

const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {};

export { protect, authorize };
