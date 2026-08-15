import { MapPin, Phone, Clock } from "lucide-react";

export default function LocationSection() {
  return (
    <section
      className="
        bg-clinic-fog
        px-4
        py-12
        sm:px-6
        sm:py-16
        md:py-20
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-7
          md:grid-cols-2
          md:items-center
          md:gap-10
        "
      >
        {/* Clinic Information */}
        <div>
          <span className="section-eyebrow text-xs sm:text-sm">
            Visit the clinic
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
              md:text-4xl
            "
          >
            Find us in the heart of the city
          </h2>

          <p
            className="
              mt-4
              max-w-xl
              text-[14px]
              leading-6
              text-clinic-ink/70
              sm:text-base
              sm:leading-7
            "
          >
            Our ground-floor clinic is fully wheelchair accessible with
            dedicated patient parking right outside.
          </p>

          <ul
            className="
              mt-5
              space-y-3.5
              text-[13px]
              leading-5
              text-clinic-ink/80
              sm:mt-6
              sm:space-y-4
              sm:text-sm
              sm:leading-6
            "
          >
            {/* Address */}
            <li className="flex items-start gap-2.5 sm:gap-3">
              <MapPin
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-clinic-teal
                  sm:h-5
                  sm:w-5
                "
              />

              <span>
                Station Rd, Boinchi, Batika, West Bengal 712134
              </span>
            </li>

            {/* Phone */}
            <li className="flex items-start gap-2.5 sm:gap-3">
              <Phone
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-clinic-teal
                  sm:h-5
                  sm:w-5
                "
              />

              <a
                href="tel:+916295905185"
                className="transition hover:text-clinic-teal"
              >
                +91 6295905185
              </a>
            </li>

            {/* Opening Hours */}
            <li className="flex items-start gap-2.5 sm:gap-3">
              <Clock
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-clinic-teal
                  sm:h-5
                  sm:w-5
                "
              />

              <span>
                Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM
              </span>
            </li>
          </ul>
        </div>

        {/* Google Map */}
        <div
          className="
            overflow-hidden
            rounded-xl2
            border
            border-clinic-border
            shadow-card
          "
        >
          <iframe
            title="Vitality Physiotherapy Clinic Location"
            className="
              h-64
              w-full
              grayscale-[15%]
              sm:h-72
              md:h-80
            "
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.5617192988857!2d88.1947293747731!3d23.121239112640108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8f734976d4ce7%3A0xffdf5345ddb97f49!2sMedio%20Physiotheraphy%20Center!5e1!3m2!1sen!2sin!4v1786714549823!5m2!1sen!2sin"
          />
        </div>
      </div>
    </section>
  );
}