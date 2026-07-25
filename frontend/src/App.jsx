import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage.jsx";
import AdminServicesPage from "./pages/admin/AdminServicesPage.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public patient-facing site */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/services"
        element={
          <PublicLayout>
            <ServicesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />
      <Route
        path="/book"
        element={
          <PublicLayout>
            <BookingPage />
          </PublicLayout>
        }
      />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="appointments" element={<AdminAppointmentsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
      </Route>

      <Route
        path="*"
        element={
          <PublicLayout>
            <NotFoundPage />
          </PublicLayout>
        }
      />
    </Routes>
  );
}
