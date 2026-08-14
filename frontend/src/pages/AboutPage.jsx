import { motion } from 'framer-motion';
import { GraduationCap, Award, HeartHandshake } from 'lucide-react';
import RecoveryWave from '../components/ui/RecoveryWave.jsx';

const CREDENTIALS = [
  'Doctor of Physical Therapy (DPT) — Manipal Academy of Higher Education',
  'Certified Orthopedic Manual Therapist (COMT)',
  'Sports Physiotherapy Fellowship — Indian Association of Physiotherapists',
  '12+ years treating post-operative and sports-related injuries',
];

const VALUES = [
  {
    icon: GraduationCap,
    title: 'Clinical Rigor',
    text: 'Every treatment plan is grounded in current research and re-evaluated as your body responds.',
  },
  {
    icon: HeartHandshake,
    title: 'Whole-Person Care',
    text: 'We treat the person, not just the joint — factoring in sleep, stress, and daily movement habits.',
  },
  {
    icon: Award,
    title: 'Measurable Progress',
    text: 'We track range of motion, strength, and pain scores at every visit so progress is never a guess.',
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-clinic-navy py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="section-eyebrow text-clinic-sky">About Vitality</span>
          <h1 className="text-4xl font-bold sm:text-5xl text-stone-300">
            Care led by clinicians, <span className="text-clinic-sky">not checklists</span>
          </h1>
          <RecoveryWave className="mx-auto mt-8 h-14 w-64 text-clinic-sky" strokeWidth={3} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">Lead Practitioner</span>
            <h2 className="text-3xl font-bold text-clinic-navy">Pritam Shaw</h2>
            <p className="mt-4 text-clinic-ink/70">
              Pritam founded Medio Physiotherapy after a decade working across
              sports medicine clinics and post-surgical rehabilitation units. Her approach
              blends precise manual therapy with practical, real-world movement retraining —
              so patients don't just feel better in the clinic, they move better everywhere else.
            </p>
            <p className="mt-4 text-clinic-ink/70">
              She leads a small team of therapists who share the same philosophy: recovery
              is a curve, not a switch, and every patient deserves a plan built around
              their specific body and goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="font-display text-lg font-semibold text-clinic-navy">
              Qualifications &amp; Certifications
            </h3>
            <ul className="mt-4 space-y-3">
              {CREDENTIALS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-clinic-ink/75">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-clinic-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-clinic-fog py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Our philosophy of care</span>
            <h2 className="text-3xl font-bold">Three principles behind every session</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-clinic-teal text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-clinic-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-clinic-ink/65">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
