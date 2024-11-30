import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import {
  comparePassword,
  passwordHasher,
} from "../utils/passwordHasher.util.js";
import {
  UnauthorizedError,
  ValidationError,
} from "../utils/customError.util.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Generate token for authorization
  const token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Respond with success message and token
  res.status(200).json({
    message: "Logged in successfully",
    token,
  });
  // try {
  // } catch (err) {
  //   console.error("Login Error:", err.message);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};

export const register = async (req, res) => {
  const { email, ...rest } = req.body; // Destructure payload to isolate email

  // Check if user already exists in the database
  const userExist = await UserModel.exists({ email });
  if (userExist) {
    throw new ValidationError("User already exists!");
  }

  // Create a new user
  const user = new UserModel({ email, ...rest });

  // Generate token for Authorization
  const token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Save user to the database
  await user.save();

  // Respond with success message and token
  res.status(201).json({
    message: "User created successfully",
    token,
  });
  // try {
  // } catch (err) {
  //   console.error("Error creating user:", err.message);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};

export const logout = async (req, res) => {};

export const verifyEmail = async (req, res) => {};

export const verifyPhone = async (req, res) => {};
