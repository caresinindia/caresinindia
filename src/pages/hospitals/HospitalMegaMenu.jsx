import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { REGIONAL_HOSPITALS_TREE } from '../../data/hospitalsData';

const HospitalMegaMenu = ({ onClose }) => {
  const regions = Object.keys(REGIONAL_HOSPITALS_TREE);
  const [activeRegion, setActiveRegion] = useState(regions[0] || 'North India');

  const states = Object.keys(REGIONAL_HOSPITALS_TREE[activeRegion] || {});
  const [activeState, setActiveState] = useState(states[0] || 'Delhi');

  // If activeState is not in current activeRegion states, reset to first state
  const currentStates = Object.keys(REGIONAL_HOSPITALS_TREE[activeRegion] || {});
  const safeState = currentStates.includes(activeState) ? activeState : currentStates[0];

  const currentHospitals =
    (REGIONAL_HOSPITALS_TREE[activeRegion] && REGIONAL_HOSPITALS_TREE[activeRegion][safeState]) || [];

  return (
    <div className="w-full md:w-[920px] lg:w-[1100px] xl:w-[1200px] max-w-[96vw] overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl animate-fadeIn">
      {/* Top Region Tabs: North India, East India, South India, West India */}
      <div className="flex flex-wrap items-center border-b border-slate-200 px-6 sm:px-8 pt-4 gap-4 sm:gap-10">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => {
              setActiveRegion(region);
              const firstState = Object.keys(REGIONAL_HOSPITALS_TREE[region] || {})[0];
              if (firstState) setActiveState(firstState);
            }}
            className={`pb-3 text-sm sm:text-base font-extrabold transition-colors relative ${
              activeRegion === region
                ? 'text-[#e05638] border-b-2 border-[#e05638]'
                : 'text-slate-700 hover:text-[#e05638]'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Body: Left States list & Right Hospitals list */}
      <div className="flex flex-col sm:flex-row min-h-[340px]">
        {/* Left States Column */}
        <div className="w-full sm:w-56 lg:w-64 bg-slate-50/70 p-4 border-b sm:border-b-0 sm:border-r border-slate-100 space-y-1.5 shrink-0">
          {currentStates.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveState(st)}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-xs sm:text-sm font-bold transition ${
                safeState === st
                  ? 'bg-[#fceae6] text-[#b9381e]'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Right Hospitals Grid / List */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto max-h-[420px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentHospitals.map((hosp) => (
              <Link
                key={hosp.id}
                to={`/hospital/${hosp.id}`}
                onClick={onClose}
                className="group flex items-start justify-between rounded-xl border border-slate-100 bg-white p-3 text-xs font-semibold text-slate-800 transition hover:border-[#e05638]/40 hover:bg-[#fceae6]/50 hover:text-[#b9381e] shadow-2xs"
              >
                <span className="leading-snug pr-2 line-clamp-2">{hosp.name}</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#b9381e] shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMegaMenu;
