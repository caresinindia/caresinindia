import {
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HospitalMegaMenu from './HospitalMegaMenu';

const HeroSection = ({
  hospital,
  onOpenCallModal,
  onOpenMapModal,
  onScrollToExperts,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <section className="relative bg-white pt-2 pb-6 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Mini Selector Bar (Dropdown toggle to change hospital) */}
        <div className="mb-4 flex items-center justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 hover:border-[#e05638] hover:text-[#e05638] transition shadow-xs active:scale-98"
            >
              <span>Explore All Hospitals & Locations</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#e05638]' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMegaMenuOpen(false)}
                />
                <div className="absolute left-0 top-14 z-50">
                  <HospitalMegaMenu onClose={() => setIsMegaMenuOpen(false)} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 1. Large Hospital Banner Image with Google Rating Badge Overlay */}
        <div className="relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-slate-200/80">
          <img
            src={hospital.bannerImage || hospital.image}
            alt={hospital.name}
            className="h-full w-full object-cover object-center"
          />

          {/* Google Rating Badge Overlay at Bottom Right */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md border border-slate-200/90">
            {/* Google Logo icon styling */}
            <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-xs text-blue-600 bg-blue-50">
              G
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {hospital.googleRating || hospital.rating.toFixed(1)}
            </span>
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Hospital Name Heading & Action Buttons Bar (Screenshot 5) */}
        <div className="mt-6 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {hospital.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* Circular Phone Action Button */}
            <button
              type="button"
              onClick={onOpenCallModal}
              title={`Call ${hospital.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-[#e05638] hover:text-[#e05638] hover:shadow-md active:scale-95"
            >
              <Phone className="h-4 w-4" />
            </button>

            {/* Circular Location / Map Action Button */}
            <button
              type="button"
              onClick={onOpenMapModal}
              title={`Location: ${hospital.address}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-[#e05638] hover:text-[#e05638] hover:shadow-md active:scale-95"
            >
              <MapPin className="h-4 w-4" />
            </button>

            {/* Circular Email / Contact Button */}
            <a
              href={`mailto:${hospital.email}`}
              title={`Email: ${hospital.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-[#e05638] hover:text-[#e05638] hover:shadow-md active:scale-95"
            >
              <Mail className="h-4 w-4" />
            </a>

            {/* Find a Doctor (Peach/Coral Soft Button matching Screenshot 5) */}
            <button
              type="button"
              onClick={onScrollToExperts}
              className="rounded-xl bg-[#fceae6] px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-900 shadow-2xs transition hover:bg-[#fbd9d3] active:scale-98"
            >
              Find a Doctor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
