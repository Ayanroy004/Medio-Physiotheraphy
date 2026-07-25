const STYLES = {
  Pending: 'bg-clinic-warn/10 text-clinic-warn',
  Confirmed: 'bg-clinic-sky/10 text-clinic-sky',
  Completed: 'bg-clinic-success/10 text-clinic-success',
  Cancelled: 'bg-clinic-danger/10 text-clinic-danger',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] || 'bg-clinic-fog text-clinic-ink/60'}`}>
      {status}
    </span>
  );
}
