export default (originalName, type = "") => {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop();
  const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_");
  switch (type) {
    case "thumbnail":
      return `${baseName}_thumbnail_${timestamp}.${extension}`;
    default:
      return `${baseName}_${timestamp}.${extension}`;
  }
};
