import {
  AlertTriangle,
  Building2,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { HOSPITALS_DATA } from '../../data/hospitalsData';
import BookingModal from '../doctor/BookingModal';
import CallbackModal from '../doctor/CallbackModal';
import HeroSection from './HeroSection';
import HospitalAccreditations from './HospitalAccreditations';
import HospitalArticlesAndVideos from './HospitalArticlesAndVideos';
import HospitalContactModal from './HospitalContactModal';
import HospitalMapModal from './HospitalMapModal';
import HospitalProcedures from './HospitalProcedures';
import HospitalSpecialitySlider from './HospitalSpecialitySlider';
import TeamOfExperts from './TeamOfExperts';

const HospitalDetail = () => {
  const { id } = useParams();

  // Modals state
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [callbackDoctor, setCallbackDoctor] = useState(null);

  // Retrieve hospital data by route id
  const hospital = useMemo(() => {
    if (!id) return HOSPITALS_DATA[0];

    const targetId = id.toLowerCase().trim();

    // Exact ID match
    let found = HOSPITALS_DATA.find((h) => h.id.toLowerCase() === targetId);
    if (found) return found;

    // Fuzzy match by slug, group or name
    found = HOSPITALS_DATA.find((h) => {
      const hName = h.name.toLowerCase();
      const hShort = (h.shortName || '').toLowerCase();
      const hGroup = (h.group || '').toLowerCase();
      return (
        hName.includes(targetId) ||
        targetId.includes(h.id) ||
        hShort.includes(targetId) ||
        hGroup.includes(targetId)
      );
    });

    return found || HOSPITALS_DATA[0];
  }, [id]);

  const handleScrollToExperts = () => {
    const el = document.getElementById('team-of-experts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!hospital) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-3" />
        <h1 className="text-2xl font-bold text-slate-900">Hospital Not Found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The hospital you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/hospitals"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Browse All Hospitals</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section (Screenshot 5: Banner with Google 4.9 rating overlay, Circle Buttons, Find a Doctor button) */}
      <HeroSection
        hospital={hospital}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenMapModal={() => setIsMapModalOpen(true)}
        onScrollToExperts={handleScrollToExperts}
      />

      {/* 2. Our Team of Experts (Screenshots 1 & 5: Doctor cards row with View Full Profile / Book An Appointment split buttons & < > controls) */}
      <TeamOfExperts
        hospital={hospital}
        onBookDoctor={(doc) => setBookingDoctor(doc)}
        onCallbackDoctor={(doc) => setCallbackDoctor(doc)}
      />

      {/* 3. Speciality Section & Expandable Accordions (Screenshot 1: Circular pastel icons, < > controls, Accordions) */}
      <HospitalSpecialitySlider hospital={hospital} />

      {/* 4. Medical Procedures Section (Screenshot 3: Procedures image cards with text overlay & < > controls) */}
      <HospitalProcedures hospital={hospital} />

      {/* 5. Accreditations Section (Screenshot 3: NABH accreditation card) */}
      <HospitalAccreditations hospital={hospital} />

      {/* 6. Health Articles & Explore Videos (Screenshot 4: Blog cards, Video card with play button, WhatsApp floating button) */}
      <HospitalArticlesAndVideos hospital={hospital} />

      {/* Modals */}
      {/* Interactive Call Desk Modal */}
      <HospitalContactModal
        hospital={hospital}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      {/* Interactive Location Map Modal */}
      <HospitalMapModal
        hospital={hospital}
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

      {/* Doctor OPD Booking Modal */}
      <BookingModal
        doctor={bookingDoctor}
        isOpen={Boolean(bookingDoctor)}
        onClose={() => setBookingDoctor(null)}
      />

      {/* Doctor Request Callback Modal */}
      <CallbackModal
        doctor={callbackDoctor}
        isOpen={Boolean(callbackDoctor)}
        onClose={() => setCallbackDoctor(null)}
      />
    </div>
  );
};

export default HospitalDetail;
