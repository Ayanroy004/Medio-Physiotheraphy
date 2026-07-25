import { useForm } from 'react-hook-form';

export default function DetailsStep({ defaultValues, onBack, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <div>
      <h2 className="text-center font-display text-2xl font-bold text-clinic-navy">
        Tell us about yourself
      </h2>
      <p className="mt-2 text-center text-sm text-clinic-ink/60">
        We'll use these details to confirm your appointment and prepare for your visit.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-lg space-y-5">
        <div>
          <label className="input-label" htmlFor="patientName">Full Name</label>
          <input
            id="patientName"
            className="input-field"
            placeholder="Jane Doe"
            {...register('patientName', { required: 'Your name is required' })}
          />
          {errors.patientName && <p className="mt-1 text-xs text-clinic-danger">{errors.patientName.message}</p>}
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
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9+\-\s()]{7,20}$/, message: 'Enter a valid phone number' },
              })}
            />
            {errors.phone && <p className="mt-1 text-xs text-clinic-danger">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="input-label" htmlFor="medicalNotes">
            Briefly describe your pain or injury <span className="text-clinic-ink/40">(optional)</span>
          </label>
          <textarea
            id="medicalNotes"
            rows={4}
            className="input-field resize-none"
            placeholder="e.g. Lower back pain for 3 weeks, worse when sitting..."
            {...register('medicalNotes', { maxLength: { value: 1500, message: 'Please keep this under 1500 characters' } })}
          />
          {errors.medicalNotes && <p className="mt-1 text-xs text-clinic-danger">{errors.medicalNotes.message}</p>}
        </div>

        <div className="flex justify-between pt-2">
          <button type="button" onClick={onBack} className="btn-secondary">Back</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
