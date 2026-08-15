import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../services/serviceApi.js";
import ServiceCard from "../components/ui/ServiceCard.jsx";

export default function ServicesPage() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", "all"],
    queryFn: () => fetchServices(),
  });

  return (
    <div
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
          Our treatments
        </span>

        <h1
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
          Physiotherapy services for every stage of recovery
        </h1>

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
          Every plan begins with a full assessment. Explore our services and
          choose the treatment that best matches your needs.
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
          {Array.from({ length: 6 }).map((_, i) => (
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
          We couldn't load our services right now. Please refresh or contact
          us directly.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && services.length === 0 && (
        <p
          className="
            mt-10
            text-center
            text-sm
            text-clinic-ink/60
            sm:mt-12
            sm:text-base
          "
        >
          No services are available at the moment.
        </p>
      )}

      {/* Services */}
      {!isLoading && !isError && services.length > 0 && (
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
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              buttonText="Contact"
              buttonTo="/contact"
            />
          ))}
        </div>
      )}
    </div>
  );
}