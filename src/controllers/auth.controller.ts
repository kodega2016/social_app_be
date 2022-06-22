import crypto from "crypto";
import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { User } from "../models/user.model";
import ErrorResponse from "../utils/ErrorResponse";
import sendMail from "../utils/SendMail";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    //check if user exists with that email address
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return next(new ErrorResponse(`User not found with email ${email}`, 404));
    }

    //check if password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 401));
    }

    //generate JWT token
    const token = user.generateToken();

    const data = { ...user.toJSON(), token };

    res.status(200).json({
      message: "Logged in successfully",
      data: data,
      success: true,
    });
  }
);

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //check if user is already exists with this email address
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        data: null,
        success: false,
      });
    }

    //create a new user
    user = await User.create({
      name: name,
      email: email,
      password: password,
      age: 10,
    });

    res.status(201).json({
      message: "Registered in successfully",
      data: user,
      success: true,
    });
  }
);

export const me = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.body.user.id).select("-password");

    res.status(200).json({
      message: "Current user info fetched successfully",
      data: user,
      success: true,
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "Logged out successfully",
      data: null,
      success: true,
    });
  }
);

export const forgotPassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    //check if email is empty
    if (!email) {
      return next(new ErrorResponse("Please provide an email", 400));
    }

    //check if user exists with that email address
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return next(new ErrorResponse(`User not found with email ${email}`, 404));
    }

    //generate a random token
    const token = await user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    //send an email with the token
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${token}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a POST request to: \n\n ${url} \n\n with the following data: \n\n password: ${token} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

    await sendMail({
      to: [user.email],
      subject: "Reset your password",
      text: message,
    });

    res.status(200).json({
      message: "Passowrd reset link sent to email",
      data: message,
      success: true,
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return next(
        new ErrorResponse("Please provide a token and password", 400)
      );
    }

    //get hash from the token
    let hashToken = crypto.createHash("sha256").update(token).digest("hex");

    //check if user exists with that token
    let user = await User.findOne({
      resetPasswordToken: hashToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    }).exec();

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    //set the new password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Password reset successfully",
      data: user,
      success: true,
    });
  }
);
