import { Link } from 'react-router-dom';
import RecoveryWave from './RecoveryWave.jsx';

export default function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <span className={`relative flex h-9 w-9 items-center justify-center rounded-full ${dark ? 'bg-white/10' : 'bg-clinic-teal/10'}`}>
        <RecoveryWave
          className={`h-4 w-6 ${dark ? 'text-white' : 'text-clinic-teal'}`}
          animated={false}
          strokeWidth={5}
        />
      </span>
      <span className={`font-display text-lg font-bold leading-none ${dark ? 'text-white' : 'text-clinic-navy'}`}>
        Vitality
        <span className={`block text-[0.65rem] font-normal tracking-[0.25em] uppercase ${dark ? 'text-white/60' : 'text-clinic-teal'}`}>
          Physiotherapy
        </span>
      </span>
    </Link>
  );
}
