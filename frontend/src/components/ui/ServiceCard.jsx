import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServiceCard({
  service,
  buttonText = "Contact",
  buttonTo = "/contact",
  showImageCount = true,
  animated = false,
  animationDelay = 0,
}) {
  const content = (
    <>
      {/* Service Image */}
      {service.images?.length > 0 ? (
        <div
          className="
            mb-3
            h-28
            overflow-hidden
            rounded-lg
            sm:mb-4
            sm:h-36
            sm:rounded-xl
            lg:h-40
          "
        >
          <img
            src={service.images[0].imageUrl}
            alt={service.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>
      ) : (
        <div
          className="
            mb-3
            flex
            h-28
            items-center
            justify-center
            rounded-lg
            bg-clinic-fog
            sm:mb-4
            sm:h-36
            sm:rounded-xl
            lg:h-40
          "
        >
          <ImageIcon className="h-7 w-7 text-clinic-ink/25 sm:h-9 sm:w-9" />
        </div>
      )}

      {/* Content */}
      <div className="min-w-0">
        <h3
          className="
            line-clamp-2
            text-sm
            font-semibold
            leading-5
            text-clinic-navy
            sm:text-base
            sm:leading-6
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-1.5
            line-clamp-2
            text-[12px]
            leading-[1.35rem]
            text-clinic-ink/65
            sm:mt-2
            sm:text-sm
            sm:leading-5
          "
        >
          {service.description}
        </p>
      </div>

      {/* Bottom */}
      <div
        className="
          mt-3
          flex
          min-h-[34px]
          items-center
          justify-between
          gap-2
          text-[11px]
          sm:mt-4
          sm:min-h-[38px]
          sm:text-xs
        "
      >
        {/* Image Count */}
        <div className="min-w-0">
          {showImageCount && service.images?.length > 0 ? (
            <span className="flex items-center gap-1 text-clinic-ink/50">
              <ImageIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

              <span className="truncate">
                {service.images.length}{" "}
                {service.images.length === 1 ? "image" : "images"}
              </span>
            </span>
          ) : (
            <span />
          )}
        </div>

        {/* Contact / Action */}
        <Link
          to={buttonTo}
          onClick={(e) => e.stopPropagation()}
          className="
            inline-flex
            min-h-[34px]
            shrink-0
            items-center
            gap-1
            rounded-md
            px-1.5
            py-1.5
            font-medium
            text-clinic-navy
            transition-colors
            hover:text-clinic-teal
            sm:min-h-[38px]
            sm:px-2
            sm:py-2
          "
        >
          <span>{buttonText}</span>

          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-200
              group-hover:translate-x-1
              sm:h-4
              sm:w-4
            "
          />
        </Link>
      </div>
    </>
  );

  const card = (
    <Link
      to={`/services/${service._id}`}
      className="block h-full"
    >
      <div
        className="
          card
          group
          flex
          h-full
          flex-col
          overflow-hidden
          p-3
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
          sm:p-4
          lg:p-5
        "
      >
        {content}
      </div>
    </Link>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: animationDelay,
        }}
        className="h-full"
      >
        {card}
      </motion.div>
    );
  }

  return card;
}