import { ChevronRight, Search, Sparkles, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ALL_SPECIALISTS, SPECIALIST_COLUMNS } from '../../data/specialistsData';
import SpecialistIcon from './SpecialistIcon';

const SpecialistMegaMenu = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return ALL_SPECIALISTS.filter(
      (spec) =>
        spec.name.toLowerCase().includes(q) ||
        spec.shortDescription.toLowerCase().includes(q) ||
        spec.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="w-full md:w-[920px] lg:w-[1140px] xl:w-[1240px] max-w-[96vw] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-fadeIn transition-all duration-200">
      {/* Top Search Bar & Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold text-slate-800">
            Clinical Specialties & Centers of Excellence (42 Specialties)
          </span>
        </div>

        {/* Quick Search inside Mega Menu */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter specialties..."
            className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body: 4-Column Grid matching reference image */}
      {filteredSearchResults ? (
        // Search Filter View
        <div className="p-6 max-h-[480px] overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 mb-4">
            Found {filteredSearchResults.length} matching specialties:
          </p>
          {filteredSearchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No specialties found matching "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredSearchResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/specialities/${item.id}`}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl border border-slate-100 p-2.5 hover:bg-blue-50/70 hover:border-blue-200 transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                      <SpecialistIcon iconName={item.iconName} className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 truncate">
                      {item.name}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Full 4-Column Reference Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 max-h-[540px] overflow-y-auto">
          {[1, 2, 3, 4].map((colIndex) => (
            <div key={colIndex} className="p-3 space-y-1">
              {SPECIALIST_COLUMNS[colIndex].map((item) => (
                <Link
                  key={item.id}
                  to={`/specialities/${item.id}`}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl px-2.5 py-2 hover:bg-blue-50/70 hover:shadow-2xs transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-1">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-150 group-hover:scale-105"
                      style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                      <SpecialistIcon iconName={item.iconName} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 group-hover:font-semibold transition-colors line-clamp-1 leading-snug">
                      {item.name}
                    </span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Footer Bar: View All Specialties Link */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-3">
        <span className="text-xs text-slate-500 font-medium">
          Looking for a specific treatment or procedure?
        </span>
        <Link
          to="/specialities"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <span>Explore All 42 Specialties Directory</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default SpecialistMegaMenu;
