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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  // Change active gallery image
  const selectImage = (index) => {
    setActiveImageIndex(index);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 rounded bg-clinic-fog" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="h-[320px] rounded-2xl bg-clinic-fog sm:h-[420px]" />

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
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <h1 className="text-2xl font-bold text-clinic-navy">
          Service not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-clinic-ink/60 sm:text-base">
          We couldn't find the service you're looking for.
        </p>

        <Link
          to="/services"
          className="btn-primary mt-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8
          sm:px-6
          sm:py-12
          lg:px-8
        "
      >
        {/* Back */}
        <Link
          to="/services"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-clinic-ink/60
            transition
            hover:text-clinic-teal
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Main */}
        <div
          className="
            mt-7
            grid
            gap-8
            lg:mt-8
            lg:grid-cols-2
            lg:items-start
            lg:gap-10
          "
        >
          {/* =====================================================
              IMAGE GALLERY
          ====================================================== */}
          <div className="min-w-0">
            {images.length > 0 ? (
              <>
                {/* Main Image */}
                <button
                  type="button"
                  onClick={() => openImage(activeImageIndex)}
                  className="
                    group
                    block
                    w-full
                    overflow-hidden
                    rounded-xl
                    text-left
                    focus:outline-none
                    focus:ring-2
                    focus:ring-clinic-teal
                    focus:ring-offset-2
                    sm:rounded-2xl
                  "
                  aria-label={`Open ${service.title} image ${
                    activeImageIndex + 1
                  }`}
                >
                  <img
                    src={images[activeImageIndex].imageUrl}
                    alt={`${service.title} ${activeImageIndex + 1}`}
                    className="
                      h-[260px]
                      w-full
                      cursor-zoom-in
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.02]
                      sm:h-[360px]
                      md:h-[420px]
                    "
                  />
                </button>

                {/* Mobile / Tablet Thumbnail Gallery */}
                <div
                  className="
                    mt-3
                    flex
                    gap-2
                    overflow-x-auto
                    pb-1
                    sm:mt-4
                    sm:gap-3
                    lg:hidden
                  "
                >
                  {images.map((image, index) => (
                    <button
                      key={image.publicId || index}
                      type="button"
                      onClick={() => selectImage(index)}
                      className={`
                        group
                        relative
                        h-16
                        w-20
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        border-2
                        transition-all
                        sm:h-20
                        sm:w-24
                        sm:rounded-xl
                        ${
                          activeImageIndex === index
                            ? "border-clinic-teal ring-1 ring-clinic-teal/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }
                      `}
                      aria-label={`View ${service.title} image ${
                        index + 1
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt=""
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />

                      {/* Active Indicator */}
                      {activeImageIndex === index && (
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-clinic-teal" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Desktop Gallery */}
                <div className="mt-4 hidden gap-3 lg:grid lg:grid-cols-4">
                  {images.slice(0, 8).map((image, index) => (
                    <button
                      key={image.publicId || index}
                      type="button"
                      onClick={() => selectImage(index)}
                      className={`
                        group
                        relative
                        h-20
                        overflow-hidden
                        rounded-xl
                        border-2
                        transition-all
                        ${
                          activeImageIndex === index
                            ? "border-clinic-teal ring-1 ring-clinic-teal/30"
                            : "border-transparent opacity-75 hover:opacity-100"
                        }
                      `}
                      aria-label={`View ${service.title} image ${
                        index + 1
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt=""
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />

                      {activeImageIndex === index && (
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-clinic-teal" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Image Count */}
                <div className="mt-3 flex items-center gap-2 text-xs text-clinic-ink/50 sm:text-sm">
                  <ImageIcon className="h-4 w-4" />

                  {images.length}{" "}
                  {images.length === 1 ? "image" : "images"}

                  {images.length > 1 && (
                    <span className="text-clinic-ink/35">
                      • Tap an image to view
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div
                className="
                  flex
                  h-[260px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-clinic-fog
                  sm:h-[420px]
                  sm:rounded-2xl
                "
              >
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10 text-clinic-ink/25 sm:h-12 sm:w-12" />

                  <p className="mt-3 text-sm text-clinic-ink/40">
                    No images available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              INFORMATION
          ====================================================== */}
          <div className="min-w-0 lg:sticky lg:top-24">
            <span className="section-eyebrow text-xs sm:text-sm">
              Our Service
            </span>

            <h1
              className="
                mt-2
                text-3xl
                font-bold
                leading-tight
                text-clinic-navy
                sm:text-4xl
              "
            >
              {service.title}
            </h1>

            <div className="mt-5 sm:mt-6">
              <h2 className="text-base font-semibold text-clinic-navy sm:text-lg">
                About this service
              </h2>

              <p
                className="
                  mt-3
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-clinic-ink/70
                  sm:text-base
                  sm:leading-8
                "
              >
                {service.description}
              </p>
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              state={{
                preselectedServiceId: service._id,
                serviceName: service.title,
              }}
              className="
                btn-primary
                mt-7
                inline-flex
                min-h-[48px]
                w-full
                items-center
                justify-center
                gap-2
                px-5
                text-sm
                sm:mt-8
                sm:w-auto
                sm:px-6
                sm:text-base
              "
            >
              Contact Us for This Service
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          IMAGE LIGHTBOX / POPUP
      ====================================================== */}
      {selectedImageIndex !== null && images.length > 0 && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/90
            p-2
            sm:p-6
          "
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
            className="
              absolute
              right-3
              top-3
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/20
              focus:outline-none
              focus:ring-2
              focus:ring-white
              sm:right-6
              sm:top-6
            "
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image Counter */}
          <div
            className="
              absolute
              left-1/2
              top-4
              z-20
              -translate-x-1/2
              rounded-full
              bg-black/50
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              backdrop-blur-sm
              sm:top-6
              sm:px-4
              sm:py-2
              sm:text-sm
            "
          >
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
              className="
                absolute
                left-2
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white/20
                focus:outline-none
                focus:ring-2
                focus:ring-white
                sm:left-6
                sm:h-12
                sm:w-12
              "
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
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
              className="
                absolute
                right-2
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white/20
                focus:outline-none
                focus:ring-2
                focus:ring-white
                sm:right-6
                sm:h-12
                sm:w-12
              "
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          )}

          {/* Large Image */}
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              px-10
              py-16
              sm:px-16
              sm:py-12
            "
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex].imageUrl}
              alt={`${service.title} ${selectedImageIndex + 1}`}
              className="
                max-h-full
                max-w-full
                rounded-lg
                object-contain
                shadow-2xl
              "
              draggable="false"
            />
          </div>

          {/* Mobile Swipe Hint */}
          {images.length > 1 && (
            <div
              className="
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                text-center
                text-[11px]
                text-white/60
                sm:hidden
              "
            >
              Swipe left or right to change image
            </div>
          )}
        </div>
      )}
    </>
  );
}