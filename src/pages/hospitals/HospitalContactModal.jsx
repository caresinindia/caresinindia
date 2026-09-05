import {
  Clock,
  ExternalLink,
  Globe,
  Headphones,
  Phone,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

const HospitalContactModal = ({ hospital, isOpen, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [dept, setDept] = useState('General Enquiry');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !hospital) return null;

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setPatientName('');
    setPatientPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Contact & Assistance Desk</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{hospital.name}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-5">
          {/* 1. 24x7 Emergency Call Bar */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/80 p-4 transition hover:bg-red-50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-500/30">
                  <ShieldAlert className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                    24x7 Emergency Hotline
                  </span>
                  <div className="text-base font-black text-red-950">{hospital.emergencyNumber}</div>
                </div>
              </div>
              <a
                href={`tel:${hospital.emergencyNumber.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-red-600/30 transition hover:bg-red-700 active:scale-98"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* 2. Direct OPD & Reception Lines */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Department Numbers
            </span>

            {/* OPD & Appointments */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-blue-200 hover:bg-blue-50/40">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">OPD Appointments & Reception</div>
                  <div className="text-xs text-slate-500 font-semibold">{hospital.phone}</div>
                </div>
              </div>
              <a
                href={`tel:${hospital.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1 rounded-xl bg-[#e05638] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#b9381e]"
              >
                <Phone className="h-3 w-3" />
                <span>Dial</span>
              </a>
            </div>

            {/* Ambulance Dispatch */}
            {hospital.ambulancePhone && (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Direct Ambulance Dispatch</div>
                    <div className="text-xs text-slate-500 font-semibold">{hospital.ambulancePhone}</div>
                  </div>
                </div>
                <a
                  href={`tel:${hospital.ambulancePhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call {hospital.ambulancePhone}</span>
                </a>
              </div>
            )}

            {/* International Concierge */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-purple-200 hover:bg-purple-50/40">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">International Patient Care</div>
                  <div className="text-xs text-slate-500 font-medium">{hospital.email}</div>
                </div>
              </div>
              <a
                href={`mailto:${hospital.email}`}
                className="inline-flex items-center gap-1 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-purple-700"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* 3. Request Hospital Callback Form */}
          <div className="rounded-2xl border border-rose-100 bg-gradient-to-b from-[#fceae6]/30 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#e05638]" />
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Request Quick Callback from Hospital
              </h4>
            </div>

            {isSubmitted ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-center border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800">
                  ✓ Request Received Successfully!
                </div>
                <p className="mt-1 text-[11px] text-emerald-600">
                  The hospital coordinator for {hospital.shortName || hospital.name} will call you back within 10 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ankit Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#e05638] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#e05638] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Specialty / Department</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#e05638] focus:outline-none"
                  >
                    <option value="General Enquiry">General OPD & Admission Enquiry</option>
                    {hospital.specialities?.map((spec, i) => (
                      <option key={i} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#e05638] py-2.5 text-xs font-bold text-white shadow-md shadow-orange-600/20 hover:bg-[#b9381e] transition active:scale-98"
                >
                  Request Hospital Callback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalContactModal;
