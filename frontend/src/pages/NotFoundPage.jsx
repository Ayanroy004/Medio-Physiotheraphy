import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import RecoveryWave from '../components/ui/RecoveryWave.jsx';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <CompassIcon className="h-12 w-12 text-clinic-teal" />
      <h1 className="mt-6 font-display text-3xl font-bold text-clinic-navy">Page not found</h1>
      <p className="mt-2 text-clinic-ink/65">
        The page you're looking for may have moved. Let's get you back on track.
      </p>
      <RecoveryWave className="mt-6 h-12 w-48 text-clinic-teal/40" animated={false} />
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  );
}
