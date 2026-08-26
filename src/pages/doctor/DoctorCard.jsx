import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  PhoneCall,
  Star,
  Stethoscope,
  User,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor, onBook, onCallback }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl">
      {/* Top Header: Avatar, Name, Position, Rating */}
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Avatar Container */}
          <div className="relative shrink-0 self-start">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-102 transition-transform"
            />
            {doctor.verified && (
              <span
                title="Verified Specialist"
                className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md border-2 border-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-100">
                <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
                <span>{doctor.speciality}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-900 border border-amber-200">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{doctor.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal text-[10px]">
                  ({doctor.reviewsCount})
                </span>
              </div>
            </div>

            {/* Doctor Name & Position */}
            <Link
              to={`/doctors/${doctor.id}`}
              className="mt-2 block group-hover:text-blue-600 transition-colors"
            >
              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                {doctor.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs text-slate-600 line-clamp-1 font-medium">
              {doctor.position}
            </p>

            {/* Experience & Hospital */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                {doctor.experience}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 truncate text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{doctor.hospital}</span>
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
              <span className="truncate">{doctor.clinicAddress || doctor.city}</span>
            </div>
          </div>
        </div>

        {/* Specialisations Tags */}
        {doctor.allSpecialities && doctor.allSpecialities.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Specialisations & Expertise
            </span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.allSpecialities.slice(0, 4).map((spec, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition group-hover:bg-blue-50/60 group-hover:text-blue-800"
                >
                  {spec}
                </span>
              ))}
              {doctor.allSpecialities.length > 4 && (
                <span className="rounded-lg bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
                  +{doctor.allSpecialities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Fee & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Consultation Fee</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">{doctor.consultationFee}</span>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Verified Fee
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Availability</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available Tomorrow
            </span>
          </div>
        </div>

        {/* Action Buttons: 1. Book Appointment, 2. View Full Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onBook(doctor)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-98"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Appointment</span>
          </button>

          <Link
            to={`/doctors/${doctor.id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-98"
          >
            <User className="h-3.5 w-3.5" />
            <span>View Full Profile</span>
            <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>

        {/* Callback secondary link */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100/60">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            {doctor.availability || 'Mon - Sat'}
          </span>
          <button
            type="button"
            onClick={() => onCallback(doctor)}
            className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <PhoneCall className="h-3 w-3" />
            <span>Request Callback</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
