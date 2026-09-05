import { ShieldCheck } from 'lucide-react';
import React from 'react';

const HospitalAccreditations = ({ hospital }) => {
  const accreditations = hospital.accreditations || [
    {
      title: 'NABH',
      subtitle: 'National Accreditation Board for Hospitals & Healthcare Providers',
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: Accreditations for [Hospital Name] (Screenshot 3) */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
          Accreditations for {hospital.name}
        </h2>

        {/* Accreditations Grid (Screenshot 3) */}
        <div className="flex flex-wrap gap-5">
          {accreditations.map((acc, idx) => (
            <div
              key={idx}
              className="w-56 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs text-center flex flex-col items-center justify-center transition hover:shadow-md"
            >
              {/* Circular NABH Emblem Badge */}
              <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-600 bg-white shadow-2xs">
                <div className="flex flex-col items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  <span className="text-[8px] font-black text-red-600 tracking-tighter">NABH</span>
                </div>
              </div>

              <h3 className="text-sm font-black text-slate-900">{acc.title}</h3>
              <p className="mt-1 text-[11px] text-slate-600 font-medium leading-tight">
                {acc.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalAccreditations;
