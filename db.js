import mongoose from "mongoose";
import "dotenv/config";
const databaseUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@development.dlozu.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Development`;

export default async () => {
  try {
    await mongoose.connect(databaseUri, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
