import { useForm } from 'react-hook-form';

const CATEGORIES = [
  'Sports Rehab',
  'Post-Op Recovery',
  'Chronic Pain',
  'Neurological',
  'Pediatric',
  'Geriatric Care',
  'Manual Therapy',
];

const ICONS = ['Activity', 'Dumbbell', 'HeartPulse', 'Brain', 'Hand', 'PersonStanding', 'Stethoscope'];

export default function ServiceForm({ defaultValues, onSubmit, onCancel, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="input-label" htmlFor="title">Title</label>
        <input
          id="title"
          className="input-field"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="mt-1 text-xs text-clinic-danger">{errors.title.message}</p>}
      </div>

      <div>
        <label className="input-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          className="input-field resize-none"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="mt-1 text-xs text-clinic-danger">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="input-label" htmlFor="durationMinutes">Duration (minutes)</label>
          <input
            id="durationMinutes"
            type="number"
            className="input-field"
            {...register('durationMinutes', { required: true, valueAsNumber: true, min: 10, max: 240 })}
          />
        </div>
        <div>
          <label className="input-label" htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            className="input-field"
            {...register('price', { required: true, valueAsNumber: true, min: 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="input-label" htmlFor="category">Category</label>
          <select id="category" className="input-field" {...register('category', { required: true })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="input-label" htmlFor="icon">Icon</label>
          <select id="icon" className="input-field" {...register('icon')}>
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Service'}
        </button>
      </div>
    </form>
  );
}
