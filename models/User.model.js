import mongoose, { Schema } from "mongoose";
import { passwordHasher } from "../utils/passwordHasher.util.js";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exist!"],
    },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false }, // Track email verification status
    isPhoneVerified: { type: Boolean, default: false }, // Track phone verification status
    profilePicture: {
      type: String,
      default: null,
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified(this.password)) {
      this.password = await passwordHasher(this.password);
    }
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      update.password = await passwordHasher(update.password);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", UserSchema);
