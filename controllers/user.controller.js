import UserModel from "../models/User.model.js";

const getProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const users = await UserModel.findOne({ _id: userId });
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

const updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findById(req.user._id);
    email && (user.email = email);
    password && (user.password = password);
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProfile = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { getProfile, updateProfile, deleteProfile };
