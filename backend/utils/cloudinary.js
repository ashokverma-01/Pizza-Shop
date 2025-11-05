import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Gym-Shop-images",
    format: async () => "png",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

export const deleteImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);
    return result;
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    throw err;
  }
};

export { cloudinary };
