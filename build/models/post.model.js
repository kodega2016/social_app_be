"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Title cannot be more than 50 characters"],
    },
    slug: String,
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    likes: [
        {
            user: mongoose_1.Schema.Types.ObjectId,
            date: Date,
        },
    ],
    status: {
        type: String,
        enum: ["published", "draft"],
        default: "draft",
    },
    image: {
        type: String,
        default: "/uploads/posts/default.png",
    },
    tags: {
        type: [String],
    },
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
//# sourceMappingURL=post.model.js.map