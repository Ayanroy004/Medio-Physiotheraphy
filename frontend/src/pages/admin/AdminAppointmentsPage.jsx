import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Search, ChevronLeft, ChevronRight, Check, X, CheckCheck } from 'lucide-react';
import { fetchAppointments, updateAppointmentStatus } from '../../services/appointmentApi.js';
import StatusBadge from '../../components/admin/StatusBadge.jsx';

const STATUS_OPTIONS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function AdminAppointmentsPage() {
  const [status, setStatus] = useState('All');
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const params = {
    page,
    limit: 8,
    ...(status !== 'All' && { status }),
    ...(date && { date }),
    ...(search && { search }),
  };

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'appointments', params],
    queryFn: () => fetchAppointments(params),
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, newStatus }) => updateAppointmentStatus(id, newStatus),
    onSuccess: () => {
      toast.success('Appointment updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'metrics'] });
    },
    onError: (error) => toast.error(error.message || 'Could not update appointment'),
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-clinic-navy">Appointments</h1>
      <p className="mt-1 text-sm text-clinic-ink/60">Review, confirm, and manage patient bookings.</p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-clinic-ink/40" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search patient, email, phone..."
            className="input-field w-64 pl-9"
          />
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setPage(1); }}
          className="input-field w-auto"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="input-field w-auto"
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-clinic-fog text-clinic-ink/60">
              <tr>
                <th className="px-5 py-3 font-medium">Patient</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Date &amp; Time</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-clinic-ink/50">Loading appointments...</td></tr>
              )}
              {!isLoading && data?.data?.map((appt) => (
                <tr key={appt._id} className="border-t border-clinic-border">
                  <td className="px-5 py-4 font-medium text-clinic-navy">{appt.patientName}</td>
                  <td className="px-5 py-4 text-clinic-ink/70">{appt.serviceId?.title || '—'}</td>
                  <td className="px-5 py-4 text-clinic-ink/70">
                    {new Date(appt.appointmentDate).toLocaleDateString()} · {appt.timeSlot}
                  </td>
                  <td className="px-5 py-4 text-clinic-ink/60">
                    <div>{appt.email}</div>
                    <div>{appt.phone}</div>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={appt.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      {appt.status !== 'Confirmed' && (
                        <button
                          title="Confirm"
                          onClick={() => changeStatus({ id: appt._id, newStatus: 'Confirmed' })}
                          className="rounded-md bg-clinic-sky/10 p-1.5 text-clinic-sky hover:bg-clinic-sky/20"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      {appt.status !== 'Completed' && (
                        <button
                          title="Mark Complete"
                          onClick={() => changeStatus({ id: appt._id, newStatus: 'Completed' })}
                          className="rounded-md bg-clinic-success/10 p-1.5 text-clinic-success hover:bg-clinic-success/20"
                        >
                          <CheckCheck className="h-4 w-4" />
                        </button>
                      )}
                      {appt.status !== 'Cancelled' && (
                        <button
                          title="Cancel"
                          onClick={() => changeStatus({ id: appt._id, newStatus: 'Cancelled' })}
                          className="rounded-md bg-clinic-danger/10 p-1.5 text-clinic-danger hover:bg-clinic-danger/20"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && data?.data?.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-clinic-ink/50">No appointments match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-clinic-border px-5 py-3 text-sm">
            <span className="text-clinic-ink/60">
              Page {data.page} of {data.totalPages} · {data.total} total
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-md border border-clinic-border p-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="rounded-md border border-clinic-border p-1.5 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
