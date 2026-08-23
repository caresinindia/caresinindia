import { Route, Routes } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

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
        path="/doctors"
        element={
          <MainLayout>
            <PlaceholderPage title="Find a Doctor" />
          </MainLayout>
        }
      />

      <Route
        path="/hospitals"
        element={
          <MainLayout>
            <PlaceholderPage title="Hospitals" />
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
            <PlaceholderPage title="Book Appointment" />
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