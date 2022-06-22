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
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const user_model_1 = require("./../models/user.model");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(new ErrorResponse_1.default("Not authorized", 401));
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const user = yield user_model_1.User.findById(decoded.id);
        req.body.user = user;
        next();
    }
    catch (e) {
        return next(new ErrorResponse_1.default("Not authorized", 401));
    }
});
exports.protect = protect;
const authorize = (...roles) => (req, res, next) => { };
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map