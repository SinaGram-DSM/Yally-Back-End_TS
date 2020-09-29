import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION,
});

export const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_NAME,
    key: (req, file, cb) => {
      const extention = path.extname(file.originalname);
      cb(null, Date.now().toString() + extention);
    },
    acl: "public-read-write",
  }),
});
