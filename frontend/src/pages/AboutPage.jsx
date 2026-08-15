import { motion } from "framer-motion";
import { GraduationCap, Award, HeartHandshake } from "lucide-react";
import RecoveryWave from "../components/ui/RecoveryWave.jsx";

const CREDENTIALS = [
  "Doctor of Physical Therapy (DPT) — Manipal Academy of Higher Education",
  "Certified Orthopedic Manual Therapist (COMT)",
  "Sports Physiotherapy Fellowship — Indian Association of Physiotherapists",
  "12+ years treating post-operative and sports-related injuries",
];

const VALUES = [
  {
    icon: GraduationCap,
    title: "Clinical Rigor",
    text: "Every treatment plan is grounded in current research and re-evaluated as your body responds.",
  },
  {
    icon: HeartHandshake,
    title: "Whole-Person Care",
    text: "We treat the person, not just the joint — factoring in sleep, stress, and daily movement habits.",
  },
  {
    icon: Award,
    title: "Measurable Progress",
    text: "We track range of motion, strength, and pain scores at every visit so progress is never a guess.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        className="
          bg-clinic-navy
          px-4
          py-14
          text-white
          sm:px-6
          sm:py-20
          lg:px-8
        "
      >
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow text-xs text-clinic-sky sm:text-sm">
            About Vitality
          </span>

          <h1
            className="
              mx-auto
              mt-2
              max-w-3xl
              text-[2rem]
              font-bold
              leading-[1.15]
              tracking-tight
              text-stone-300
              sm:text-4xl
              md:text-5xl
            "
          >
            Care led by clinicians,{" "}
            <span className="text-clinic-sky">not checklists</span>
          </h1>

          <RecoveryWave
            className="
              mx-auto
              mt-6
              h-10
              w-52
              text-clinic-sky
              sm:mt-8
              sm:h-14
              sm:w-64
            "
            strokeWidth={3}
          />
        </div>
      </section>

      {/* =====================================================
          LEAD PRACTITIONER
      ====================================================== */}
      <section
        className="
          mx-auto
          max-w-5xl
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
        "
      >
        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            md:items-center
            md:gap-10
            lg:gap-12
          "
        >
          {/* Practitioner Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow text-xs sm:text-sm">
              Lead Practitioner
            </span>

            <h2
              className="
                mt-1
                text-2xl
                font-bold
                leading-tight
                text-clinic-navy
                sm:text-3xl
              "
            >
              Pritam Shaw
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-clinic-ink/70
                sm:text-base
                sm:leading-7
              "
            >
              Pritam founded Medio Physiotherapy after a decade working across
              sports medicine clinics and post-surgical rehabilitation units.
              Her approach blends precise manual therapy with practical,
              real-world movement retraining — so patients don't just feel
              better in the clinic, they move better everywhere else.
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-clinic-ink/70
                sm:text-base
                sm:leading-7
              "
            >
              She leads a small team of therapists who share the same
              philosophy: recovery is a curve, not a switch, and every patient
              deserves a plan built around their specific body and goals.
            </p>
          </motion.div>

          {/* Qualifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              card
              p-4
              sm:p-6
            "
          >
            <h3
              className="
                font-display
                text-base
                font-semibold
                leading-6
                text-clinic-navy
                sm:text-lg
              "
            >
              Qualifications &amp; Certifications
            </h3>

            <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
              {CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="
                    flex
                    items-start
                    gap-2.5
                    text-[13px]
                    leading-5
                    text-clinic-ink/75
                    sm:gap-3
                    sm:text-sm
                    sm:leading-6
                  "
                >
                  <Award
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-clinic-teal
                    "
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}
      <section
        className="
          bg-clinic-fog
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
        "
      >
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow text-xs sm:text-sm">
              Our philosophy of care
            </span>

            <h2
              className="
                mt-1
                text-[1.75rem]
                font-bold
                leading-[1.15]
                tracking-tight
                text-clinic-ink
                sm:text-3xl
              "
            >
              Three principles behind every session
            </h2>
          </div>

          {/* Values */}
          <div
            className="
              mt-8
              grid
              gap-7
              sm:mt-10
              sm:grid-cols-2
              sm:gap-8
              md:grid-cols-3
            "
          >
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="
                    text-center
                    sm:px-2
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-clinic-teal
                      text-white
                      sm:h-14
                      sm:w-14
                      sm:rounded-2xl
                    "
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3
                    className="
                      mt-3
                      font-display
                      text-base
                      font-semibold
                      text-clinic-navy
                      sm:mt-4
                      sm:text-lg
                    "
                  >
                    {value.title}
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-1.5
                      max-w-sm
                      text-[13px]
                      leading-5
                      text-clinic-ink/65
                      sm:mt-2
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
