import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../../services/serviceApi.js";
import ServiceCard from "../../components/ui/ServiceCard.jsx";

export default function ServicesOverview() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", "preview"],
    queryFn: () => fetchServices(),
  });

  // Show only 4 services in the overview
  const preview = services.slice(0, 4);

  return (
    <section
      className="
        mx-auto
        max-w-7xl
        px-4
        py-12
        sm:px-6
        sm:py-16
        md:py-20
        lg:px-8
      "
    >
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow text-xs sm:text-sm">
          What we treat
        </span>

        <h2
          className="
            mt-1
            text-[1.75rem]
            font-bold
            leading-[1.15]
            tracking-tight
            text-clinic-ink
            sm:text-3xl
            md:text-4xl
          "
        >
          Care built around your recovery goals
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-[14px]
            leading-6
            text-clinic-ink/70
            sm:text-base
            sm:leading-7
          "
        >
          From sports injuries to post-surgical recovery, every program starts
          with a thorough assessment and a plan tailored to how you move.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-5xl
            grid-cols-2
            gap-2.5
            sm:mt-10
            sm:gap-5
            lg:grid-cols-3
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="
                card
                h-52
                animate-pulse
                bg-clinic-fog
                sm:h-72
              "
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p
          className="
            mx-auto
            mt-10
            max-w-md
            px-4
            text-center
            text-sm
            leading-6
            text-clinic-danger
            sm:mt-12
            sm:text-base
          "
        >
          Unable to load services right now. Please refresh the page.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && preview.length === 0 && (
        <p
          className="
            mt-10
            text-center
            text-sm
            text-clinic-ink/50
            sm:mt-12
            sm:text-base
          "
        >
          No services available at the moment.
        </p>
      )}

      {/* Services */}
      {!isLoading && !isError && preview.length > 0 && (
        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-5xl
            grid-cols-2
            gap-2.5
            sm:mt-10
            sm:gap-5
            lg:grid-cols-3
          "
        >
          {preview.map((service, i) => (
            <ServiceCard
              key={service._id}
              service={service}
              buttonText="Contact"
              buttonTo="/contact"
              animated={true}
              animationDelay={i * 0.05}
            />
          ))}
        </div>
      )}

      {/* View All */}
      <div className="mt-8 text-center sm:mt-10">
        <Link
          to="/services"
          className="
            btn-secondary
            inline-flex
            min-h-[44px]
            w-full
            items-center
            justify-center
            px-5
            py-2.5
            text-sm
            font-semibold
            sm:w-auto
            sm:min-h-[46px]
            sm:px-7
            sm:py-3
            sm:text-base
          "
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}