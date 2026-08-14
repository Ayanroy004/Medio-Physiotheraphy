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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Our treatments</span>

        <h1 className="text-4xl font-bold">
          Physiotherapy services for every stage of recovery
        </h1>

        <p className="mt-4 text-clinic-ink/70">
          Every plan begins with a full assessment. Explore our services and
          choose the treatment that best matches your needs.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card h-80 animate-pulse bg-clinic-fog"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="mt-12 text-center text-clinic-danger">
          We couldn't load our services right now. Please refresh or contact
          us directly.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && services.length === 0 && (
        <p className="mt-12 text-center text-clinic-ink/60">
          No services are available at the moment.
        </p>
      )}

      {/* Services */}
      {!isLoading && !isError && services.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              buttonText="Contact us for this service"
              buttonTo="/contact"
            />
          ))}
        </div>
      )}
    </div>
  );
}