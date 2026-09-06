import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import { DOCTORS_DATA } from '../../data/doctorsData';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { ALL_SPECIALISTS, SPECIALIST_BY_ID } from '../../data/specialistsData';
import BookingModal from '../doctor/BookingModal';
import CallbackModal from '../doctor/CallbackModal';
import DoctorCard from '../doctor/DoctorCard';
import SpecialistIcon from './SpecialistIcon';

const SpecialistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find specialty details
  const specialty = SPECIALIST_BY_ID[id] || ALL_SPECIALISTS.find((s) => s.id === id) || ALL_SPECIALISTS[0];

  // Modals state
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [callbackDoctor, setCallbackDoctor] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Match doctors for this specialty
  const matchedDoctors = useMemo(() => {
    const specName = specialty.name.toLowerCase();
    const specId = specialty.id.toLowerCase();
    const keywords = specName.split(' ').map((w) => w.toLowerCase());

    const docs = DOCTORS_DATA.filter((doc) => {
      const docSpec = doc.speciality.toLowerCase();
      const allSpecs = doc.allSpecialities ? doc.allSpecialities.map((s) => s.toLowerCase()).join(' ') : '';
      return (
        docSpec.includes(specName) ||
        docSpec.includes(specId) ||
        keywords.some((kw) => kw.length > 3 && docSpec.includes(kw)) ||
        keywords.some((kw) => kw.length > 3 && allSpecs.includes(kw))
      );
    });

    // If no direct matches, return top verified doctors as recommended
    return docs.length > 0 ? docs : DOCTORS_DATA.slice(0, 3);
  }, [specialty]);

  // Match hospitals for this specialty
  const matchedHospitals = useMemo(() => {
    return HOSPITALS_DATA.slice(0, 3);
  }, []);

  // Related Specialties in the same category
  const relatedSpecialties = useMemo(() => {
    return ALL_SPECIALISTS.filter(
      (s) => s.id !== specialty.id && s.category === specialty.category
    ).slice(0, 4);
  }, [specialty]);

  return (
    <div className="w-full bg-slate-50/60 pb-16">
      {/* 1. Top Breadcrumbs Bar */}
      <div className="border-b border-slate-200/80 bg-white py-3">
        <Container>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link to="/specialities" className="hover:text-blue-600 transition">
              Specialties
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900 truncate">{specialty.name}</span>
          </div>
        </Container>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 py-10 sm:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Specialty Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>Center of Excellence</span>
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {specialty.category}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm"
                  style={{ backgroundColor: specialty.bgColor, color: specialty.color }}
                >
                  <SpecialistIcon iconName={specialty.iconName} className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {specialty.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Advanced Medical Care & International Treatment Protocols
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {specialty.overview}
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {specialty.doctorsCount}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">Verified Specialists</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-600">
                    {specialty.successRate}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">Clinical Success Rate</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-blue-600">24/7</div>
                  <div className="text-[11px] font-medium text-slate-500">Emergency Care</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/doctors?speciality=${encodeURIComponent(specialty.name)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  <Stethoscope className="h-4 w-4" />
                  <span>Consult {specialty.name} Doctors</span>
                </Link>
                <a
                  href="tel:1800000000"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
                >
                  <PhoneCall className="h-4 w-4 text-blue-600" />
                  <span>Call Medical Helpline</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Banner Image */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl border border-slate-200 shadow-md">
                <img
                  src={specialty.heroImage}
                  alt={specialty.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-3.5 backdrop-blur-md shadow-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <span>JCI & NABH Accredited Excellence</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Equipped with advanced robotic surgery suites & digital diagnostics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Main Content: Procedures & Conditions */}
      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left / Main Column (8 cols) */}
          <div className="space-y-10 lg:col-span-8">
            {/* Key Procedures & Surgeries */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Key Procedures & Treatments
                  </h2>
                  <p className="text-xs text-slate-500">
                    Advanced clinical procedures performed with state-of-the-art medical technology.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {specialty.procedures.map((procedure, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-white hover:border-blue-200 hover:shadow-xs"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-800">
                        {procedure}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Performed by fellowship-trained specialists.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions & Symptoms Treated */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Conditions & Symptoms Treated
                  </h2>
                  <p className="text-xs text-slate-500">
                    Consult our specialists if you or a loved one experience any of these conditions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {specialty.conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-700"
                  >
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Specialists / Doctors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Leading {specialty.name} Doctors
                  </h2>
                  <p className="text-xs text-slate-500">
                    Top-rated senior consultants, professors, and surgeons available for in-person or video consultation.
                  </p>
                </div>
                <Link
                  to={`/doctors?speciality=${encodeURIComponent(specialty.name)}`}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>View All Doctors</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {matchedDoctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    onBook={() => setBookingDoctor(doc)}
                    onCallback={() => setCallbackDoctor(doc)}
                  />
                ))}
              </div>

              <div className="pt-2 text-center sm:hidden">
                <Link
                  to={`/doctors?speciality=${encodeURIComponent(specialty.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600"
                >
                  <span>View All {specialty.name} Doctors</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Top Hospitals for this Specialty */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Centers of Excellence & Hospitals
                  </h2>
                  <p className="text-xs text-slate-500">
                    Equipped with advanced diagnostic labs, modular ICUs, and accredited care teams.
                  </p>
                </div>
                <Link
                  to="/hospitals"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View All Hospitals
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {matchedHospitals.map((hosp) => (
                  <Link
                    key={hosp.id}
                    to={`/hospital/${hosp.id}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-blue-300 hover:shadow-md"
                  >
                    <div>
                      <div className="h-28 w-full overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={hosp.image}
                          alt={hosp.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                        {hosp.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{hosp.city}, {hosp.state}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-blue-600 font-semibold">
                      <span>Explore Hospital</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            {specialty.faqs && specialty.faqs.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-slate-500">
                      Common questions regarding {specialty.name} treatments and consultations.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {specialty.faqs.map((faq, index) => (
                    <div key={index} className="py-3">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                        className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${
                            openFaqIndex === index ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {openFaqIndex === index && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed pr-4 animate-fadeIn">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Quick Consultation Booking Card */}
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50/80 to-white p-6 shadow-md space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Instant Assistance</span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  Book a Consultation with a Specialist
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Get priority appointments, treatment cost estimates, second opinions, and tele-consultations with certified experts.
                </p>

                <div className="space-y-2.5 pt-1">
                  <Link
                    to="/book-appointment"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book In-Person Appointment</span>
                  </Link>

                  <a
                    href="tel:1800000000"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Call 24/7 Helpline: 1800-000-000</span>
                  </a>
                </div>

                <div className="border-t border-slate-200/80 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Free Treatment Plan & Cost Estimate</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Medical Coordinator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Zero Waiting Time at Hospitals</span>
                  </div>
                </div>
              </div>

              {/* Related Specialties */}
              {relatedSpecialties.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span>Related Specialties</span>
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {relatedSpecialties.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/specialities/${rel.id}`}
                        className="group flex items-center justify-between py-2.5 hover:text-blue-600 transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-1">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs"
                            style={{ backgroundColor: rel.bgColor, color: rel.color }}
                          >
                            <SpecialistIcon iconName={rel.iconName} className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 truncate">
                            {rel.name}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Booking & Callback Modals */}
      {bookingDoctor && (
        <BookingModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />
      )}
      {callbackDoctor && (
        <CallbackModal doctor={callbackDoctor} onClose={() => setCallbackDoctor(null)} />
      )}
    </div>
  );
};

export default SpecialistDetail;
