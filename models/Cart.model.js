import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});
const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
