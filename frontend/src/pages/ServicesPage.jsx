import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Clock, IndianRupee } from 'lucide-react';
import { fetchServices } from '../services/serviceApi.js';

function ServiceIcon({ name }) {
  const IconComponent = Icons[name] || Icons.Activity;
  return <IconComponent className="h-7 w-7 text-clinic-teal" />;
}

export default function ServicesPage() {
  const [category, setCategory] = useState('All');
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['services', 'all'],
    queryFn: () => fetchServices(),
  });

  const categories = useMemo(() => {
    const set = new Set((services || []).map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, [services]);

  const filtered = useMemo(() => {
    if (!services) return [];
    return category === 'All' ? services : services.filter((s) => s.category === category);
  }, [services, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Our treatments</span>
        <h1 className="text-4xl font-bold">Physiotherapy services for every stage of recovery</h1>
        <p className="mt-4 text-clinic-ink/70">
          Every plan begins with a full assessment. Pick the area that matches your
          situation, or book a general consultation and we'll guide you.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-clinic-teal text-white'
                : 'bg-clinic-fog text-clinic-ink/70 hover:bg-clinic-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-56 animate-pulse bg-clinic-fog" />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-12 text-center text-clinic-danger">
          We couldn't load our services right now. Please refresh or contact us directly.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <div key={service._id} className="card flex flex-col">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-clinic-teal/10">
                <ServiceIcon name={service.icon} />
              </div>
              <span className="mb-2 inline-block w-fit rounded-full bg-clinic-fog px-3 py-1 text-xs font-medium text-clinic-teal">
                {service.category}
              </span>
              <h3 className="text-lg font-semibold text-clinic-navy">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm text-clinic-ink/65">{service.description}</p>

              <div className="mt-5 flex items-center gap-4 text-sm text-clinic-ink/70">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {service.durationMinutes} min
                </span>
                <span className="flex items-center gap-1 font-mono font-semibold text-clinic-navy">
                  <IndianRupee className="h-4 w-4" /> {service.price}
                </span>
              </div>

              <Link
                to={{ pathname: '/book' }}
                state={{ preselectedServiceId: service._id }}
                className="btn-primary mt-5 w-full text-sm"
              >
                Book This Service
              </Link>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-clinic-ink/60">
              No services found in this category yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
