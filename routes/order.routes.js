import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  cancelOrder,
} from "../controllers/order.controller.js";
const router = express.Router();

router
  .route("")
  .get(getAllOrders) //Get all orders for a user
  .post(createOrder); //Create a new order

router
  .route("/:id")
  .get(getOrderById) // Get order details by ID
  .put(updateOrder) // Update order status
  .delete(cancelOrder); // Cancel an order

export default router;
