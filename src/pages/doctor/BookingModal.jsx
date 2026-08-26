import {
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Video,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';

const getInitialDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  return `Tomorrow, ${dayNum} ${monthName}`;
};

const BookingModal = ({ doctor, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [consultType, setConsultType] = useState('hospital'); // 'hospital' or 'video'
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !doctor) return null;

  // Flatten slots for fallback
  const allSlots = doctor.timeSlots
    ? Object.entries(doctor.timeSlots)
    : [
        ['Morning', ['09:30 AM', '10:15 AM', '11:00 AM']],
        ['Afternoon', ['02:00 PM', '02:45 PM', '03:30 PM']],
        ['Evening', ['05:00 PM', '05:45 PM']],
      ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      setErrorMsg('Please enter your full name and mobile number.');
      return;
    }
    if (patientPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please provide a valid 10-digit phone number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setSymptoms('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Book Doctor Appointment</h3>
              <p className="text-xs text-blue-100">Instant SMS & WhatsApp confirmation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {isSuccess ? (
            /* Success Confirmation Screen */
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>

              <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Appointment Confirmed
              </span>

              <h4 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                Booking ID: <span className="text-blue-600 font-mono">{bookingId}</span>
              </h4>

              <p className="mt-1 text-xs text-slate-500 max-w-md">
                We have sent an appointment confirmation & location details to{' '}
                <strong className="text-slate-800">{patientPhone}</strong>.
              </p>

              {/* Summary Card */}
              <div className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left sm:p-5 space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{doctor.name}</h5>
                    <p className="text-xs text-blue-700 font-medium">{doctor.speciality}</p>
                    <p className="text-[11px] text-slate-500">{doctor.hospitalName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Date & Slot:</span>
                    <p className="font-bold text-slate-800">
                      {selectedDate} at {selectedSlot}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Patient:</span>
                    <p className="font-bold text-slate-800">{patientName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Consultation Mode:</span>
                    <p className="font-bold text-slate-800 capitalize">
                      {consultType === 'hospital' ? 'Hospital OPD Visit' : 'Online Video Consult'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Fee to Pay at Hospital:</span>
                    <p className="font-bold text-emerald-700">{doctor.consultationFee}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  Done
                </button>
                <a
                  href={`tel:${doctor.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-600" />
                  <span>Call Hospital Desk</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Doctor Quick Snapshot */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-blue-50/70 p-3.5 border border-blue-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-14 w-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{doctor.name}</h4>
                    <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 font-semibold truncate">{doctor.position}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                    <span className="flex items-center gap-1 truncate">
                      <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                      {doctor.hospital}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700">{doctor.consultationFee} Fee</span>
                  </div>
                </div>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType('hospital')}
                    className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-semibold border transition ${
                      consultType === 'hospital'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>In-Hospital OPD Visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultType('video')}
                    className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-semibold border transition ${
                      consultType === 'video'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="h-4 w-4" />
                    <span>Online Video Consult</span>
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
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Preferred Time Slot
                </label>
                <div className="space-y-2.5">
                  {allSlots.map(([period, slots]) => (
                    <div key={period} className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        {period} Slots
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
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

              {/* Patient Form Fields */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Patient Information
                </label>

                {errorMsg && (
                  <div className="rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-red-700 border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Mobile Number (WhatsApp Enabled) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-medium block mb-1">
                      Patient Age (Optional)
                    </label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="e.g. 34"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">
                    Symptoms or Reason for Consultation (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Briefly describe health concern or previous diagnosis..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>
              </div>

              {/* Submit / Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 block">Consultation Fee:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {doctor.consultationFee}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Confirming...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Confirm Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
