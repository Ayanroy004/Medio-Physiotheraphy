import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, CalendarPlus } from 'lucide-react';
import Logo from '../ui/Logo.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact & FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-clinic-teal ${
      isActive ? 'text-clinic-teal' : 'text-clinic-ink/70'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-clinic-border bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <NavLink to="/book" className="btn-primary text-sm">
            <CalendarPlus className="h-4 w-4" />
            Book Appointment
          </NavLink>
        </div>

        <button
          className="rounded-md p-2 text-clinic-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-clinic-border bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => setOpen(false)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/book" className="btn-primary justify-center text-sm" onClick={() => setOpen(false)}>
              <CalendarPlus className="h-4 w-4" />
              Book Appointment
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
