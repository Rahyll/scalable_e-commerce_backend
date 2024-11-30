import slugify from "slugify";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String, trim: true }],
    images: [
      {
        originalUrl: { type: String },
        thumbnailUrl: { type: String },
        fileSize: { type: Number }, // File size in bytes
        fileType: { type: String }, // MIME type
        dimensions: {
          width: { type: Number },
          height: { type: Number },
        },
      },
    ],
    stockQuantity: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });
  }
  next();
});

productSchema.index({ slug: 1 });

export default mongoose.model("Product", productSchema);
