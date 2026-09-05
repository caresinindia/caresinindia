import {
  Activity,
  Baby,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Dna,
  Heart,
  Pill,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Syringe,
  UserCheck,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const getSpecialityIconVisual = (name, iconType) => {
  switch (iconType) {
    case 'surgery':
      return <Activity className="h-8 w-8 text-purple-600" />;
    case 'dna':
      return <Dna className="h-8 w-8 text-pink-600" />;
    case 'cell':
      return <ShieldAlert className="h-8 w-8 text-purple-600" />;
    case 'blood':
      return <Syringe className="h-8 w-8 text-purple-600" />;
    case 'baby':
      return <Baby className="h-8 w-8 text-indigo-600" />;
    case 'spine':
      return <Brain className="h-8 w-8 text-purple-600" />;
    case 'doctor':
      return <UserCheck className="h-8 w-8 text-purple-700" />;
    case 'heart':
      return <Heart className="h-8 w-8 text-cyan-600" />;
    default:
      return <Stethoscope className="h-8 w-8 text-purple-600" />;
  }
};

const HospitalSpecialitySlider = ({ hospital }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Accordion open states
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);

  const specialities = hospital.specialityDetails || [
    { name: 'Surgical Oncology', iconType: 'surgery' },
    { name: 'Hemato-Oncology', iconType: 'dna' },
    { name: 'Oncology', iconType: 'cell' },
    { name: 'Haematology and BMT', iconType: 'blood' },
    { name: 'Paediatric Oncology', iconType: 'baby' },
    { name: 'Pain Management', iconType: 'spine' },
    { name: 'General Physician', iconType: 'doctor' },
    { name: 'Thoracic Oncology', iconType: 'heart' },
  ];

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
    const scrollAmount = direction === 'left' ? -260 : 260;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Speciality + View all (Screenshot 1) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Speciality
          </h2>
          <Link
            to={`/specialities`}
            className="text-xs sm:text-sm font-semibold text-[#e05638] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Horizontal Speciality Cards Row (Screenshot 1) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {specialities.map((item, idx) => (
            <Link
              key={idx}
              to={`/doctors?speciality=${encodeURIComponent(item.name)}&hospital=${encodeURIComponent(
                hospital.group || hospital.name
              )}`}
              className="w-[140px] sm:w-[155px] shrink-0 snap-start rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:shadow-md hover:border-purple-300 flex flex-col items-center justify-between min-h-[160px]"
            >
              {/* Circular Icon in Pastel Background */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50/80 mb-3 group-hover:scale-105 transition-transform">
                {getSpecialityIconVisual(item.name, item.iconType)}
              </div>

              <span className="text-xs font-semibold text-slate-900 leading-snug">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Centered Row Controls: < > Navigation Arrows (Screenshot 1) */}
        <div className="mt-4 mb-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Speciality"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollLeft ? 'text-[#e05638] hover:bg-[#fceae6]' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next Speciality"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollRight ? 'text-[#e05638] hover:bg-[#fceae6]' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Accordions (Screenshot 1) */}
        <div className="space-y-3">
          {/* Accordion 1: Hospital Overview Accordion */}
          <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setIsOverviewOpen(!isOverviewOpen)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
            >
              <span className="text-sm font-bold text-slate-900">
                {hospital.overviewAccordion?.title || hospital.name}
              </span>
              {isOverviewOpen ? (
                <ChevronUp className="h-5 w-5 text-slate-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-500" />
              )}
            </button>
            {isOverviewOpen && (
              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {hospital.overviewAccordion?.content || hospital.about}
              </div>
            )}
          </div>

          {/* Accordion 2: Seamless Cashless Care with Insurance Partners */}
          <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
            >
              <span className="text-sm font-bold text-slate-900">
                {hospital.insuranceAccordion?.title ||
                  `Seamless Cashless Care at ${hospital.shortName || hospital.name} with Trusted Insurance Partners`}
              </span>
              {isInsuranceOpen ? (
                <ChevronUp className="h-5 w-5 text-slate-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-500" />
              )}
            </button>
            {isInsuranceOpen && (
              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3">
                <p>
                  {hospital.insuranceAccordion?.content ||
                    'We offer comprehensive 100% cashless hospitalization support with all leading insurance providers and TPAs. Contact our desk for 30-minute approval.'}
                </p>
                {hospital.insurances && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hospital.insurances.map((ins, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                      >
                        ✓ {ins}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalSpecialitySlider;
