import { Link } from 'react-router-dom';

import Container from '../common/Container';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-12 text-slate-300">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              HealthCare<span className="text-blue-400">+</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Connecting patients with trusted doctors, hospitals, and
              healthcare services.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/doctors">Find a Doctor</Link>
              <Link to="/hospitals">Hospitals</Link>
              <Link to="/specialities">Specialities</Link>
              <Link to="/book-appointment">Book Appointment</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">For Patients</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/appointments">My Appointments</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>📞 +91 1800 000 000</p>
              <p>✉️ support@healthcare.com</p>
              <p>📍 India</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {currentYear} HealthCare+. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;