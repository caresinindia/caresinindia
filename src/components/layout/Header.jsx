import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../common/Button';
import Container from '../common/Container';

const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find a Doctor', path: '/doctors' },
  { label: 'Hospitals', path: '/hospitals' },
  { label: 'Specialities', path: '/specialities' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img src={logo} alt="Care in India Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={getNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link to="/book-appointment">
              <Button>Book Appointment</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={getNavLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>

              <Link
                to="/book-appointment"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Book Appointment</Button>
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;