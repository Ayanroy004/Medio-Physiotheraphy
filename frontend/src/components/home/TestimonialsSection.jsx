import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  ExternalLink,
} from 'lucide-react';
import { fetchTestimonials } from '../../services/testimonialApi.js';

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const {
    data: testimonials,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['google-reviews'],
    queryFn: fetchTestimonials,
  });

  const list = testimonials || [];

  const next = () => {
    setIndex((i) => (i + 1) % list.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + list.length) % list.length);
  };

  if (isLoading || isError || list.length === 0) {
    return null;
  }

  const current = list[index];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Google Reviews</span>

        <h2 className="text-3xl font-bold sm:text-4xl">
          What our patients say
        </h2>
      </div>

      <div className="relative mt-12 rounded-xl2 border border-clinic-border bg-white p-8 shadow-card sm:p-12">
        <Quote className="h-10 w-10 text-clinic-teal/20" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current._id || current.name || index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-lg leading-relaxed text-clinic-ink/85">
              "{current.text || current.reviewText}"
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {current.photoUrl ? (
                  <img
                    src={current.photoUrl}
                    alt={current.name || current.patientName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clinic-fog font-semibold text-clinic-navy">
                    {(current.name || current.patientName || '?')
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="font-display font-semibold text-clinic-navy">
                    {current.name || current.patientName}
                  </p>

                  {current.relativeTime && (
                    <p className="text-sm text-clinic-ink/60">
                      {current.relativeTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({
                  length: Math.round(current.rating || 0),
                }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-clinic-warn text-clinic-warn"
                  />
                ))}
              </div>
            </div>

            {current.googleMapsUri && (
              <a
                href={current.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-clinic-teal hover:underline"
              >
                View on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {list.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous Google review"
              className="rounded-full border border-clinic-border p-2 transition hover:bg-clinic-fog"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next Google review"
              className="rounded-full border border-clinic-border p-2 transition hover:bg-clinic-fog"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-clinic-ink/50">
          Reviews from Google
        </div>
      </div>
    </section>
  );
}