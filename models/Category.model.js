import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Category must be unique"],
    },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
