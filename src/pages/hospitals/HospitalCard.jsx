import {
  Bed,
  Building2,
  ChevronRight,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const HospitalCard = ({ hospital, onQuickCall, onQuickMap }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#e05638]/60 hover:shadow-xl">
      <div>
        {/* Hospital Featured Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

          {/* Zone & State Floating Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/20">
            <span>{hospital.zone} Zone • {hospital.state}</span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-xl bg-amber-400/90 px-2.5 py-1 text-xs font-black text-amber-950 shadow-md backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-950 text-amber-950" />
            <span>{hospital.rating.toFixed(1)}</span>
            <span className="text-[10px] font-normal text-amber-900">({hospital.reviewsCount})</span>
          </div>

          {/* Beds Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 backdrop-blur-md shadow-md">
            <Bed className="h-3.5 w-3.5 text-blue-600" />
            <span>{hospital.bedsCount}</span>
          </div>
        </div>

        {/* Hospital Title & Group */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#e05638] block mb-1">
            {hospital.group || 'Multi-Speciality Hospital'}
          </span>
          <Link
            to={`/hospital/${hospital.id}`}
            className="block text-base sm:text-lg font-black text-slate-900 leading-snug hover:text-[#e05638] transition"
          >
            {hospital.name}
          </Link>
        </div>

        {/* Address */}
        <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-500">
          <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{hospital.address}</span>
        </div>

        {/* Key Specialties */}
        {hospital.specialities && hospital.specialities.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
            {hospital.specialities.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
              >
                {spec}
              </span>
            ))}
            {hospital.specialities.length > 3 && (
              <span className="rounded-lg bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
                +{hospital.specialities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Quick Call Button */}
          <button
            type="button"
            onClick={() => onQuickCall(hospital)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:border-[#e05638] hover:bg-[#fceae6] hover:text-[#b9381e] transition active:scale-98"
          >
            <Phone className="h-3.5 w-3.5 text-[#e05638]" />
            <span>Call Desk</span>
          </button>

          {/* View Hospital Details Link */}
          <Link
            to={`/hospital/${hospital.id}`}
            className="flex items-center justify-center gap-1 rounded-xl bg-[#e05638] px-3 py-2 text-xs font-bold text-white shadow-sm shadow-orange-600/20 hover:bg-[#b9381e] transition active:scale-98"
          >
            <span>View Hospital</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
