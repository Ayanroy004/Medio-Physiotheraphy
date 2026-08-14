import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { fetchServiceByIdOrSlug } from "../services/serviceApi.js";

export default function ServiceDetailPage() {
  const { id } = useParams();

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => fetchServiceByIdOrSlug(id),
    enabled: Boolean(id),
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = service?.images || [];

  // Open image popup
  const openImage = (index) => {
    setSelectedImageIndex(index);
  };

  // Close image popup
  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  // Previous image
  const showPreviousImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null || images.length === 0) return current;

      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  // Next image
  const showNextImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null || images.length === 0) return current;

      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  // Keyboard controls
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex]);

  // Mobile swipe handling
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null || touchStartY === null) return;

    const touch = event.changedTouches[0];

    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    const minSwipeDistance = 50;

    // Only treat mostly-horizontal gestures as swipes
    if (
      Math.abs(diffX) > minSwipeDistance &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {
      if (diffX > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 rounded bg-clinic-fog" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="h-[450px] rounded-2xl bg-clinic-fog" />

            <div>
              <div className="h-10 w-3/4 rounded bg-clinic-fog" />
              <div className="mt-6 h-32 rounded bg-clinic-fog" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-clinic-navy">
          Service not found
        </h1>

        <p className="mt-3 text-clinic-ink/60">
          We couldn't find the service you're looking for.
        </p>

        <Link to="/services" className="btn-primary mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-clinic-ink/60 transition hover:text-clinic-teal"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Main */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Images */}
          <div>
            {images.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {images.map((image, index) => (
                  <button
                    key={image.publicId || index}
                    type="button"
                    onClick={() => openImage(index)}
                    className={`group overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-clinic-teal focus:ring-offset-2 ${
                      index === 0 && images.length > 1 ? "sm:col-span-2" : ""
                    }`}
                    aria-label={`Open ${service.title} image ${index + 1}`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`${service.title} ${index + 1}`}
                      className={`w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105 ${
                        index === 0 && images.length > 1 ? "h-[420px]" : "h-64"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-2xl bg-clinic-fog">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-clinic-ink/25" />

                  <p className="mt-3 text-sm text-clinic-ink/40">
                    No images available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Information */}
          <div className="lg:sticky lg:top-24">
            <span className="section-eyebrow">Our Service</span>

            <h1 className="mt-2 text-4xl font-bold text-clinic-navy">
              {service.title}
            </h1>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-clinic-navy">
                About this service
              </h2>

              <p className="mt-3 whitespace-pre-line text-base leading-8 text-clinic-ink/70">
                {service.description}
              </p>
            </div>

            {images.length > 0 && (
              <div className="mt-6 flex items-center gap-2 text-sm text-clinic-ink/50">
                <ImageIcon className="h-4 w-4" />
                {images.length} {images.length === 1 ? "image" : "images"}
              </div>
            )}

            <Link
              to="/contact"
              state={{
                preselectedServiceId: service._id,
                serviceName: service.title,
              }}
              className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto"
            >
              Contact Us for This Service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Image Lightbox / Popup */}
      {selectedImageIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} image viewer`}
          onClick={closeImage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:right-6 sm:top-6"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm sm:top-6">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Large Image */}
          <div
            className="flex h-full w-full items-center justify-center px-8 py-16 sm:px-16 sm:py-12"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex].imageUrl}
              alt={`${service.title} ${selectedImageIndex + 1}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              draggable="false"
            />
          </div>

          {/* Mobile Swipe Hint */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/60 sm:hidden">
              Swipe left or right to change image
            </div>
          )}
        </div>
      )}
    </>
  );
}
