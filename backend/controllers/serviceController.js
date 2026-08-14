import asyncHandler from "express-async-handler";
import Service from "../models/Service.js";

import {
  uploadImageOnCloudinary,
  deleteImageFromCloudinary,
} from "../utils/cloudinaryFileHandle.js";

/*
|--------------------------------------------------------------------------
| Get all services
|--------------------------------------------------------------------------
| GET /api/services
| Public
|--------------------------------------------------------------------------
*/

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

/*
|--------------------------------------------------------------------------
| Get single service
|--------------------------------------------------------------------------
| GET /api/services/:idOrSlug
| Public
|--------------------------------------------------------------------------
*/

export const getServiceByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
    res.status(400);
    throw new Error("Invalid service ID");
  }

  const service = await Service.findById(idOrSlug);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

/*
|--------------------------------------------------------------------------
| Create service
|--------------------------------------------------------------------------
| POST /api/services
| Private - Admin / Therapist
|
| multipart/form-data
|
| title
| description
| images[]
|--------------------------------------------------------------------------
*/

export const createService = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim()) {
    res.status(400);
    throw new Error("Service title is required");
  }

  if (!description?.trim()) {
    res.status(400);
    throw new Error("Service description is required");
  }

  // Create service first so we get its MongoDB ID
  const service = await Service.create({
    title: title.trim(),
    description: description.trim(),
    images: [],
  });

  const uploadedImages = [];

  try {
    /*
     * Upload images to:
     *
     * media/services/<serviceId>
     */
    if (req.files?.length) {
      for (const file of req.files) {
        const image = await uploadImageOnCloudinary(file.path, {
          folder: `medio house/Services/${service._id}`,
        });

        uploadedImages.push(image);
      }
    }

    service.images = uploadedImages;

    await service.save();

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    // Delete uploaded Cloudinary images
    for (const image of uploadedImages) {
      await deleteImageFromCloudinary(image.publicId);
    }

    // Delete partially created MongoDB document
    await Service.findByIdAndDelete(service._id);

    throw error;
  }
});

/*
|--------------------------------------------------------------------------
| Update service
|--------------------------------------------------------------------------
| PUT /api/services/:id
| Private - Admin / Therapist
|
| multipart/form-data
|
| title
| description
| existingImages
| images[]
|--------------------------------------------------------------------------
*/

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  const { title, description, existingImages } = req.body;

  /*
   * Parse existing images.
   */
  let keptImages = [];

  if (existingImages) {
    try {
      keptImages =
        typeof existingImages === "string"
          ? JSON.parse(existingImages)
          : existingImages;
    } catch (error) {
      res.status(400);
      throw new Error("Invalid existingImages format");
    }
  }

  /*
   * Make sure only valid image objects remain.
   */
  keptImages = Array.isArray(keptImages)
    ? keptImages.filter((image) => image && image.imageUrl && image.publicId)
    : [];

  /*
   * Find images removed by the user.
   */
  const removedImages = service.images.filter(
    (oldImage) =>
      !keptImages.some((newImage) => newImage.publicId === oldImage.publicId),
  );

  const newImages = [];

  try {
    /*
     * Upload new images.
     */
    if (req.files?.length) {
      for (const file of req.files) {
        const image = await uploadImageOnCloudinary(file.path, {
          folder: `media/services/${service._id}`,
        });

        newImages.push(image);
      }
    }

    /*
     * Update text fields.
     */
    if (title !== undefined) {
      if (!title.trim()) {
        res.status(400);
        throw new Error("Service title is required");
      }

      service.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        res.status(400);
        throw new Error("Service description is required");
      }

      service.description = description.trim();
    }

    /*
     * Existing kept images +
     * newly uploaded images.
     */
    service.images = [...keptImages, ...newImages];

    await service.save();

    /*
     * IMPORTANT:
     *
     * Delete removed Cloudinary images only
     * after MongoDB successfully saves.
     */
    for (const image of removedImages) {
      await deleteImageFromCloudinary(image.publicId);
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    /*
     * If something fails while uploading/saving,
     * delete newly uploaded images.
     */
    for (const image of newImages) {
      await deleteImageFromCloudinary(image.publicId);
    }

    throw error;
  }
});

/*
|--------------------------------------------------------------------------
| Delete service
|--------------------------------------------------------------------------
| DELETE /api/services/:id
| Private - Admin
|--------------------------------------------------------------------------
*/

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  /*
   * Delete all Cloudinary images.
   */
  for (const image of service.images) {
    await deleteImageFromCloudinary(image.publicId);
  }

  /*
   * Delete MongoDB document.
   */
  await service.deleteOne();

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});
