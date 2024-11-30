import multer from "multer";
import path from "path";
import { ValidationError } from "../utils/customError.util.js";

/**
 * Utility function to convert human-readable size (e.g., '1MB', '100KB') or plain numbers to bytes
 * @param {string|number} size - Human-readable size string or number (in bytes)
 * @returns {number} - Size in bytes
 */
const parseFileSize = (size) => {
  if (typeof size === "number") {
    return size; // Return as-is if already a number
  }

  const units = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  };

  const regex = /^(\d+)(KB|MB|GB)$/i;
  const match = size.match(regex);

  if (!match) {
    throw new ValidationError(
      "Invalid file size format. Use plain numbers (bytes) or human-readable formats like '100KB', '1MB', or '1GB'."
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toUpperCase();

  return value * units[unit];
};

const upload = (fileSize, fileTypes) => {
  const ALLOWED_FILE_TYPES = new RegExp(fileTypes.join("|")); // Converts array of types to regex
  const maxSize = parseFileSize(fileSize);

  const fileFilter = (req, file, cb) => {
    const isFileTypeValid = ALLOWED_FILE_TYPES.test(
      path.extname(file.originalname).toLowerCase()
    );
    const isMimeTypeValid = ALLOWED_FILE_TYPES.test(file.mimetype);

    if (isFileTypeValid && isMimeTypeValid) {
      cb(null, true);
    } else {
      cb(
        new ValidationError(
          `Only files with (${fileTypes.join(",")}) are allowed!`
        ),
        false
      );
    }
  };

  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

export default upload;
