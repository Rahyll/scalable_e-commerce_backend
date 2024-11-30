import express from "express";
import validator from "../middlewares/validateRequest.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import processImage from "../middlewares/image.middleware.js";

import {
  addProduct,
  removeProduct,
  getAllProducts,
  updateProduct,
  getProductById,
} from "../controllers/product.controller.js";

import { authenticator } from "../middlewares/auth.middleware.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";

import {
  addProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
} from "../schemas/product.schema.js";

const router = express.Router();

router
  .route("/")
  .get(validator(getAllProductsSchema), getAllProducts) // Get all products
  .post(
    authenticator,
    upload("5MB", ["jpeg", "png", "jpg", "gif"]).single("file"),
    processImage,
    validator(addProductSchema),
    asyncWrapper(addProduct)
  ); // Add a new product

router
  .route("/:productId")
  .get(validator(getProductByIdSchema), getProductById) // Get a product by ID
  .put(updateProduct) // Update product
  .delete(removeProduct); // Delete product

export default router;
