import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Stethoscope, LogOut, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../ui/Logo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  // { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/services', label: 'Services', icon: Stethoscope },
  // { to: '/admin/add-member', label: 'Add Member', icon: UserPlus },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-clinic-teal text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-clinic-mist">
      <aside className="hidden w-64 shrink-0 flex-col bg-clinic-navy px-4 py-6 md:flex">
        <div className="px-2">
          <Logo dark />
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-4">
          <p className="px-2 text-xs text-white/50">Signed in as</p>
          <p className="px-2 text-sm font-medium text-white">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-clinic-border bg-white px-6 py-4 md:hidden">
          <Logo />
          <button onClick={handleLogout} className="text-sm font-medium text-clinic-danger">
            Log Out
          </button>
        </header>
        <main className="p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
