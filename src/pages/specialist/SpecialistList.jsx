import {
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Filter,
  Grid,
  Heart,
  LayoutGrid,
  PhoneCall,
  RotateCcw,
  Search,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/common/Container';
import {
  ALL_SPECIALISTS,
  SPECIALIST_COLUMNS,
  SPECIALTY_CATEGORIES,
} from '../../data/specialistsData';
import SpecialistCard from './SpecialistCard';
import SpecialistIcon from './SpecialistIcon';

const ALPHABETS = ['ALL', ...Array.from(new Set(ALL_SPECIALISTS.map((s) => s.name[0].toUpperCase()))).sort()];

const SpecialistList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Specialties');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'columns'

  // Filter logic
  const filteredSpecialists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ALL_SPECIALISTS.filter((item) => {
      // 1. Search Query
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.procedures.some((p) => p.toLowerCase().includes(q)) ||
        item.conditions.some((c) => c.toLowerCase().includes(q));

      // 2. Category Filter
      const matchCategory =
        selectedCategory === 'All Specialties' || item.category === selectedCategory;

      // 3. Alphabetical Filter
      const matchLetter =
        selectedLetter === 'ALL' || item.name.toUpperCase().startsWith(selectedLetter);

      return matchSearch && matchCategory && matchLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Specialties');
    setSelectedLetter('ALL');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All Specialties' || selectedLetter !== 'ALL';

  return (
    <div className="w-full bg-slate-50/50 pb-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-14 sm:py-16 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Comprehensive Centers of Clinical Excellence</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Medical Specialties & Departments
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Explore 42 specialized medical departments staffed by world-renowned surgeons, physicians, and cutting-edge technology across India.
            </p>

            {/* Quick Search Bar */}
            <div className="pt-2">
              <div className="relative mx-auto max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search specialty, procedure (e.g. Angioplasty, IVF, Knee)..."
                  className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-400 shadow-xl backdrop-blur-md transition focus:border-blue-400 focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4 sm:gap-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-blue-400 sm:text-2xl">42</div>
                <div className="text-xs text-slate-300">Specialty Categories</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-blue-400 sm:text-2xl">1,500+</div>
                <div className="text-xs text-slate-300">Expert Specialists</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-blue-400 sm:text-2xl">99.2%</div>
                <div className="text-xs text-slate-300">Clinical Success Rate</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-blue-400 sm:text-2xl">24/7</div>
                <div className="text-xs text-slate-300">Emergency & Care</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Body Section */}
      <Container className="mt-8">
        {/* Filter Controls & Layout Toggle */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2">
              {SPECIALTY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Grid vs 4-Columns */}
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200 p-1 bg-slate-50 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Card Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('columns')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  viewMode === 'columns'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>4-Column Reference</span>
              </button>
            </div>
          </div>

          {/* A-Z Letter Filter Bar */}
          <div className="flex flex-wrap items-center gap-1 border-t border-slate-100 pt-3">
            <span className="text-xs font-semibold text-slate-500 mr-2">A-Z Index:</span>
            {ALPHABETS.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`h-7 min-w-[28px] rounded-lg px-1.5 text-xs font-bold transition ${
                  selectedLetter === letter
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {letter}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredSpecialists.length}</strong> of{' '}
            {ALL_SPECIALISTS.length} medical specialties
          </span>
          {searchQuery && (
            <span>
              Searching for: <span className="font-semibold text-slate-800">"{searchQuery}"</span>
            </span>
          )}
        </div>

        {/* View Mode: Card Grid View */}
        {viewMode === 'grid' || hasActiveFilters ? (
          filteredSpecialists.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No specialties matched your filters</h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Try adjusting your search terms or reset the filters to browse all 42 medical departments.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          )
        ) : (
          /* View Mode: 4-Column Layout matching Reference Screenshot exactly */
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>Reference 4-Column Specialty Directory (42 Specialties)</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {[1, 2, 3, 4].map((colIndex) => (
                <div key={colIndex} className="p-3 space-y-1.5">
                  <div className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 px-2.5">
                    Category Group {colIndex}
                  </div>
                  {SPECIALIST_COLUMNS[colIndex].map((item) => (
                    <Link
                      key={item.id}
                      to={`/specialities/${item.id}`}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-blue-50/80 transition shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-1">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition group-hover:scale-105"
                          style={{ backgroundColor: item.bgColor, color: item.color }}
                        >
                          <SpecialistIcon iconName={item.iconName} className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {item.shortDescription}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Help & Consultation Promo Card */}
        <div className="mt-12 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Free Medical Advice</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Not sure which specialist or department to choose?
              </h3>
              <p className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with our medical coordination team. We evaluate your symptoms, medical reports, and recommend the right expert doctors and hospitals for you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Talk to Care Specialist
              </Link>
              <a
                href="tel:1800000000"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
              >
                <PhoneCall className="h-4 w-4 text-blue-600" />
                <span>1800-000-000</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SpecialistList;
