import {
  Car,
  Check,
  Compass,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Train,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

const HospitalMapModal = ({ hospital, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !hospital) return null;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(hospital.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedQuery = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
  const embedMapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <MapPin className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hospital Location & Map</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{hospital.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Map Frame */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title={`Map of ${hospital.name}`}
              src={embedMapUrl}
              className="h-full w-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-3 left-3 rounded-xl bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm border border-slate-200">
              <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                <MapPin className="h-3.5 w-3.5 text-red-600" />
                {hospital.city}, {hospital.state}
              </span>
            </div>
          </div>

          {/* Address & Copy */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Complete Address
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {hospital.address}
                </p>
                {hospital.landmark && (
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Compass className="h-3.5 w-3.5 text-blue-500" />
                    <span>Landmark: {hospital.landmark}</span>
                  </p>
                )}
              </div>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-1.5 self-start sm:self-center shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:border-slate-300"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Transit & Parking Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Train className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Transit Connectivity</span>
                <span className="text-[11px] text-slate-500">{hospital.landmark || 'Metro Station Connectivity'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Car className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Valet & Parking</span>
                <span className="text-[11px] text-slate-500">24/7 Multi-Level Parking Available</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-98"
            >
              <Navigation className="h-4 w-4" />
              <span>Get Live GPS Directions</span>
            </a>

            <a
              href={hospital.mapUrl || `https://maps.google.com/?q=${encodedQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-bold text-slate-800 transition hover:bg-slate-200"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMapModal;
