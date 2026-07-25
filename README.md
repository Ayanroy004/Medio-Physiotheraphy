# Vitality Physiotherapy Clinic — Full-Stack Web App

A production-ready MERN application for a physiotherapy clinic: a public
patient-facing marketing site with an interactive booking flow, and a
protected admin dashboard for managing appointments and services.

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React (Vite), Tailwind CSS, Framer Motion, Lucide React, TanStack Query, React Hook Form, React Router |
| Backend    | Node.js, Express.js (modular MVC-style structure) |
| Database   | MongoDB + Mongoose |
| Auth       | JWT (httpOnly cookie + Bearer token fallback), bcrypt password hashing |

## Project Structure

```
physio-clinic/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # business logic (auth, service, appointment, testimonial)
│   ├── middleware/         # auth, error handling, express-validator rules
│   ├── models/             # User, Service, Appointment, Testimonial
│   ├── routes/             # Express routers per resource
│   ├── utils/seed.js        # seeds an admin user + sample services/testimonials
│   ├── app.js               # Express app (middleware + routes)
│   ├── server.js             # entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/      # Navbar, Footer
    │   │   ├── home/        # Hero, ServicesOverview, WhyChooseUs, Testimonials, Location, CTA
    │   │   ├── booking/      # Multi-step booking flow components
    │   │   ├── admin/       # AdminLayout, MetricsGrid, ServiceForm, StatusBadge, ProtectedRoute
    │   │   └── ui/           # Logo, RecoveryWave (brand mark), Modal, FaqAccordion
    │   ├── pages/            # Public pages + pages/admin/*
    │   ├── services/         # Axios API modules (one per resource)
    │   ├── context/AuthContext.jsx
    │   ├── App.jsx / main.jsx / index.css
    └── .env.example
```

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set at minimum:
- `MONGO_URI` — your MongoDB connection string (local or Atlas)
- `JWT_SECRET` — a long random string
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — credentials for the admin account the seed script creates

Seed the database with an admin user, sample services, and testimonials:

```bash
npm run seed
```

Start the API (with auto-reload):

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

### Key API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|--------------|
| POST | `/api/auth/login` | Public | Staff/admin login |
| GET  | `/api/auth/me` | Private | Current logged-in user |
| GET  | `/api/services` | Public | List active services |
| POST | `/api/services` | Private (admin/therapist) | Create service |
| PUT  | `/api/services/:id` | Private | Update service |
| DELETE | `/api/services/:id` | Private (admin) | Delete service |
| POST | `/api/appointments` | Public | Book an appointment |
| GET  | `/api/appointments/availability?date=` | Public | Get open time slots for a date |
| GET  | `/api/appointments` | Private | List/filter/paginate bookings |
| PATCH | `/api/appointments/:id/status` | Private | Confirm / Complete / Cancel |
| GET  | `/api/appointments/metrics` | Private | Dashboard summary counts |
| GET  | `/api/testimonials?featured=true` | Public | Featured testimonials |

## 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Confirm `VITE_API_URL` points at your running backend (defaults to
`http://localhost:5000/api`).

```bash
npm run dev
```

The site runs on `http://localhost:5173`.

- Public site: `/`, `/services`, `/about`, `/contact`, `/book`
- Admin login: `/admin/login` (use the seeded admin credentials)
- Admin dashboard: `/admin`, `/admin/appointments`, `/admin/services`

## Design System Notes

The UI uses a custom "clinical trust" palette (`clinic-navy`, `clinic-teal`,
`clinic-sky`, `clinic-mist`, `clinic-fog`) defined in `tailwind.config.js`,
paired with Sora (display) + Inter (body) + IBM Plex Mono (data/labels).

The signature visual motif is the **Recovery Wave** — a line that dips low
then climbs in a controlled curve, symbolizing the injury-to-recovery
journey. It appears in the logo, the homepage hero, and section dividers
(`src/components/ui/RecoveryWave.jsx`).

## Production Notes / Next Steps

- Swap the Google Maps iframe placeholder (`LocationSection.jsx`) with your
  real embed URL and clinic address.
- Wire the Contact page form to a real email service (Resend, SendGrid, etc.)
  or add a `/api/contact` route — it currently simulates submission client-side.
- Lock down `POST /api/auth/register` behind an authenticated admin-only
  route before deploying (it's open for initial setup convenience).
- Add HTTPS, a production MongoDB Atlas cluster, and environment-specific
  CORS/cookie settings (`secure: true`, proper `sameSite`) before going live.
