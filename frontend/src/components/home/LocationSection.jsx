import { MapPin, Phone, Clock } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="bg-clinic-fog py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <span className="section-eyebrow">Visit the clinic</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Find us in the heart of the city</h2>
          <p className="mt-4 text-clinic-ink/70">
            Our ground-floor clinic is fully wheelchair accessible with dedicated patient
            parking right outside.
          </p>

          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
              24 Riverside Lane, Kolkata, West Bengal 700001
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
              +91 98765 43210
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
              Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM
            </li>
          </ul>
        </div>

        {/* Google Map placeholder — swap the src with a real embed URL in production */}
        <div className="overflow-hidden rounded-xl2 border border-clinic-border shadow-card">
          <iframe
            title="Vitality Physiotherapy Clinic Location"
            className="h-80 w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Kolkata,West+Bengal&output=embed"
          />
        </div>
      </div>
    </section>
  );
}
