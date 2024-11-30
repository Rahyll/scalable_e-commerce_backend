import express from "express";
import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from "../controllers/cart.controller.js";
const router = express.Router();

router
  .route("/")
  .get(getCart) // Get user cart
  .post(addItemToCart); // Add item to cart

router
  .route("/:itemId")
  .put(updateCartItem) // Update cart item
  .delete(removeItemFromCart); // Remove item from cart

export default router;
