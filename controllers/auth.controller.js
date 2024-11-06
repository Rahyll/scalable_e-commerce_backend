import UserModel from "../models/User.model.js";
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
    // payload.username = `${payload.firstName} ${payload.lastName}`;
    // delete payload.firstName;
    // delete payload.lastName;
    await UserModel.create(payload);
    res.status(201).json({
      message: "User created Successfully",
    });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};
