import { motion } from "framer-motion";
import { GraduationCap, Users, Clock3, Sparkles } from "lucide-react";
const POINTS = [
  {
    icon: GraduationCap,
    title: "Qualified & Experienced Therapists",
    text: "Our physiotherapists use their clinical knowledge and experience to understand your condition and provide appropriate care.",
  },
  {
    icon: Users,
    title: "Personalized Care",
    text: "Every patient is different. We create treatment plans based on your condition, needs, comfort, and recovery goals.",
  },
  {
    icon: Clock3,
    title: "Treatment at Your Pace",
    text: "Session duration and treatment intensity may vary depending on your condition, progress, and individual treatment requirements.",
  },
  {
    icon: Sparkles,
    title: "Evidence-Based Treatment",
    text: "We use practical, evidence-based physiotherapy techniques and exercises to support recovery and improve movement.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-clinic-fog py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Why patients choose us</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Expertise you can feel in the first session
          </h2>
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
              <h3 className="mt-4 font-display text-lg font-semibold text-clinic-navy">
                {point.title}
              </h3>
              <p className="mt-2 text-sm text-clinic-ink/65">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
