import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    images: [
      {
        imageUrl: {
          type: String,
          required: [true, "Image URL is required"],
          trim: true,
        },

        publicId: {
          type: String,
          required: [true, "Cloudinary public ID is required"],
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Service", serviceSchema);
