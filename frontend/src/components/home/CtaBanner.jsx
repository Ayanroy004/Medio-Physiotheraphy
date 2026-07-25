import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import RecoveryWave from '../ui/RecoveryWave.jsx';

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-clinic-teal py-16">
      <RecoveryWave className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-white/10" strokeWidth={4} />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to move without limits?</h2>
        <p className="mt-4 text-white/80">
          Book your initial assessment today and let's build a recovery plan around your goals.
        </p>
        <Link
          to="/book"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-display font-semibold text-clinic-teal shadow-card transition-transform hover:scale-105"
        >
          <CalendarPlus className="h-5 w-5" />
          Book Your Appointment
        </Link>
      </div>
    </section>
  );
}
