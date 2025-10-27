import { ICategory } from "@/types/categoryType";
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
