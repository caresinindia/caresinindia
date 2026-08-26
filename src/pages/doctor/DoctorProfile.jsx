import {
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  HeartHandshake,
  Languages,
  MessageSquare,
  Phone,
  PhoneCall,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Trophy,
  User,
  Video,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import { DOCTORS_DATA } from '../../data/doctorsData';
import BookingModal from './BookingModal';
import CallbackModal from './CallbackModal';
import AppointmentCalendar from './AppointmentCalendar';

const getInitialDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  return `Tomorrow, ${dayNum} ${monthName}`;
};

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find doctor by route ID or fallback to first
  const doctor = useMemo(() => {
    const found = DOCTORS_DATA.find((doc) => doc.id === id);
    return found || DOCTORS_DATA[0];
  }, [id]);

  // Booking widget states
  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [consultType, setConsultType] = useState('hospital'); // 'hospital' or 'video'
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${doctor.name} - ${doctor.speciality}`,
          text: `Consult with ${doctor.name} at ${doctor.hospitalName}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInlineBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      setBookingError('Please enter patient full name and mobile number.');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length < 10) {
      setBookingError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setBookingError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generated = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generated);
      setIsBooked(true);
    }, 500);
  };

  const handleResetInlineBooking = () => {
    setIsBooked(false);
    setPatientName('');
    setPatientPhone('');
    setSymptoms('');
  };

  // Extract other doctors for recommendation carousel
  const otherDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((d) => d.id !== doctor.id).slice(0, 3);
  }, [doctor.id]);

  const allSlots = doctor.timeSlots
    ? Object.entries(doctor.timeSlots)
    : [
        ['Morning', ['09:30 AM', '10:15 AM', '11:00 AM']],
        ['Afternoon', ['02:00 PM', '02:45 PM', '03:30 PM']],
        ['Evening', ['05:00 PM', '05:45 PM']],
      ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <Container>
        {/* Top Breadcrumb & Share */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Doctors</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? 'Profile Link Copied!' : 'Share Profile'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCallbackModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Request Free Callback</span>
            </button>
          </div>
        </div>

        {/* Doctor Header Banner Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
          {/* Top Banner Gradient */}
          <div className="h-28 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 sm:h-36" />

          <div className="relative px-6 pb-6 pt-0 sm:px-8">
            <div className="flex flex-col gap-6 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              {/* Doctor Avatar & Titles */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 self-start">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full rounded-2xl sm:rounded-3xl object-cover border-4 border-white shadow-lg"
                  />
                  {doctor.verified && (
                    <span
                      title="Verified Specialist"
                      className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-md border-2 border-white"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                      {doctor.name}
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                      <ShieldCheck className="mr-1 h-3.5 w-3.5 text-blue-600" />
                      Verified Specialist
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-blue-700">
                    {doctor.position}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
                      {doctor.speciality}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      {doctor.hospitalName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Badge & Fast Action */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2.5 border border-amber-200">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-amber-900">
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    ({doctor.reviewsCount} reviews)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
                >
                  Book Instant OPD
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium">Clinical Experience</span>
                </div>
                <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                  {doctor.experience}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">Procedures Performed</span>
                </div>
                <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                  {doctor.surgeriesCount || '7,500+ Surgeries'}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-medium">Success Rate</span>
                </div>
                <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                  {doctor.successRate || '99.2%'}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <Languages className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-medium">Languages Spoken</span>
                </div>
                <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">
                  {doctor.languages ? doctor.languages.join(', ') : 'English, Hindi'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Detailed Layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* LEFT COLUMN: Sticky Appointment Booking Box */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Main Booking Box */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl">
                {isBooked ? (
                  /* Success Card */
                  <div className="py-4 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                      Appointment Confirmed
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      Token ID: <span className="text-blue-600 font-mono">{bookingId}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your appointment with <strong className="text-slate-900">{doctor.name}</strong>{' '}
                      is scheduled for <strong className="text-slate-900">{selectedDate}</strong> at{' '}
                      <strong className="text-blue-600">{selectedSlot}</strong>.
                    </p>
                    <div className="rounded-xl bg-slate-50 p-3 text-left text-xs border border-slate-200">
                      <p className="text-slate-500">Hospital OPD:</p>
                      <p className="font-bold text-slate-800">{doctor.hospitalName}</p>
                      <p className="text-slate-500 mt-1">Fee to Pay at Desk:</p>
                      <p className="font-bold text-emerald-700">{doctor.consultationFee}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetInlineBooking}
                      className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  /* Booking Form */
                  <form onSubmit={handleInlineBookingSubmit} className="space-y-4">
                    {/* Fee Tag */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[11px] font-medium text-slate-400 block">
                          Consultation Fee
                        </span>
                        <span className="text-2xl font-black text-slate-900">
                          {doctor.consultationFee}
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                        Zero Booking Fee
                      </span>
                    </div>

                    {/* Mode of consultation */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Consultation Mode
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setConsultType('hospital')}
                          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold border transition ${
                            consultType === 'hospital'
                              ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Building2 className="h-3.5 w-3.5" />
                          <span>OPD Visit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultType('video')}
                          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold border transition ${
                            consultType === 'video'
                              ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>Video Consult</span>
                        </button>
                      </div>
                    </div>

                    {/* Dynamic 35-Day Appointment Calendar */}
                    <AppointmentCalendar
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                      maxDays={35}
                    />

                    {/* Time Slots */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Available Time Slots
                      </label>
                      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {allSlots.map(([period, slots]) => (
                          <div key={period} className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              {period}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                                    selectedSlot === slot
                                      ? 'bg-blue-600 text-white shadow-sm'
                                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Inputs */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {bookingError && (
                        <div className="rounded-xl bg-red-50 p-2 text-xs font-semibold text-red-700 border border-red-200">
                          {bookingError}
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Patient Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Mobile Number (SMS confirmation) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Health Concern / Symptoms (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Brief notes about illness..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-98 disabled:opacity-50"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{isSubmitting ? 'Confirming...' : 'Confirm Appointment'}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Callback Assistance Box */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-xl">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 border border-blue-400/30">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Free Medical Coordinator Call
                </span>
                <h4 className="mt-3 text-sm font-bold text-white">
                  Need Help Choosing Date or Procedure?
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Speak directly with our clinical care executive for appointment guidance & second
                  opinions.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-500"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Request Callback</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* right COLUMN: About, Specialities, Hospital Details, Education, Awards */}
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            {/* 1. About the Doctor */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                About {doctor.name}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-normal">
                {doctor.about}
              </p>
            </div>

            {/* 2. Specialisations & Clinical Expertise */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Specialisations & Clinical Focus
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctor.allSpecialities &&
                  doctor.allSpecialities.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* 3. Hospital & Clinic Information */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-blue-600" />
                Hospital & Clinic Information
              </h2>

              <div className="rounded-2xl bg-blue-50/60 p-5 border border-blue-100 space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{doctor.hospitalName}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{doctor.clinicAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-blue-100/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>
                      OPD Timings: <strong>{doctor.availability}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>
                      Hospital Helpline:{' '}
                      <a href={`tel:${doctor.phone}`} className="font-bold text-blue-700 hover:underline">
                        {doctor.phone}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Education & Qualifications */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Education & Medical Qualifications
              </h2>
              <div className="space-y-3">
                {doctor.education &&
                  doctor.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs text-slate-800"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold shrink-0 text-[11px]">
                        {idx + 1}
                      </div>
                      <span className="font-semibold">{edu}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* 5. Awards & Recognitions */}
            {doctor.awards && doctor.awards.length > 0 && (
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Awards & Recognitions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.awards.map((award, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4"
                    >
                      <div className="flex items-center gap-2 text-amber-600 mb-1">
                        <Award className="h-4 w-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Year {award.year}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">{award.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{award.organization}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Patient Reviews Highlights */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Patient Experience & Reviews
                </h2>
                <span className="text-xs font-bold text-blue-600">
                  {doctor.reviewsCount}+ Verified Reviews
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                        S
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Sunita Mehra</h4>
                        <p className="text-[10px] text-slate-400">Delhi, India • Treated 2 months ago</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{doctor.name} gave us clear guidance from day one. The surgery and recovery went
                    smoothly. The hospital staff and doctor were thoroughly professional and caring."
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                        R
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Rohan Verma</h4>
                        <p className="text-[10px] text-slate-400">Gurugram • Treated 5 months ago</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "Exceptional medical care and sub-millimeter precision. I was back on my feet
                    without pain in no time. Highly recommend {doctor.name}!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        {/* BOTTOM SECTION: Other Recommended Doctors */}
        <div className="mt-16 border-t border-slate-200/80 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Other Top Specialists in {doctor.speciality}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore experienced doctors from other partner hospitals in India.
              </p>
            </div>
            <Link
              to="/doctors"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All Doctors</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/doctors/${doc.id}`)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-14 w-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-[11px] text-blue-600 font-semibold truncate">{doc.speciality}</p>
                    <p className="text-[11px] text-slate-500 truncate">{doc.hospital}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{doc.consultationFee}</span>
                  <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                    View Profile <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Global Booking Modal Trigger */}
      <BookingModal
        doctor={doctor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Global Callback Modal */}
      <CallbackModal
        doctor={doctor}
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </div>
  );
};

export default DoctorProfile;
