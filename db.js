import mongoose from "mongoose";

const databaseUri = `mongodb://localhost:27017/e_commerce`;

export default async () => {
  try {
    await mongoose.connect(databaseUri, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
