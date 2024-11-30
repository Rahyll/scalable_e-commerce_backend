import s3 from "../config/s3.config.js";

export default async (fileContent, fileName, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };
  return await s3.upload(params).promise();
};
