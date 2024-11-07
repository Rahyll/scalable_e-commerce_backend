import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";
import { authenticator } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(authenticator, getProfile)
  .put(authenticator, updateProfile)
  .delete(authenticator, deleteProfile);

export default router;
