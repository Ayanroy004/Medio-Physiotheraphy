import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/layout/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import NotFoundPage from "./pages/NotFoundPage";

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
      {/* ================================================================
          PUBLIC PATIENT-FACING SITE
      ================================================================= */}

      {/* Home */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />

      {/* Services */}
      <Route
        path="/services"
        element={
          <PublicLayout>
            <ServicesPage />
          </PublicLayout>
        }
      />

      {/* Service Details */}
      <Route
        path="/services/:id"
        element={
          <PublicLayout>
            <ServiceDetailPage />
          </PublicLayout>
        }
      />

      {/* About */}
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />

      {/* Contact */}
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />

      {/* Booking */}
      {/*
      <Route
        path="/book"
        element={
          <PublicLayout>
            <BookingPage />
          </PublicLayout>
        }
      />
      */}

      {/* ================================================================
          ADMIN
      ================================================================= */}

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* /admin */}
        <Route index element={<AdminDashboardPage />} />

        {/* /admin/services */}
        <Route path="services" element={<AdminServicesPage />} />

        {/* /admin/appointments */}
        {/*
        <Route
          path="appointments"
          element={<AdminAppointmentsPage />}
        />
        */}

        {/* /admin/add-member */}
        {/*
        <Route
          path="add-member"
          element={<AdminAddMemberPage />}
        />
        */}
      </Route>

      {/* ================================================================
          404
      ================================================================= */}

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
