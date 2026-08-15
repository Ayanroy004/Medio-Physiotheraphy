import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import RecoveryWave from '../ui/RecoveryWave.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-clinic-navy">
      {/* Ambient background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,168,201,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,110,110,0.35),transparent_50%)]" />

      <div
        className="
          relative mx-auto grid max-w-7xl
          grid-cols-1
          gap-9
          px-4 py-12
          sm:gap-12 sm:px-6 sm:py-16
          md:grid-cols-2 md:items-center md:gap-12 md:py-24
          lg:px-8 lg:py-28
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="min-w-0"
        >
          {/* Eyebrow */}
          <span className="section-eyebrow text-clinic-sky text-xs sm:text-sm">
            Recovery, restored
          </span>

          {/* Heading */}
          <h1
            className="
              mt-2
              max-w-xl
              text-[2rem]
              font-bold
              leading-[1.12]
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Every recovery has a curve.
            <span className="mt-1 block text-clinic-sky">
              We help you find yours.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-lg
              text-[15px]
              leading-6
              text-white/75
              sm:mt-6
              sm:text-base
              sm:leading-7
              md:text-lg
            "
          >
            Medio Physiotherapy blends hands-on manual therapy with
            personalized movement programs — so pain becomes progress, and
            progress becomes routine again.
          </p>

          {/* CTA */}
          <div className="mt-7 sm:mt-8">
            <Link
              to="/services"
              className="
                btn-secondary btn-primary
                inline-flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                border-white/40
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-white
                hover:text-clinic-navy
                sm:w-auto
                sm:px-7
                sm:text-base
              "
            >
              Explore Services
            </Link>
          </div>

          {/* Trust Points */}
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-4
              text-sm
              text-white/70
              sm:mt-10
              sm:grid-cols-2
              sm:gap-5
              md:grid-cols-1
              lg:grid-cols-2
              lg:gap-6
            "
          >
            {/* Therapist */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clinic-sky/10">
                <ShieldCheck className="h-5 w-5 text-clinic-sky" />
              </div>

              <span className="leading-5">
                Licensed &amp; certified therapists
              </span>
            </div>

            {/* Rating */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clinic-sky/10">
                <Star className="h-5 w-5 text-clinic-sky" />
              </div>

              <span className="leading-5">
                4.9/5 from 500+ patients
              </span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT RECOVERY TIMELINE
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
            delay: 0.15,
          }}
          className="relative min-w-0"
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-xl2
              border
              border-white/10
              bg-white/5
              p-5
              shadow-lg
              backdrop-blur
              sm:p-7
              md:p-8
            "
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3">
              <p className="section-eyebrow text-xs text-clinic-sky sm:text-sm">
                Your recovery timeline
              </p>

              <div className="hidden h-2 w-2 shrink-0 rounded-full bg-clinic-sky sm:block" />
            </div>

            {/* Recovery Wave */}
            <div className="mt-5 w-full overflow-hidden sm:mt-6">
              <RecoveryWave
                className="
                  h-20
                  w-full
                  text-clinic-sky
                  sm:h-24
                  md:h-28
                "
                strokeWidth={3.5}
              />
            </div>

            {/* Timeline */}
            <div
              className="
                mt-4
                grid
                grid-cols-3
                gap-2
                border-t
                border-white/10
                pt-4
                text-[9px]
                font-mono
                uppercase
                leading-4
                tracking-wide
                text-white/50
                sm:mt-5
                sm:pt-5
                sm:text-[10px]
                sm:leading-5
                md:text-xs
              "
            >
              {/* Day 1 */}
              <div className="min-w-0 text-left">
                <span className="block font-semibold text-white/60">
                  Day 1
                </span>
                <span className="block">Assessment</span>
              </div>

              {/* Week 4 */}
              <div className="min-w-0 text-center">
                <span className="block font-semibold text-white/60">
                  Week 4
                </span>
                <span className="block">Rebuilding</span>
              </div>

              {/* Week 8 */}
              <div className="min-w-0 text-right">
                <span className="block font-semibold text-white/60">
                  Week 8
                </span>
                <span className="block">Full strength</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}