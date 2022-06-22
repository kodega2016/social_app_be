import { compare, genSaltSync, hashSync } from "bcryptjs";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { Document, model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  photo: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpire: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IUserModel extends Document, IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  photo: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpire: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
  generateResetToken(): string;
}

const UserSchema: Schema = new Schema<IUserModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = genSaltSync(10);
    const hash = hashSync(this.password, salt);
    this.password = hash;
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return compare(password, this.password).catch((e) => false);
};

//generate JWT token
UserSchema.methods.generateToken = function (): string {
  return sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_SECRET_EXPIRY!,
  });
};

//generate password reset token
UserSchema.methods.generateResetToken = async function (): Promise<string> {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = model<IUserModel>("User", UserSchema);
