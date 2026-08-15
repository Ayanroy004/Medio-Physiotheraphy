import { useForm } from "react-hook-form";
import {
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Phone,
} from "lucide-react";
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
    <div
      className="
        mx-auto
        max-w-7xl
        px-4
        py-12
        sm:px-6
        sm:py-16
        md:py-20
        lg:px-8
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow text-xs sm:text-sm">
          Get in touch
        </span>

        <h1
          className="
            mt-1
            text-[1.8rem]
            font-bold
            leading-[1.15]
            tracking-tight
            text-clinic-ink
            sm:text-3xl
            md:text-4xl
          "
        >
          Contact &amp; Frequently Asked Questions
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-[14px]
            leading-6
            text-clinic-ink/70
            sm:text-base
            sm:leading-7
          "
        >
          Have a question before booking? Get in touch with us directly or
          check the FAQ below.
        </p>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
        className="
          mt-9
          grid
          gap-6
          sm:mt-10
          sm:gap-8
          lg:grid-cols-2
          lg:gap-10
        "
      >
        {/* ===================================================
            CONTACT FORM
        ==================================================== */}
        <div className="card p-4 sm:p-6">
          <h2
            className="
              font-display
              text-lg
              font-semibold
              text-clinic-navy
              sm:text-xl
            "
          >
            Contact Us
          </h2>

          <p
            className="
              mt-2
              text-[13px]
              leading-5
              text-clinic-ink/60
              sm:text-sm
              sm:leading-6
            "
          >
            Enter your name and choose how you would like to contact us.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
          >
            {/* Name */}
            <div>
              <label
                className="input-label"
                htmlFor="name"
              >
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
              className="
                flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#25D366]
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#20bd5a]
                focus:outline-none
                focus:ring-2
                focus:ring-[#25D366]
                focus:ring-offset-2
                sm:text-base
              "
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              Contact on WhatsApp
            </button>

            {/* Call */}
            <a
              href="tel:6295905185"
              className="
                flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-clinic-teal
                px-5
                py-3
                text-sm
                font-medium
                text-clinic-teal
                transition
                hover:bg-clinic-teal
                hover:text-white
                sm:text-base
              "
            >
              <Phone className="h-5 w-5 shrink-0" />
              Call Us
            </a>
          </form>
        </div>

        {/* ===================================================
            INFORMATION + FAQ
        ==================================================== */}
        <div className="space-y-6 sm:space-y-8">
          {/* Clinic Information */}
          <div className="card p-4 sm:p-6">
            <h2
              className="
                font-display
                text-lg
                font-semibold
                text-clinic-navy
                sm:text-xl
              "
            >
              Clinic Information
            </h2>

            <ul
              className="
                mt-4
                space-y-3.5
                text-[13px]
                leading-5
                text-clinic-ink/75
                sm:mt-5
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
                  +91 6295 905185
                </a>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2.5 sm:gap-3">
                <Mail
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
                  href="mailto:care@vitalityphysio.com"
                  className="
                    break-all
                    transition
                    hover:text-clinic-teal
                  "
                >
                  care@vitalityphysio.com
                </a>
              </li>

              {/* Hours */}
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
                  Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM · Sun Closed
                </span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="card p-4 sm:p-6">
            <h2
              className="
                font-display
                text-lg
                font-semibold
                text-clinic-navy
                sm:text-xl
              "
            >
              Frequently Asked Questions
            </h2>

            <div className="mt-3 sm:mt-4">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}