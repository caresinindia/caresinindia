import { Route, Routes } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import DoctorList from '../pages/doctor/DoctorList';
import DoctorProfile from '../pages/doctor/DoctorProfile';
import Blog from '../pages/home/Blog';
import HomePage from '../pages/home/HomePage';
import PetientReview from '../pages/home/PetientReview';
import ProfilePage from '../pages/home/ProfilePage';

import HospitalDetail from '../pages/hospitals/HospitalDetail';
import HospitalList from '../pages/hospitals/HospitalList';

function PlaceholderPage({ title }) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4">
      <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
    </section>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        }
      />

      <Route
        path="/blog"
        element={
          <MainLayout>
            <Blog />
          </MainLayout>
        }
      />

      <Route
        path="/patient-review"
        element={
          <MainLayout>
            <PetientReview />
          </MainLayout>
        }
      />

      <Route
        path="/patient-review/:id"
        element={
          <MainLayout>
            <PetientReview />
          </MainLayout>
        }
      />

      <Route
        path="/doctors"
        element={
          <MainLayout>
            <DoctorList />
          </MainLayout>
        }
      />

      <Route
        path="/doctors/:id"
        element={
          <MainLayout>
            <DoctorProfile />
          </MainLayout>
        }
      />

      <Route
        path="/hospitals"
        element={
          <MainLayout>
            <HospitalList />
          </MainLayout>
        }
      />

      <Route
        path="/hospitals/:id"
        element={
          <MainLayout>
            <HospitalDetail />
          </MainLayout>
        }
      />

      <Route
        path="/hospital/:id"
        element={
          <MainLayout>
            <HospitalDetail />
          </MainLayout>
        }
      />

      <Route
        path="/specialities"
        element={
          <MainLayout>
            <PlaceholderPage title="Specialities" />
          </MainLayout>
        }
      />

      <Route
        path="/book-appointment"
        element={
          <MainLayout>
            <DoctorList isBookingMode={true} />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <PlaceholderPage title="Login" />
          </MainLayout>
        }
      />

      <Route
        path="/register"
        element={
          <MainLayout>
            <PlaceholderPage title="Create Account" />
          </MainLayout>
        }
      />

      <Route
        path="*"
        element={
          <MainLayout>
            <PlaceholderPage title="404 - Page Not Found" />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;