import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import FaqAccordion from '../components/ui/FaqAccordion.jsx';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // NOTE: Wire this up to a /api/contact endpoint or a transactional email
  // service (e.g. Resend, SendGrid) in production. For now it simulates a submit.
  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Message sent! We'll get back to you within one business day.");
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Get in touch</span>
        <h1 className="text-4xl font-bold">Contact &amp; Frequently Asked Questions</h1>
        <p className="mt-4 text-clinic-ink/70">
          Have a question before booking? Send us a message, or check the FAQ below —
          it covers insurance, referrals, and what to expect at your first visit.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* Contact form */}
        <div className="card">
          <h2 className="font-display text-xl font-semibold text-clinic-navy">Send us a message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div>
              <label className="input-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                className="input-field"
                placeholder="Jane Doe"
                {...register('name', { required: 'Please enter your name' })}
              />
              {errors.name && <p className="mt-1 text-xs text-clinic-danger">{errors.name.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="input-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="jane@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-clinic-danger">{errors.email.message}</p>}
              </div>
              <div>
                <label className="input-label" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="input-field"
                  placeholder="+91 98765 43210"
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <p className="mt-1 text-xs text-clinic-danger">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                className="input-field resize-none"
                placeholder="Tell us a bit about what you're looking for..."
                {...register('message', { required: 'Please enter a message' })}
              />
              {errors.message && <p className="mt-1 text-xs text-clinic-danger">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Info + FAQ */}
        <div className="space-y-8">
          <div className="card">
            <h2 className="font-display text-xl font-semibold text-clinic-navy">Clinic Information</h2>
            <ul className="mt-5 space-y-4 text-sm text-clinic-ink/75">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" /> 24 Riverside Lane, Kolkata, West Bengal 700001</li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" /> +91 98765 43210</li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" /> care@vitalityphysio.com</li>
              <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-clinic-teal" /> Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM · Sun Closed</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="font-display text-xl font-semibold text-clinic-navy">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
