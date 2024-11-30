import mongoose, { Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "Paypal", "Net Banking"],
      required: true,
    },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
