import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from '../../components/ui/Logo.jsx';

export default function AdminLoginPage() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!loading && user) return <Navigate to="/admin" replace />;

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await login(values);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-clinic-navy px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold text-clinic-navy">
          Staff &amp; Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-clinic-ink/60">
          Sign in to manage appointments and services.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="admin@vitalityphysio.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="mt-1 text-xs text-clinic-danger">{errors.email.message}</p>}
          </div>
          <div>
            <label className="input-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="mt-1 text-xs text-clinic-danger">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            <LogIn className="h-4 w-4" />
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
