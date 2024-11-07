import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const databaseUri = `mongodb://localhost:27017/e_commerce`;
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

const port = 3000;

await mongoose.connect(databaseUri).then(() => {
  console.log("DataBase Connection successfull");
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("Connection Successfull");
});
