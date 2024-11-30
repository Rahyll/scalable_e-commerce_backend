import express from "express";
const router = express.Router();
import {
  getAllCategories,
  addCategory,
  updateCategory,
  removeCategory,
} from "../controllers/category.controller.js";

router
  .route("/")
  .get(getAllCategories) // Get all categories
  .post(addCategory); // Add a new category

router
  .route("/:categoryId")
  .put(updateCategory) // Update category
  .delete(removeCategory); // Delete category

export default router;
