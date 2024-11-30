import express from "express";
import {
  login,
  register,
  logout,
  verifyEmail,
  verifyPhone,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import validator from "../middlewares/validateRequest.middleware.js";
import { authenticator } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(validator(registerSchema), register); // User registration
router.route("/login").post(validator(loginSchema), login); // User login
router.route("/logout").post(authenticator, logout); // Logout
router.route("/verify-email").post(authenticator, verifyEmail); // Verify email
router.route("/verify-phone").post(authenticator, verifyPhone); // Verify phone

export default router;
