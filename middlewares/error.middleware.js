import multer from "multer";
export default (err, req, res, next) => {
  let statusCode = err.statusCode
    ? err.statusCode
    : err instanceof multer.MulterError
    ? 400
    : 500;
  let errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
