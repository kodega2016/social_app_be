import { NextFunction, Request, Response } from "express";
import fs from "fs";
import asyncHandler from "../middleware/asyncHandler.middleware";
import { Post } from "../models/post.model";
import ErrorResponse from "../utils/ErrorResponse";

export const index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      data: posts,
      message: "Posts fetched successfully",
    });
  }
);

export const show = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return next(new ErrorResponse(`Post not found with id ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: post,
      message: "Post fetched successfully",
    });
  }
);

export const save = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, tags, photo } = req.body;

    const post = await Post.create({
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
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, tags, photo } = req.body;

    let post = await Post.findById(id);

    if (!post) {
      return next(new ErrorResponse(`Post not found with id ${id}`, 404));
    }

    //check if request has a photo
    if (photo) {
      const imagePath = `${process.env.FILE_UPLOAD_PATH}/posts/${post.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    //check if creator is author
    if (post.user.toString() !== req.body.user._id.toString()) {
      return next(
        new ErrorResponse(
          `User ${req.body.user._id} is not authorized to update this post`,
          401
        )
      );
    }

    post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags,
        image: photo || post.image,
        user: req.body.user._id,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      data: post,
      message: "Post updated successfully",
    });
  }
);

export const destroy = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let post = await Post.findById(id);

    if (!post) {
      return next(new ErrorResponse(`Post not found with id ${id}`, 404));
    }

    //check if creator is author
    if (post?.user.toString() !== req.body.user._id.toString()) {
      return next(
        new ErrorResponse(
          `User ${req.body.user._id} is not authorized to delete this post`,
          401
        )
      );
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: null,
      message: "Post deleted successfully",
    });
  }
);
