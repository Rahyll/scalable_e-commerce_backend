import CategoryModel from "../models/Category.model.js";
import ProductModel from "../models/Product.model.js";
import { NotFoundError } from "../utils/customError.util.js";

// Get all products
const getAllProducts = async (req, res) => {
  const { page, limit, sort, order, category, minPrice, maxPrice, search } =
    value;

  // Build the query object
  let query = {};
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Calculate skip for pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Fetch products with filters, pagination, and sorting
  const products = await ProductModel.find(query)
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(parseInt(limit));

  // Count total documents matching the query
  const total = await ProductModel.countDocuments(query);

  return res.status(200).json({
    success: true,
    total,
    pages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    products,
  });
};

// Get a single product by its ID
const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  return res.status(200).json({ success: true, product });
};

// Create a new product
const addProduct = async (req, res) => {
  const { name, description, price, category, stockQuantity, images } =
    req.body;

  //
  const existingCategory = await CategoryModel.findOne({ name: category });
  if (!existingCategory) {
    throw new NotFoundError("Category not found");
  }

  // Create a new product document
  const product = new ProductModel({
    name,
    description,
    price,
    category,
    stockQuantity,
    images,
    createdBy: req.user.id,
  });

  // Save the product to the database
  await product.save();
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};

const updateProduct = async () => {};

// Delete a product
const removeProduct = async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new NotFoundError("Product not found");
  }
  return res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
  // try {
  // } catch (error) {
  //   console.error("Error deleting product:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Server error while deleting product",
  //     error,
  //   });
  // }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  removeProduct,
};
