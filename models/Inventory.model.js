import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    stockQuantity: { type: Number, required: true },
    lowStockThreshold: { type: Number, required: true, default: 5 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
