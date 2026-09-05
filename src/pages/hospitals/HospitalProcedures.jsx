import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HospitalProcedures = ({ hospital }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const procedures = hospital.procedures || [
    {
      id: 'proc-1',
      title: 'Active Surveillance for Prostate Cancer: Purpose, Protocol & Outcomes',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'proc-2',
      title: 'BRCA Gene Test for Breast Cancer: A Guide to Genetic Risk and Proactive Care',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'proc-3',
      title: 'Blood & Bone Marrow Donation: The Gift of Life',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'proc-4',
      title: 'Blood Donation: The Ultimate Act of Giving',
      image: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=600',
    },
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
    const scrollAmount = direction === 'left' ? -280 : 280;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: Medical Procedures for [Hospital Name] + View all (Screenshot 3) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Medical Procedures for {hospital.name}
          </h2>
          <Link
            to="/blog"
            className="text-xs sm:text-sm font-semibold text-[#e05638] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Procedures Row (Screenshot 3) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {procedures.map((proc) => (
            <div
              key={proc.id}
              className="group relative w-[240px] sm:w-[270px] shrink-0 snap-start overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-100 cursor-pointer"
            >
              <img
                src={proc.image}
                alt={proc.title}
                className="h-44 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Text overlay on bottom */}
              <div className="absolute bottom-0 inset-x-0 p-3.5">
                <p className="text-xs font-semibold text-white leading-snug line-clamp-2">
                  {proc.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Controls: < > Navigation Arrows (Screenshot 3) */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Procedure"
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
            aria-label="Next Procedure"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollRight ? 'text-[#e05638] hover:bg-[#fceae6]' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HospitalProcedures;
