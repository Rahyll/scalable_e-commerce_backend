import sharp from "sharp";
import s3Upload from "../utils/s3Upload.util.js";
import sanitizeFileName from "../utils/sanitizeFileName.util.js";
const processImage = async (req, res, next) => {
  try {
    if (!(req.files || req.file)) {
      next();
    }
    if (req.file) {
      req.thumbnail = await thumbnailGenerator(req.file);
    }
    if (req.files) {
      req.thumbnails = await Promise.all(
        req.files.map((file) => thumbnailGenerator(file))
      );
    }
    next();
  } catch (err) {
    console.error("Error while processing image", err);
    return res.status(500).json({
      success: false,
      message: "Server error while processing image",
      err,
    });
  }
};

const thumbnailGenerator = async (file) => {
  const originalFileName = sanitizeFileName(file.originalname);
  const thumbnailFileName = sanitizeFileName(file.originalname, "thumbnail");

  // Resize for Thumbnail
  const thumbnailBuffer = await sharp(file.buffer)
    .resize({ width: 150, height: 150 })
    .toFormat("jpeg")
    .toBuffer();

  // Upload Original and Thumbnail
  const [imageData, thumbnailData] = await Promise.all([
    await s3Upload(
      file.buffer,
      originalFileName,
      "ecommerce-product-media/original"
    ),
    await s3Upload(
      thumbnailBuffer,
      thumbnailFileName,
      "ecommerce-product-media/thumbnail"
    ),
  ]);

  // Return processed image data to the request object
  return {
    originalUrl: imageData.Location,
    thumbnailUrl: thumbnailData.Location,
    fileSize: file.size,
    fileType: file.mimetype,
    // dimensions: await sharp(file.buffer).metadata(),
  };
};

export default processImage;
