import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
    },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
