import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Clock } from 'lucide-react';
import { fetchAvailability } from '../../services/appointmentApi.js';

// Build the next 14 days (excluding Sundays) as bookable dates
function getUpcomingDates() {
  const dates = [];
  const today = new Date();
  let cursor = new Date(today);
  while (dates.length < 14) {
    if (cursor.getDay() !== 0) {
      dates.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export default function DateTimeStep({ date, timeSlot, onChangeDate, onChangeTimeSlot, onBack, onNext }) {
  const dates = useMemo(() => getUpcomingDates(), []);
  const isoDate = date ? date.toISOString().split('T')[0] : null;

  const { data, isLoading } = useQuery({
    queryKey: ['availability', isoDate],
    queryFn: () => fetchAvailability(isoDate),
    enabled: !!isoDate,
  });

  return (
    <div>
      <h2 className="text-center font-display text-2xl font-bold text-clinic-navy">
        Pick a date and time
      </h2>
      <p className="mt-2 text-center text-sm text-clinic-ink/60">
        Sessions run Monday through Saturday. Slots update in real time.
      </p>

      <div className="mt-8">
        <p className="input-label flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Select a date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => {
            const active = isoDate === d.toISOString().split('T')[0];
            return (
              <button
                key={d.toISOString()}
                onClick={() => {
                  onChangeDate(d);
                  onChangeTimeSlot(null);
                }}
                className={`flex min-w-[72px] flex-col items-center rounded-xl border-2 px-3 py-2 transition-colors ${
                  active ? 'border-clinic-teal bg-clinic-teal text-white' : 'border-clinic-border hover:border-clinic-teal/40'
                }`}
              >
                <span className="text-xs uppercase">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                <span className="font-display text-lg font-bold">{d.getDate()}</span>
                <span className="text-xs">{d.toLocaleDateString(undefined, { month: 'short' })}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isoDate && (
        <div className="mt-8">
          <p className="input-label flex items-center gap-2"><Clock className="h-4 w-4" /> Available time slots</p>

          {isLoading && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-lg bg-clinic-fog" />
              ))}
            </div>
          )}

          {!isLoading && data && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {data.available.length === 0 && (
                <p className="col-span-full text-sm text-clinic-ink/60">
                  No slots left on this date — please choose another day.
                </p>
              )}
              {data.available.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onChangeTimeSlot(slot)}
                  className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                    timeSlot === slot
                      ? 'border-clinic-teal bg-clinic-teal text-white'
                      : 'border-clinic-border hover:border-clinic-teal/40'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button
          onClick={onNext}
          disabled={!date || !timeSlot}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
