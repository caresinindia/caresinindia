import {
  Building2,
  MapPin,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import {
  HOSPITAL_CHAINS,
  HOSPITAL_STATES,
  HOSPITAL_TOP_CITIES,
  HOSPITAL_ZONES,
  HOSPITALS_DATA,
} from '../../data/hospitalsData';
import HospitalCard from './HospitalCard';
import HospitalContactModal from './HospitalContactModal';
import HospitalMapModal from './HospitalMapModal';

const HospitalList = () => {
  const [searchParams] = useSearchParams();
  const initialZone = searchParams.get('zone') || 'all';

  const [selectedZone, setSelectedZone] = useState(initialZone);
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedChain, setSelectedChain] = useState('All Networks');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeCallHospital, setActiveCallHospital] = useState(null);
  const [activeMapHospital, setActiveMapHospital] = useState(null);

  // Filter logic
  const filteredHospitals = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return HOSPITALS_DATA.filter((hospital) => {
      // 1. Search Query
      const matchSearch =
        !q ||
        hospital.name.toLowerCase().includes(q) ||
        hospital.city.toLowerCase().includes(q) ||
        hospital.state.toLowerCase().includes(q) ||
        hospital.group?.toLowerCase().includes(q) ||
        hospital.specialities?.some((s) => s.toLowerCase().includes(q));

      // 2. Zone Filter
      const matchZone = selectedZone === 'all' || hospital.zone.toLowerCase() === selectedZone.toLowerCase();

      // 3. State Filter
      const matchState = selectedState === 'All States' || hospital.state.toLowerCase() === selectedState.toLowerCase();

      // 4. City Filter
      const matchCity = selectedCity === 'All Cities' || hospital.city.toLowerCase() === selectedCity.toLowerCase();

      // 5. Network / Chain Filter
      const matchChain =
        selectedChain === 'All Networks' ||
        hospital.group?.toLowerCase().includes(selectedChain.toLowerCase()) ||
        hospital.name.toLowerCase().includes(selectedChain.toLowerCase());

      return matchSearch && matchZone && matchState && matchCity && matchChain;
    });
  }, [searchQuery, selectedZone, selectedState, selectedCity, selectedChain]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedZone('all');
    setSelectedState('All States');
    setSelectedCity('All Cities');
    setSelectedChain('All Networks');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedZone !== 'all' ||
    selectedState !== 'All States' ||
    selectedCity !== 'All Cities' ||
    selectedChain !== 'All Networks';

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 sm:py-12">
      <Container>
        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span>Pan-India JCI & NABH Accredited Hospitals</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Explore Top Hospitals Across India
              </h1>
              <p className="text-xs text-slate-300 sm:text-sm leading-relaxed">
                Discover world-class tertiary and quaternary hospitals across North, South, East, and West India. Direct OPD booking, 24x7 emergency contacts, and verified clinical teams.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-3 lg:w-72 shrink-0">
              <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/10 text-center">
                <span className="text-xl font-black text-amber-400">100%</span>
                <p className="text-[11px] text-slate-300 font-medium">JCI / NABH Verified</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/10 text-center">
                <span className="text-xl font-black text-emerald-400">24x7</span>
                <p className="text-[11px] text-slate-300 font-medium">Emergency Triage</p>
              </div>
            </div>
          </div>

          {/* Search Bar inside Hero Header */}
          <div className="mt-8">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital by name, city, state, or specialty (e.g. Fortis Cancer Institute, Medanta)..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-10 text-sm text-white placeholder-slate-400 backdrop-blur-md transition focus:border-[#e05638] focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#e05638]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Zone Diversity Filter Tabs (North, East, South, West) */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {HOSPITAL_ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(zone.id)}
              className={`shrink-0 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                selectedZone === zone.id
                  ? 'bg-[#e05638] text-white shadow-md shadow-orange-600/30 scale-102'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#e05638] hover:bg-[#fceae6]/40'
              }`}
            >
              <span>{zone.name}</span>
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  selectedZone === zone.id ? 'bg-[#b9381e] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {zone.count}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Dropdowns Bar */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {/* State Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  State / Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#e05638] focus:outline-none"
                >
                  {HOSPITAL_STATES.map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Top Cities
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#e05638] focus:outline-none"
                >
                  {HOSPITAL_TOP_CITIES.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Network / Group Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Hospital Network
                </label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#e05638] focus:outline-none"
                >
                  {HOSPITAL_CHAINS.map((chain, i) => (
                    <option key={i} value={chain}>
                      {chain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count & Reset Button */}
            <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <span className="text-xs font-bold text-slate-600">
                Found <span className="text-[#e05638] font-extrabold">{filteredHospitals.length}</span> Hospitals
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="mt-8">
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onQuickCall={(h) => setActiveCallHospital(h)}
                  onQuickMap={(h) => setActiveMapHospital(h)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-[#e05638] mx-auto">
                <Building2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No Hospitals Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We couldn’t find any hospitals matching your current search and filter criteria. Try resetting filters to explore all locations.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#e05638] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-600/20 hover:bg-[#b9381e] transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* Quick Modals */}
      <HospitalContactModal
        hospital={activeCallHospital}
        isOpen={Boolean(activeCallHospital)}
        onClose={() => setActiveCallHospital(null)}
      />

      <HospitalMapModal
        hospital={activeMapHospital}
        isOpen={Boolean(activeMapHospital)}
        onClose={() => setActiveMapHospital(null)}
      />
    </div>
  );
};

export default HospitalList;
