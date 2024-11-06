import UserModel from "../models/User.model.js";

export const profile = async (req, res) => {
  try {
    const users = await UserModel.find({}).exec();
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Something went wrong",
    });
  }
};
