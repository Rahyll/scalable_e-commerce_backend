import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "website working",
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
    });
  }
});

app.listen(port, () => {
  console.log("Connection Successfull");
});
