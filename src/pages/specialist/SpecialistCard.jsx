import { ArrowUpRight, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import SpecialistIcon from './SpecialistIcon';

const SpecialistCard = ({ specialist }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div>
        {/* Top Header: Icon & Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: specialist.bgColor, color: specialist.color }}
          >
            <SpecialistIcon iconName={specialist.iconName} className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            {specialist.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {specialist.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
          {specialist.shortDescription}
        </p>

        {/* Key Procedures Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {specialist.procedures.slice(0, 3).map((proc, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {proc.length > 24 ? proc.substring(0, 22) + '...' : proc}
            </span>
          ))}
          {specialist.procedures.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-blue-50/50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
              +{specialist.procedures.length - 3} more
            </span>
          )}
        </div>

        {/* Success & Doctors Count Badges */}
        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-semibold text-slate-700">{specialist.doctorsCount}</span> Doctors
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-700">{specialist.successRate}</span> Success
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-2">
        <Link
          to={`/specialities/${specialist.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-blue-600 hover:text-white"
        >
          <span>View Overview</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to={`/doctors?speciality=${encodeURIComponent(specialist.name)}`}
          title={`Find ${specialist.name} Doctors`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SpecialistCard;
