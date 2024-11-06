import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import validator from "../middlewares/validateRequest.middleware.js";
const router = express.Router();

router.post("/login", validator(loginSchema), login);

router.post("/signup", validator(signupSchema), signup);

export default router;
