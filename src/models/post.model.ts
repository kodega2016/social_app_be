import { model, Schema } from "mongoose";

const PostSchema: Schema = new Schema(
  {
    title: {},
    slug: {},
    content: {},
    user: {},
    comments: [{}],
    likes: [{}],
    status: {},
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", PostSchema);
