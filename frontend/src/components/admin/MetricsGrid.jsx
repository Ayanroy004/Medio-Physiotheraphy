import { CalendarClock, Users, Hourglass, ListChecks } from 'lucide-react';

const CONFIG = [
  { key: 'todayCount', label: "Today's Appointments", icon: CalendarClock, color: 'bg-clinic-teal' },
  { key: 'pendingCount', label: 'Pending Approvals', icon: Hourglass, color: 'bg-clinic-warn' },
  { key: 'totalPatients', label: 'Total Patients', icon: Users, color: 'bg-clinic-navy' },
  { key: 'totalAppointments', label: 'All-Time Appointments', icon: ListChecks, color: 'bg-clinic-sky' },
];

export default function MetricsGrid({ metrics, isLoading }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CONFIG.map((item) => (
        <div key={item.key} className="card">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color} text-white`}>
            <item.icon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm text-clinic-ink/60">{item.label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-clinic-navy">
            {isLoading ? '—' : metrics?.[item.key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
