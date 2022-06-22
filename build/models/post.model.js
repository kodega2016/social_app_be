"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {},
    slug: {},
    content: {},
    user: {},
    comments: [{}],
    likes: [{}],
    status: {},
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
//# sourceMappingURL=post.model.js.map