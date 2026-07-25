import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Stethoscope, IndianRupee } from 'lucide-react';

export default function ConfirmationStep({ appointment }) {
  if (!appointment) return null;

  const dateLabel = new Date(appointment.appointmentDate).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-lg text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clinic-success/10">
        <CheckCircle2 className="h-9 w-9 text-clinic-success" />
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold text-clinic-navy">
        Appointment request received!
      </h2>
      <p className="mt-2 text-sm text-clinic-ink/65">
        A confirmation has been sent to <span className="font-medium">{appointment.email}</span>.
        Our team will confirm your slot shortly.
      </p>

      <div className="mt-8 space-y-4 rounded-xl2 border border-clinic-border bg-white p-6 text-left shadow-card">
        <div className="flex items-center gap-3 text-sm">
          <Stethoscope className="h-5 w-5 text-clinic-teal" />
          <span className="font-medium text-clinic-navy">{appointment.serviceId?.title}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-5 w-5 text-clinic-teal" />
          {dateLabel}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-5 w-5 text-clinic-teal" />
          {appointment.timeSlot} · {appointment.serviceId?.durationMinutes} minutes
        </div>
        <div className="flex items-center gap-3 text-sm">
          <IndianRupee className="h-5 w-5 text-clinic-teal" />
          {appointment.serviceId?.price} due at time of visit
        </div>
        <div className="border-t border-clinic-border pt-4 text-xs uppercase tracking-wide text-clinic-warn">
          Status: {appointment.status}
        </div>
      </div>

      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back to Home
      </Link>
    </motion.div>
  );
}
