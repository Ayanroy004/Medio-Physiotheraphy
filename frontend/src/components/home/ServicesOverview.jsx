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

  const preview = services.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">What we treat</span>

        <h2 className="text-3xl font-bold sm:text-4xl">
          Care built around your recovery goals
        </h2>

        <p className="mt-4 text-clinic-ink/70">
          From sports injuries to post-surgical recovery, every program starts
          with a thorough assessment and a plan tailored to how you move.
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
          Unable to load services right now. Please refresh the page.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && preview.length === 0 && (
        <p className="mt-12 text-center text-clinic-ink/50">
          No services available at the moment.
        </p>
      )}

      {/* Services */}
      {!isLoading && !isError && preview.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <div className="mt-10 text-center">
        <Link to="/services" className="btn-secondary">
          View All Services
        </Link>
      </div>
    </section>
  );
}