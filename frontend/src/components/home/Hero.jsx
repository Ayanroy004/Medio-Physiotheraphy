import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarPlus, ShieldCheck, Star } from 'lucide-react';
import RecoveryWave from '../ui/RecoveryWave.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-clinic-navy">
      {/* Ambient background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,168,201,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,110,110,0.35),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow text-clinic-sky">Recovery, restored</span>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Every recovery has a curve.
            <span className="block text-clinic-sky">We help you find yours.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/75">
            Medio Physiotherapy blends hands-on manual therapy with personalized
            movement programs — so pain becomes progress, and progress becomes routine again.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* <Link to="/book" className="btn-primary">
              <CalendarPlus className="h-5 w-5" />
              Book Appointment
            </Link> */}
            <Link to="/services" className="btn-secondary btn-primary border-white/40 text-white hover:bg-white hover:text-clinic-navy">
              Explore Services
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-clinic-sky" />
              Licensed &amp; certified therapists
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-clinic-sky" />
              4.9/5 from 500+ patients
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-xl2 border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="section-eyebrow text-clinic-sky">Your recovery timeline</p>
            <RecoveryWave className="h-24 w-full text-clinic-sky" strokeWidth={3.5} />
            <div className="mt-4 flex justify-between text-xs font-mono uppercase tracking-wide text-white/50">
              <span>Day 1: Assessment</span>
              <span>Week 4: Rebuilding</span>
              <span>Week 8: Back to full strength</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
