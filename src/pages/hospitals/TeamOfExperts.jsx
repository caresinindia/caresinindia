import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { DOCTORS_DATA } from '../../data/doctorsData';

const TeamOfExperts = ({
  hospital,
  onBookDoctor,
  onCallbackDoctor,
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Match doctors for this hospital
  const matchedDoctors = useMemo(() => {
    if (!hospital) return DOCTORS_DATA;

    const hospitalGroupName = (hospital.group || '').toLowerCase();
    const hospitalFullName = (hospital.name || '').toLowerCase();

    let directMatches = DOCTORS_DATA.filter((doc) => {
      const docHosp = (doc.hospital || '').toLowerCase();
      const docHospName = (doc.hospitalName || '').toLowerCase();
      return (
        (hospitalFullName && (docHosp.includes(hospitalFullName) || docHospName.includes(hospitalFullName))) ||
        (hospitalGroupName && (docHosp.includes(hospitalGroupName) || docHospName.includes(hospitalGroupName)))
      );
    });

    if (directMatches.length < 4) {
      const specialtyKeywords = hospital.specialities || [];
      const additionalDocs = DOCTORS_DATA.filter((doc) => {
        const isAlreadyAdded = directMatches.some((d) => d.id === doc.id);
        if (isAlreadyAdded) return false;
        return specialtyKeywords.some((spec) =>
          doc.speciality.toLowerCase().includes(spec.toLowerCase()) ||
          doc.allSpecialities?.some((s) => s.toLowerCase().includes(spec.toLowerCase()))
        );
      });
      directMatches = [...directMatches, ...additionalDocs];
    }

    return directMatches.length > 0 ? directMatches : DOCTORS_DATA;
  }, [hospital]);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <section id="team-of-experts" className="py-10 sm:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Our Team of Experts + View all (Screenshot 5) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Our Team of Experts
          </h2>
          <Link
            to={`/doctors?hospital=${encodeURIComponent(hospital.group || hospital.name)}`}
            className="text-xs sm:text-sm font-semibold text-[#e05638] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Doctor Cards Row (Screenshot 1 & Screenshot 5) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {matchedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Doctor Portrait Photo */}
              <div className="relative h-60 w-full bg-slate-50 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Doctor Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {doctor.position}
                  </p>
                </div>
              </div>

              {/* Bottom Buttons: View Full Profile & Book An Appointment (Screenshot 1 & 5) */}
              <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/50">
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="flex items-center justify-center border-r border-slate-100 py-3 text-[11px] sm:text-xs font-bold text-slate-800 hover:bg-slate-100 transition text-center px-1"
                >
                  View Full Profile
                </Link>

                <button
                  type="button"
                  onClick={() => onBookDoctor(doctor)}
                  className="flex items-center justify-center bg-[#fceae6] py-3 text-[11px] sm:text-xs font-bold text-slate-900 hover:bg-[#fbd9d3] transition text-center px-1"
                >
                  Book An Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Row Controls: < > Navigation Arrows (Screenshot 1) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Doctors"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollLeft
                ? 'text-[#e05638] hover:bg-[#fceae6]'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next Doctors"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollRight
                ? 'text-[#e05638] hover:bg-[#fceae6]'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamOfExperts;
