import fs from "fs/promises";
import cloudinary from "../config/cloudinaryConfig.js";

export const uploadImageOnCloudinary = async (imagePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      ...options,
    });

    // Remove temporary local file
    await fs.unlink(imagePath).catch(() => {});

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    // Remove temporary file even when upload fails
    await fs.unlink(imagePath).catch(() => {});

    console.error("Cloudinary upload error:", error);

    throw error;
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Failed to delete Cloudinary image ${publicId}:`, error);
  }
};
