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
        <div className="mb-5 h-48 overflow-hidden rounded-xl">
          <img
            src={service.images[0].imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="mb-5 flex h-48 items-center justify-center rounded-xl bg-clinic-fog">
          <ImageIcon className="h-10 w-10 text-clinic-ink/25" />
        </div>
      )}

      {/* Content */}
      <h3 className="text-lg font-semibold text-clinic-navy">
        {service.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-clinic-ink/65">
        {service.description}
      </p>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between text-sm">
        {showImageCount && service.images?.length > 0 ? (
          <span className="flex items-center gap-1.5 text-clinic-ink/50">
            <ImageIcon className="h-4 w-4" />

            {service.images.length}{" "}
            {service.images.length === 1 ? "image" : "images"}
          </span>
        ) : (
          <span />
        )}

        <Link
          to={buttonTo}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 font-medium text-clinic-navy group-hover:text-clinic-teal"
        >
          {buttonText}

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );

  const card = (
    <Link
      to={`/services/${service._id}`}
      className="block h-full"
    >
      <div className="card group h-full cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
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