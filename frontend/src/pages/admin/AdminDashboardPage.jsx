import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchServices } from "../../services/serviceApi";

export default function AdminDashboardPage() {
  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => fetchServices(),
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-navy">
            Services
          </h1>

          <p className="mt-1 text-sm text-clinic-ink/60">
            Manage all services offered by the clinic.
          </p>
        </div>

        <Link
          to="/admin/services"
          className="rounded-lg bg-clinic-teal px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Manage Services
        </Link>
      </div>

      {/* Services */}
      <div className="mt-8">
        {isLoading && (
          <div className="card py-10 text-center text-clinic-ink/50">
            Loading services...
          </div>
        )}

        {isError && (
          <div className="card py-10 text-center text-red-500">
            {error?.message || "Failed to load services."}
          </div>
        )}

        {!isLoading && !isError && services.length === 0 && (
          <div className="card py-10 text-center">
            <p className="text-clinic-ink/50">No services available yet.</p>

            <Link
              to="/admin/services"
              className="mt-3 inline-block text-sm font-medium text-clinic-teal hover:underline"
            >
              Add your first service
            </Link>
          </div>
        )}

        {!isLoading && !isError && services.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-clinic-navy">
                All Services
              </h2>

              <span className="text-sm text-clinic-ink/50">
                {services.length}{" "}
                {services.length === 1 ? "service" : "services"}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service._id} className="card overflow-hidden">
                  {/* Service Image */}
                  {service.images?.length > 0 ? (
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={service.images[0].imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-clinic-border/20">
                      <span className="text-sm text-clinic-ink/40">
                        No image
                      </span>
                    </div>
                  )}

                  {/* Service Information */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-clinic-navy">
                      {service.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-clinic-ink/60">
                      {service.description}
                    </p>

                    {/* Image Count */}
                    {service.images?.length > 0 && (
                      <p className="mt-3 text-xs text-clinic-ink/40">
                        {service.images.length}{" "}
                        {service.images.length === 1 ? "image" : "images"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
