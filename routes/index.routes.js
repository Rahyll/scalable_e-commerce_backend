import express from "express";
import authRouter from "./auth.routes.js";
import usersRouter from "./user.routes.js";
import productRouter from "./product.routes.js";
import categoryRouter from "./category.routes.js";
import cartRouter from "./cart.routes.js";
import orderRouter from "./order.routes.js";
// import paymentRouter from "./routes/"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

export default router;
