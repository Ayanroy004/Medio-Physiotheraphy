import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fetchTestimonials } from '../../services/testimonialApi.js';

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials', 'featured'],
    queryFn: () => fetchTestimonials(true),
  });

  const list = testimonials || [];

  const next = () => setIndex((i) => (i + 1) % list.length);
  const prev = () => setIndex((i) => (i - 1 + list.length) % list.length);

  if (isLoading || list.length === 0) return null;

  const current = list[index];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Patient stories</span>
        <h2 className="text-3xl font-bold sm:text-4xl">Real recoveries, real words</h2>
      </div>

      <div className="relative mt-12 rounded-xl2 border border-clinic-border bg-white p-8 shadow-card sm:p-12">
        <Quote className="h-10 w-10 text-clinic-teal/20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-lg leading-relaxed text-clinic-ink/85">
              "{current.reviewText}"
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-clinic-navy">{current.patientName}</p>
                <p className="text-sm text-clinic-ink/60">{current.conditionTreated}</p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-clinic-warn text-clinic-warn" />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {list.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full border border-clinic-border p-2 hover:bg-clinic-fog"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full border border-clinic-border p-2 hover:bg-clinic-fog"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
