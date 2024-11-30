import express from "express";
// import multer, { memoryStorage } from "multer";
import connectDB from "./db.js";
import apiRouter from "./routes/index.routes.js";
import bodyParser from "body-parser";
import "dotenv/config";
import errorMiddleware from "./middlewares/error.middleware.js";
// import multerErrorMiddleware from "./middlewares/multerError.middleware.js";

const app = express(); // Initialize the Express app

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Multer configuration for parsing multipart/form-data
// const upload = multer({ storage: memoryStorage() });
// app.use(upload.any());

// Connect to databases
connectDB();

//Routes
app.use("/api", apiRouter);

// app.use(multerErrorMiddleware);
app.use(errorMiddleware);

// Default route for any undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
