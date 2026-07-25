import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchMetrics, fetchAppointments } from '../../services/appointmentApi.js';
import MetricsGrid from '../../components/admin/MetricsGrid.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';

export default function AdminDashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: fetchMetrics,
  });

  const { data: recent, isLoading: recentLoading } = useQuery({
    queryKey: ['admin', 'appointments', 'recent'],
    queryFn: () => fetchAppointments({ page: 1, limit: 5 }),
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-clinic-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-clinic-ink/60">A quick look at how the clinic is running today.</p>

      <div className="mt-6">
        <MetricsGrid metrics={metrics} isLoading={metricsLoading} />
      </div>

      <div className="mt-8 card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-clinic-navy">Recent Bookings</h2>
          <Link to="/admin/appointments" className="text-sm font-medium text-clinic-teal hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-clinic-border text-clinic-ink/50">
                <th className="pb-2 pr-4 font-medium">Patient</th>
                <th className="pb-2 pr-4 font-medium">Service</th>
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLoading && (
                <tr><td colSpan={4} className="py-6 text-center text-clinic-ink/50">Loading...</td></tr>
              )}
              {!recentLoading && recent?.data?.map((appt) => (
                <tr key={appt._id} className="border-b border-clinic-border/60 last:border-0">
                  <td className="py-3 pr-4 font-medium text-clinic-navy">{appt.patientName}</td>
                  <td className="py-3 pr-4 text-clinic-ink/70">{appt.serviceId?.title}</td>
                  <td className="py-3 pr-4 text-clinic-ink/70">
                    {new Date(appt.appointmentDate).toLocaleDateString()} · {appt.timeSlot}
                  </td>
                  <td className="py-3"><StatusBadge status={appt.status} /></td>
                </tr>
              ))}
              {!recentLoading && recent?.data?.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-clinic-ink/50">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
