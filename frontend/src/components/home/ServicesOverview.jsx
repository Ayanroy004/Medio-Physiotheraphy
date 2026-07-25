import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../services/serviceApi.js';

function ServiceIcon({ name }) {
  const IconComponent = Icons[name] || Icons.Activity;
  return <IconComponent className="h-6 w-6 text-clinic-teal" />;
}

export default function ServicesOverview() {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['services', 'preview'],
    queryFn: () => fetchServices(),
  });

  const preview = (services || []).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">What we treat</span>
        <h2 className="text-3xl font-bold sm:text-4xl">Care built around your recovery goals</h2>
        <p className="mt-4 text-clinic-ink/70">
          From sports injuries to post-surgical recovery, every program starts with a
          thorough assessment and a plan tailored to how you move.
        </p>
      </div>

      {isLoading && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-40 animate-pulse bg-clinic-fog" />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-12 text-center text-clinic-danger">
          Unable to load services right now. Please refresh the page.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card group"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-clinic-teal/10">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="text-lg font-semibold text-clinic-navy">{service.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-clinic-ink/65">{service.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-mono text-clinic-teal">${service.price} · {service.durationMinutes} min</span>
                <Link
                  to="/book"
                  className="flex items-center gap-1 font-medium text-clinic-navy group-hover:text-clinic-teal"
                >
                  Book <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/services" className="btn-secondary">
          View All Services
        </Link>
      </div>
    </section>
  );
}
