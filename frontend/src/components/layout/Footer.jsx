import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from '../ui/Logo.jsx';

export default function Footer() {
  return (
    <footer className="bg-clinic-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Evidence-based physiotherapy care focused on getting you back to the movements
            you love — safely, and for good.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white/90">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-white">Our Services</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            {/* <li><Link to="/book" className="hover:text-white">Book Appointment</Link></li> */}
            <li><Link to="/contact" className="hover:text-white">Contact &amp; FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white/90">
            Clinic Hours
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Mon – Fri: 8:00 AM – 6:00 PM</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Saturday: 9:00 AM – 2:00 PM</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Sunday: Closed</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white/90">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Station Rd, Boinchi, Batika, West Bengal 712134</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 6295 905185</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> care@vitalityphysio.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Vitality Physiotherapy Clinic. All rights reserved.
      </div>
    </footer>
  );
}
