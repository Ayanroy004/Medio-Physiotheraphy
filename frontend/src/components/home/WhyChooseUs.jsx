import { motion } from 'framer-motion';
import { GraduationCap, Users, Clock3, Sparkles } from 'lucide-react';

const POINTS = [
  {
    icon: GraduationCap,
    title: 'Doctorate-Level Therapists',
    text: 'Our team holds advanced clinical degrees and continues ongoing specialty training every year.',
  },
  {
    icon: Users,
    title: 'One Therapist, Full Journey',
    text: 'You see the same therapist at every visit — no re-explaining your history, no lost context.',
  },
  {
    icon: Clock3,
    title: '45–60 Minute Sessions',
    text: 'No rushed 15-minute slots. Every session gives us real time to assess, treat, and coach.',
  },
  {
    icon: Sparkles,
    title: 'Evidence-Based Programs',
    text: 'Treatment plans are grounded in current clinical research, not one-size-fits-all templates.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-clinic-fog py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Why patients choose us</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Expertise you can feel in the first session</h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-clinic-navy text-white sm:mx-0">
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-clinic-navy">{point.title}</h3>
              <p className="mt-2 text-sm text-clinic-ink/65">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
