"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.me = exports.register = exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const user_model_1 = require("../models/user.model");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const SendMail_1 = __importDefault(require("../utils/SendMail"));
exports.login = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse_1.default("Please provide an email and password", 400));
    }
    //check if user exists with that email address
    let user = yield user_model_1.User.findOne({ email }).exec();
    if (!user) {
        return next(new ErrorResponse_1.default(`User not found with email ${email}`, 404));
    }
    //check if password is correct
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        return next(new ErrorResponse_1.default("Invalid password", 401));
    }
    //generate JWT token
    const token = user.generateToken();
    const data = Object.assign(Object.assign({}, user.toJSON()), { token });
    res.status(200).json({
        message: "Logged in successfully",
        data: data,
        success: true,
    });
}));
exports.register = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    //check if user is already exists with this email address
    let user = yield user_model_1.User.findOne({ email: email });
    if (user) {
        return res.status(400).json({
            message: "User already exists",
            data: null,
            success: false,
        });
    }
    //create a new user
    user = yield user_model_1.User.create({
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
}));
exports.me = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.body.user.id).select("-password");
    res.status(200).json({
        message: "Current user info fetched successfully",
        data: user,
        success: true,
    });
}));
exports.logout = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Logged out successfully",
        data: null,
        success: true,
    });
}));
exports.forgotPassword = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    //check if email is empty
    if (!email) {
        return next(new ErrorResponse_1.default("Please provide an email", 400));
    }
    //check if user exists with that email address
    let user = yield user_model_1.User.findOne({ email }).exec();
    if (!user) {
        return next(new ErrorResponse_1.default(`User not found with email ${email}`, 404));
    }
    //generate a random token
    const token = yield user.generateResetToken();
    yield user.save({ validateBeforeSave: false });
    //send an email with the token
    const url = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a POST request to: \n\n ${url} \n\n with the following data: \n\n password: ${token} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;
    yield (0, SendMail_1.default)({
        to: [user.email],
        subject: "Reset your password",
        text: message,
    });
    res.status(200).json({
        message: "Passowrd reset link sent to email",
        data: message,
        success: true,
    });
}));
exports.resetPassword = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
        return next(new ErrorResponse_1.default("Please provide a token and password", 400));
    }
    //get hash from the token
    let hashToken = crypto_1.default.createHash("sha256").update(token).digest("hex");
    //check if user exists with that token
    let user = yield user_model_1.User.findOne({
        resetPasswordToken: hashToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
    }).exec();
    if (!user) {
        return next(new ErrorResponse_1.default("Invalid token", 400));
    }
    //set the new password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;
    yield user.save({ validateBeforeSave: false });
    return res.status(200).json({
        message: "Password reset successfully",
        data: user,
        success: true,
    });
}));
//# sourceMappingURL=auth.controller.js.map