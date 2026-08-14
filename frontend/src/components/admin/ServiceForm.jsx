import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";

export default function ServiceForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      ...defaultValues,
    },
  });

  /*
   * Existing images already stored in Cloudinary/MongoDB
   */
  const [existingImages, setExistingImages] = useState(
    defaultValues?.images || [],
  );

  /*
   * Newly selected local files
   */
  const [selectedFiles, setSelectedFiles] = useState([]);

  /*
   * Preview URLs for newly selected files
   */
  const [previews, setPreviews] = useState([]);

  /*
   * Cleanup preview URLs when component unmounts
   */
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  /*
   |--------------------------------------------------------------------------
   | Select Images
   |--------------------------------------------------------------------------
   */

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    /*
     * Maximum 10 images total.
     *
     * Existing images + newly selected images
     */
    const remainingSlots = 10 - existingImages.length - selectedFiles.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    /*
     * Store actual File objects.
     */
    setSelectedFiles((prev) => [...prev, ...filesToAdd]);

    /*
     * Create browser previews.
     */
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);

    /*
     * Allow selecting the same file again later.
     */
    event.target.value = "";
  };

  /*
   |--------------------------------------------------------------------------
   | Remove Existing Cloudinary Image
   |--------------------------------------------------------------------------
   */

  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  /*
   |--------------------------------------------------------------------------
   | Remove Newly Selected Image
   |--------------------------------------------------------------------------
   */

  const removeSelectedImage = (index) => {
    setSelectedFiles((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index),
    );

    setPreviews((prev) => {
      const previewToRemove = prev[index];

      if (previewToRemove) {
        URL.revokeObjectURL(previewToRemove);
      }

      return prev.filter((_, previewIndex) => previewIndex !== index);
    });
  };

  /*
   |--------------------------------------------------------------------------
   | Submit Form
   |--------------------------------------------------------------------------
   |
   | We no longer upload images separately.
   |
   | Everything goes to:
   |
   | POST /api/services
   |
   | or
   |
   | PUT /api/services/:id
   |
   | Backend:
   |
   | FormData
   |    ↓
   | Multer
   |    ↓
   | Cloudinary
   |    ↓
   | MongoDB
   |--------------------------------------------------------------------------
   */

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();

      /*
       * Text fields
       */
      formData.append("title", values.title.trim());

      formData.append("description", values.description.trim());

      /*
       * Existing images that user has NOT removed.
       *
       * Backend uses this to determine which
       * Cloudinary images should remain.
       */
      formData.append("existingImages", JSON.stringify(existingImages));

      /*
       * Newly selected images.
       *
       * IMPORTANT:
       *
       * Field name must be "images"
       * because backend uses:
       *
       * upload.array("images", 10)
       */
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      /*
       * Parent component decides whether this
       * is create or update.
       */
      await onSubmit(formData);
    } catch (error) {
      console.error("Service submission failed:", error);

      throw error;
    }
  };

  const totalImages = existingImages.length + selectedFiles.length;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* -------------------------------------------------- */}
      {/* Title */}
      {/* -------------------------------------------------- */}

      <div>
        <label className="input-label" htmlFor="title">
          Service Title
        </label>

        <input
          id="title"
          type="text"
          className="input-field"
          placeholder="e.g. Sports Rehabilitation"
          disabled={isSubmitting}
          {...register("title", {
            required: "Title is required",

            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          })}
        />

        {errors.title && (
          <p className="mt-1 text-xs text-clinic-danger">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* -------------------------------------------------- */}
      {/* Description */}
      {/* -------------------------------------------------- */}

      <div>
        <label className="input-label" htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          className="input-field resize-none"
          placeholder="Describe this service..."
          disabled={isSubmitting}
          {...register("description", {
            required: "Description is required",

            maxLength: {
              value: 1000,
              message: "Description cannot exceed 1000 characters",
            },
          })}
        />

        {errors.description && (
          <p className="mt-1 text-xs text-clinic-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* -------------------------------------------------- */}
      {/* Images */}
      {/* -------------------------------------------------- */}

      <div>
        <div className="flex items-center justify-between">
          <label className="input-label">Service Images</label>

          <span className="text-xs text-clinic-ink/50">{totalImages}/10</span>
        </div>

        <p className="mb-3 text-xs text-clinic-ink/50">
          Upload one or multiple images for this service.
        </p>

        {/* Upload button */}

        {totalImages < 10 && (
          <label
            htmlFor="service-images"
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-clinic-border px-4 py-8 text-sm text-clinic-ink/60 transition hover:border-clinic-teal hover:bg-clinic-teal/5 ${
              isSubmitting ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <ImagePlus className="h-5 w-5 text-clinic-teal" />

            <span>Click to upload images</span>

            <input
              id="service-images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={isSubmitting}
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}

        {/* ------------------------------------------------ */}
        {/* Existing Images */}
        {/* ------------------------------------------------ */}

        {existingImages.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-clinic-ink/60">
              Existing Images
            </p>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {existingImages.map((image, index) => (
                <div
                  key={image.publicId || index}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={image.imageUrl}
                    alt={`Service ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {!isSubmitting && (
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* New Images */}
        {/* ------------------------------------------------ */}

        {previews.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-clinic-ink/60">
              New Images
            </p>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {previews.map((preview, index) => (
                <div
                  key={preview}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={preview}
                    alt={`New service image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {!isSubmitting && (
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                      className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-2 text-xs text-clinic-ink/40">
          JPG, PNG or WebP. Maximum 5 MB per image. Maximum 10 images.
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* Buttons */}
      {/* -------------------------------------------------- */}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="btn-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60"
        >
          {isSubmitting ? "Uploading & Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  );
}
