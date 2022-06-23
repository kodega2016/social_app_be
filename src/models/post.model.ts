import { model, Schema } from "mongoose";

export interface IPost {
  title: String;
  content: String;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comments: [
    {
      user: Schema.Types.ObjectId;
      text: String;
      name: String;
      avatar: String;
      date: Date;
    }
  ];
  likes: [
    {
      user: Schema.Types.ObjectId;
      date: Date;
    }
  ];
  status: String;
  image: String;
  tags: [String];
}

export default interface IPostModel extends Document, IPost {
  title: string;
  slug: string;
  content: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comments: [
    {
      user: Schema.Types.ObjectId;
      text: string;
      name: string;
      avatar: string;
      date: Date;
    }
  ];
  likes: [
    {
      user: Schema.Types.ObjectId;
      date: Date;
    }
  ];
  status: string;
  image: string;
  tags: [string];
}

const PostSchema: Schema = new Schema<IPostModel>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
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
        user: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPostModel>("Post", PostSchema);
