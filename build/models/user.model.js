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
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    photo: {
        type: String,
        default: "/uploads/user/default.png",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hash = (0, bcryptjs_1.hashSync)(this.password, salt);
        this.password = hash;
    }
    next();
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.compare)(password, this.password).catch((e) => false);
    });
};
//generate JWT token
UserSchema.methods.generateToken = function () {
    return (0, jsonwebtoken_1.sign)({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRY,
    });
};
//generate password reset token
UserSchema.methods.generateResetToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate token
        const resetToken = crypto_1.default.randomBytes(20).toString("hex");
        // Hash token and set to resetPasswordToken field
        this.resetPasswordToken = crypto_1.default
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        // Set expire
        this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;
        return resetToken;
    });
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map