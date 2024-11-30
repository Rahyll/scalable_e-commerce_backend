import { ValidationError } from "../utils/customError.util.js";
import multer from "multer";

export default (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return next(
          new ValidationError("File too large. Max size is 5MB.", 400)
        ); // Adjust size as needed
      case "LIMIT_FILE_COUNT":
        return next(
          new ValidationError(
            "Too many files uploaded. Max limit is 3 files.",
            400
          )
        ); // Adjust count as needed
      case "LIMIT_FIELD_COUNT":
        return next(new ValidationError("Too many fields in the form.", 400));
      case "LIMIT_FIELD_KEY":
        return next(new ValidationError("Field name too long.", 400));
      case "LIMIT_PART_COUNT":
        return next(new ValidationError("Too many parts in the form.", 400));
      case "LIMIT_UNEXPECTED_FILE":
        return next(new ValidationError("Unexpected field in form.", 400));
      default:
        return next(
          new ValidationError("An error occurred during file upload.", 500)
        );
    }
  }

  if (err) {
    return next(err); // Pass the error to the next middleware
  }

  next();
};
