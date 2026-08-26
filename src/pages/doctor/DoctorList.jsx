import {
  Building2,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import { DOCTORS_DATA, HOSPITALS_LIST, SPECIALITIES_LIST } from '../../data/doctorsData';
import BookingModal from './BookingModal';
import CallbackModal from './CallbackModal';
import DoctorCard from './DoctorCard';

const DoctorList = ({ isBookingMode = false }) => {
  const [searchParams] = useSearchParams();
  const initialSpeciality = searchParams.get('speciality') || 'All Specialities';
  const initialHospital = searchParams.get('hospital') || 'All Hospitals';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState(initialSpeciality);
  const [selectedHospital, setSelectedHospital] = useState(initialHospital);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'experience', 'fee_low', 'fee_high'

  // Modals state
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [callbackDoctor, setCallbackDoctor] = useState(null);

  // Filter & Search Logic
  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return DOCTORS_DATA.filter((doctor) => {
      // 1. Search by doctor name or treatment/subspeciality or city
      const matchSearch =
        !q ||
        doctor.name.toLowerCase().includes(q) ||
        doctor.speciality.toLowerCase().includes(q) ||
        doctor.allSpecialities.some((s) => s.toLowerCase().includes(q)) ||
        doctor.hospitalName.toLowerCase().includes(q) ||
        doctor.city.toLowerCase().includes(q);

      // 2. Filter by speciality
      const matchSpeciality =
        selectedSpeciality === 'All Specialities' ||
        doctor.speciality.toLowerCase().includes(selectedSpeciality.toLowerCase()) ||
        doctor.allSpecialities.some((s) =>
          s.toLowerCase().includes(selectedSpeciality.toLowerCase())
        );

      // 3. Filter by hospital
      const matchHospital =
        selectedHospital === 'All Hospitals' ||
        doctor.hospital.toLowerCase().includes(selectedHospital.toLowerCase()) ||
        doctor.hospitalName.toLowerCase().includes(selectedHospital.toLowerCase());

      return matchSearch && matchSpeciality && matchHospital;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee_low') return a.feeAmount - b.feeAmount;
      if (sortBy === 'fee_high') return b.feeAmount - a.feeAmount;
      return 0;
    });
  }, [searchQuery, selectedSpeciality, selectedHospital, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpeciality('All Specialities');
    setSelectedHospital('All Hospitals');
    setSortBy('rating');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSpeciality !== 'All Specialities' ||
    selectedHospital !== 'All Hospitals';

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 sm:py-12">
      <Container>
        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span>Verified Medical Specialists across India</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                {isBookingMode ? 'Book Doctor Appointment Online' : 'Find Top Doctors & Specialists'}
              </h1>
              <p className="text-xs text-slate-300 sm:text-sm leading-relaxed">
                Connect with India’s leading surgeons, physicians, and department heads from Apollo,
                Medanta, Fortis, and Max Hospitals. Instant OPD confirmation & zero booking fees.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:w-72 shrink-0">
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
                <span className="text-lg font-black text-amber-400">100%</span>
                <p className="text-[11px] text-slate-300 font-medium">Verified Doctors</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
                <span className="text-lg font-black text-emerald-400">0 min</span>
                <p className="text-[11px] text-slate-300 font-medium">Booking Wait Time</p>
              </div>
            </div>
          </div>

          {/* Integrated Search Bar inside Hero Header */}
          <div className="mt-8">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name (e.g. Dr. Arvind Kumar), treatment or illness..."
                className="w-full rounded-2xl border border-white/20 bg-white/95 py-3.5 pl-12 pr-10 text-sm text-slate-900 placeholder-slate-400 shadow-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Dropdown Filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 flex-1">
              {/* 1. Filter by Speciality */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
                  <span>Filter by Speciality</span>
                </label>
                <select
                  value={selectedSpeciality}
                  onChange={(e) => setSelectedSpeciality(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {SPECIALITIES_LIST.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Filter by Hospital */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>Filter by Hospital</span>
                </label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {HOSPITALS_LIST.map((hosp) => (
                    <option key={hosp} value={hosp}>
                      {hosp}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Sort Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
                  <span>Sort Doctors By</span>
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="rating">Highest Rated (Top Stars)</option>
                  <option value="experience">Most Experienced (Years)</option>
                  <option value="fee_low">Consultation Fee (Low to High)</option>
                  <option value="fee_high">Consultation Fee (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Right: Results Count & Reset Button */}
            <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="text-xs text-slate-600 font-medium">
                Showing{' '}
                <strong className="text-blue-600 font-bold">{filteredDoctors.length}</strong>{' '}
                Doctors
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Speciality Pill Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase">Popular:</span>
            {['Cardiologist', 'Orthopedic Surgeon', 'Pulmonology & Chest Surgery', 'Neurologist & Spine Surgeon', 'Pediatrician'].map(
              (spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpeciality(spec)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    selectedSpeciality === spec
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {spec}
                </button>
              )
            )}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="mt-8">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBook={(doc) => setBookingDoctor(doc)}
                  onCallback={(doc) => setCallbackDoctor(doc)}
                />
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                No matching doctors found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                We couldn't find doctors matching your current filters. Try changing your search
                term or resetting the filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* Booking Modal */}
      <BookingModal
        doctor={bookingDoctor}
        isOpen={Boolean(bookingDoctor)}
        onClose={() => setBookingDoctor(null)}
      />

      {/* Callback Request Modal */}
      <CallbackModal
        doctor={callbackDoctor}
        isOpen={Boolean(callbackDoctor)}
        onClose={() => setCallbackDoctor(null)}
      />
    </div>
  );
};

export default DoctorList;
