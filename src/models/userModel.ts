import IUser from "@/types/userType";
import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: ["user"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IUser>("User", userSchema);
