import { ChevronDown, Menu, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../common/Button';
import Container from '../common/Container';
import SpecialistMegaMenu from '../../pages/specialist/SpecialistMegaMenu';

const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find a Doctor', path: '/doctors' },
  { label: 'Hospitals', path: '/hospitals' },
  { label: 'Specialities', path: '/specialities', hasDropdown: true },
  { label: 'Patient Blogs', path: '/blog' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpecialtyMegaMenuOpen, setIsSpecialtyMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const location = useLocation();

  // Close mega menu on route change
  useEffect(() => {
    setIsSpecialtyMegaMenuOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsSpecialtyMegaMenuOpen(false);
      }
    };
    if (isSpecialtyMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpecialtyMegaMenuOpen]);

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors flex items-center gap-1 ${
      isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
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
          <nav className="hidden items-center gap-7 md:flex relative" ref={megaMenuRef}>
            {navigationLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative py-4"
                    onMouseEnter={() => setIsSpecialtyMegaMenuOpen(true)}
                  >
                    <NavLink
                      to={link.path}
                      className={getNavLinkClass}
                      onClick={(e) => {
                        // Allow clicking to toggle or navigate
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isSpecialtyMegaMenuOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                    </NavLink>

                    {/* 4-Column Mega Menu Dropdown */}
                    {isSpecialtyMegaMenuOpen && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-14 z-50 pt-2"
                        onMouseLeave={() => setIsSpecialtyMegaMenuOpen(false)}
                      >
                        <SpecialistMegaMenu onClose={() => setIsSpecialtyMegaMenuOpen(false)} />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={getNavLinkClass}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/profile"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
            >
              <User size={18} />
              Profile
            </Link>

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
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden animate-fadeIn">
            <nav className="flex flex-col gap-3">
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

              <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/book-appointment"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Book Appointment</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;