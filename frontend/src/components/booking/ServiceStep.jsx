import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Icons from 'lucide-react';
import { Clock, IndianRupee } from 'lucide-react';
import { fetchServices } from '../../services/serviceApi.js';

function ServiceIcon({ name }) {
  const IconComponent = Icons[name] || Icons.Activity;
  return <IconComponent className="h-6 w-6 text-clinic-teal" />;
}

export default function ServiceStep({ selectedServiceId, onSelect, onNext }) {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services', 'booking'],
    queryFn: () => fetchServices(),
  });

  // If arriving from "Book This Service" on the Services page, auto-select
  // the matching service the moment the list loads (runs once).
  const hasAutoSelected = useRef(false);
  useEffect(() => {
    if (!hasAutoSelected.current && services && selectedServiceId) {
      const match = services.find((s) => s._id === selectedServiceId);
      if (match) {
        onSelect(match);
        hasAutoSelected.current = true;
      }
    }
  }, [services, selectedServiceId, onSelect]);

  return (
    <div>
      <h2 className="text-center font-display text-2xl font-bold text-clinic-navy">
        Choose a service
      </h2>
      <p className="mt-2 text-center text-sm text-clinic-ink/60">
        Not sure what you need? Pick your closest match — your therapist will adjust the plan at your first visit.
      </p>

      {isLoading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl2 bg-clinic-fog" />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {(services || []).map((service) => {
            const isSelected = selectedServiceId === service._id;
            return (
              <button
                key={service._id}
                onClick={() => onSelect(service)}
                className={`flex items-start gap-4 rounded-xl2 border-2 p-5 text-left transition-all ${
                  isSelected
                    ? 'border-clinic-teal bg-clinic-teal/5 shadow-card'
                    : 'border-clinic-border bg-white hover:border-clinic-teal/40'
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-teal/10">
                  <ServiceIcon name={service.icon} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-clinic-navy">{service.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-clinic-ink/60">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {service.durationMinutes} min</span>
                    <span className="flex items-center gap-1 font-mono"><IndianRupee className="h-3.5 w-3.5" /> {service.price}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedServiceId}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
