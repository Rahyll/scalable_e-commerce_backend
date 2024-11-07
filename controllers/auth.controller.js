import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json("userRouter working");
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};

export const signup = async (req, res) => {
  try {
    let payload = req.body;
    const { email, _id } = await UserModel.create(payload);
    const token = jwt.sign({ email, userId: _id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User created Successfully",
      token,
    });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
