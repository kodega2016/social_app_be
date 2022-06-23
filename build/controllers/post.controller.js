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
exports.destroy = exports.update = exports.save = exports.show = exports.index = void 0;
const fs_1 = __importDefault(require("fs"));
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const post_model_1 = require("../models/post.model");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
exports.index = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find();
    res.status(200).json({
        success: true,
        data: posts,
        message: "Posts fetched successfully",
    });
}));
exports.show = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield post_model_1.Post.findById(id);
    if (!post) {
        return next(new ErrorResponse_1.default(`Post not found with id ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: post,
        message: "Post fetched successfully",
    });
}));
exports.save = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, tags, photo } = req.body;
    const post = yield post_model_1.Post.create({
        title,
        content,
        tags,
        image: photo,
        user: req.body.user._id,
    });
    res.status(201).json({
        success: true,
        data: post,
        message: "Post created successfully",
    });
}));
exports.update = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, tags, photo } = req.body;
    let post = yield post_model_1.Post.findById(id);
    if (!post) {
        return next(new ErrorResponse_1.default(`Post not found with id ${id}`, 404));
    }
    //check if request has a photo
    if (photo) {
        const imagePath = `${process.env.FILE_UPLOAD_PATH}/posts/${post.image}`;
        if (fs_1.default.existsSync(imagePath)) {
            fs_1.default.unlinkSync(imagePath);
        }
    }
    //check if creator is author
    if (post.user.toString() !== req.body.user._id.toString()) {
        return next(new ErrorResponse_1.default(`User ${req.body.user._id} is not authorized to update this post`, 401));
    }
    post = yield post_model_1.Post.findByIdAndUpdate(id, {
        title,
        content,
        tags,
        image: photo || post.image,
        user: req.body.user._id,
    }, {
        new: true,
    });
    res.status(201).json({
        success: true,
        data: post,
        message: "Post updated successfully",
    });
}));
exports.destroy = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let post = yield post_model_1.Post.findById(id);
    if (!post) {
        return next(new ErrorResponse_1.default(`Post not found with id ${id}`, 404));
    }
    //check if creator is author
    if ((post === null || post === void 0 ? void 0 : post.user.toString()) !== req.body.user._id.toString()) {
        return next(new ErrorResponse_1.default(`User ${req.body.user._id} is not authorized to delete this post`, 401));
    }
    yield post_model_1.Post.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        data: null,
        message: "Post deleted successfully",
    });
}));
//# sourceMappingURL=post.controller.js.map