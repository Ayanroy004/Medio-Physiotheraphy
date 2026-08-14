import { useForm } from "react-hook-form";
import { Mail, MapPin, Clock, MessageCircle, Phone } from "lucide-react";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const whatsappNumber = "6295905185";

    const message = `Hello Vitality Physiotherapy Clinic,

My name is ${values.name}.

I would like to know more about your physiotherapy services.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Get in touch</span>

        <h1 className="text-4xl font-bold">
          Contact &amp; Frequently Asked Questions
        </h1>

        <p className="mt-4 text-clinic-ink/70">
          Have a question before booking? Get in touch with us directly or check
          the FAQ below.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* Contact */}
        <div className="card">
          <h2 className="font-display text-xl font-semibold text-clinic-navy">
            Contact Us
          </h2>

          <p className="mt-2 text-sm text-clinic-ink/60">
            Enter your name and choose how you would like to contact us.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="input-label" htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                className="input-field"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Please enter your name",
                })}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-clinic-danger">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-medium text-white transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <MessageCircle className="h-5 w-5" />
              Contact on WhatsApp
            </button>

            {/* Call */}
            <a
              href="tel:+919876543210"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-clinic-teal px-5 py-3 font-medium text-clinic-teal transition hover:bg-clinic-teal hover:text-white"
            >
              <Phone className="h-5 w-5" />
              Call Us
            </a>
          </form>
        </div>

        {/* Info + FAQ */}
        <div className="space-y-8">
          <div className="card">
            <h2 className="font-display text-xl font-semibold text-clinic-navy">
              Clinic Information
            </h2>

            <ul className="mt-5 space-y-4 text-sm text-clinic-ink/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
                Station Rd, Boinchi, Batika, West Bengal 712134
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
                +91 6295 905185
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
                care@vitalityphysio.com
              </li>

              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" />
                Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM · Sun Closed
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="font-display text-xl font-semibold text-clinic-navy">
              Frequently Asked Questions
            </h2>

            <div className="mt-4">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
