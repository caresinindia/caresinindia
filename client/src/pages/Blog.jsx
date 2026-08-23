import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Play,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  User,
  Video,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '../components/common/Container';
import { PATIENT_REVIEWS_DATA } from '../data/patientReviewsData';

const CATEGORIES = [
  'All Treatments',
  'Orthopedics',
  'Cardiology',
  'Organ Transplant',
  'Oncology',
  'IVF & Fertility',
  'Spine & Neuro',
  'Dental Care',
  'Urology',
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 :  3
  );

  // MatchMedia listener for responsive pagination (1 on mobile, 4 on tablet, 6 on desktop)
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const tabletQuery = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    const handleLayout = () =>
      setItemsPerPage(mobileQuery.matches ? 1 : tabletQuery.matches ? 4 : 6);

    mobileQuery.addEventListener('change', handleLayout);
    tabletQuery.addEventListener('change', handleLayout);
    return () => {
      mobileQuery.removeEventListener('change', handleLayout);
      tabletQuery.removeEventListener('change', handleLayout);
    };
  }, []);

  // Filter & Search stories
  const filteredStories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PATIENT_REVIEWS_DATA.filter((item) => {
      const matchCat =
        selectedCategory === 'All Treatments' || item.category === selectedCategory;
      if (!q) return matchCat;
      return (
        matchCat &&
        (item.name.toLowerCase().includes(q) ||
          item.treatment.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.country.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredStories.length / itemsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStories.slice(start, start + itemsPerPage);
  }, [filteredStories, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page, e) => {
      if (e) e.preventDefault();
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
    },
    [totalPages]
  );

  // Escape key to close modal
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActiveModal(null);
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeModal]);

  return (
    <section id="patient-blog-section" className="w-full py-10 sm:py-14">
      <Container>
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-semibold text-red-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <Video className="h-3.5 w-3.5 text-red-600" />
              <span>Real Patient Video Stories</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Patient Recovery & Video Blogs
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm max-w-2xl">
              Watch real experiences of patients who came to India for specialized treatments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm text-xs">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">4.98/5</span>
              <span className="text-slate-500 text-[11px]">(1,200+ Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm text-xs">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="font-bold text-slate-800">45+ Countries</span>
            </div>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name, condition, state or country..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm"
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
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
              <Filter className="h-3.5 w-3.5 text-blue-600" />
              <span>
                Total <strong className="text-slate-800">{filteredStories.length}</strong> Stories
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Story Cards Grid */}
        {paginatedStories.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedStories.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                {/* Video Thumbnail */}
                <div
                  className="relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-900"
                  onClick={() => setActiveModal(item)}
                  title={`Watch ${item.name}'s story`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.ytId}/hqdefault.jpg`}
                    alt={`${item.name} - ${item.treatment}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md border border-white/20">
                      <MapPin className="h-3 w-3 text-red-400" />
                      <span>{item.country}</span>
                    </span>
                    <div className="flex items-center gap-1">
                      {item.isNew && (
                        <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white uppercase animate-pulse">
                          New
                        </span>
                      )}
                      <span className="rounded bg-blue-600/90 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-600/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
                      <Play className="h-5 w-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2.5 flex items-center gap-1 bg-black/75 px-1.5 py-0.5 rounded text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 border border-amber-200/80 shrink-0">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-900">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="truncate">
                        From: <strong className="text-slate-800">{item.state}, {item.country}</strong>
                      </span>
                    </div>

                    <div className="rounded-lg bg-blue-50/80 p-2 border border-blue-100">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-800">
                        <Stethoscope className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        <span>Patient for:</span>
                      </div>
                      <p className="mt-0.5 text-xs font-bold text-slate-900 leading-tight line-clamp-1">
                        {item.treatment}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(item)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 py-1.5 px-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-98"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Watch Story</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/patient-review/${item.id}`)}
                      className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                    >
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <Search className="h-8 w-8 text-slate-300" />
            <h3 className="mt-2 text-sm font-bold text-slate-900">No Patient Stories Found</h3>
            <p className="mt-1 text-xs text-slate-500">
              No matching stories for "{searchQuery}". Try another keyword.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Treatments');
              }}
              className="mt-3 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-4 sm:flex-row">
            <div className="text-xs text-slate-500 font-medium">
              Showing{' '}
              <strong className="text-slate-800">
                {(currentPage - 1) * itemsPerPage + 1}
                {itemsPerPage > 1
                  ? `–${Math.min(currentPage * itemsPerPage, filteredStories.length)}`
                  : ''}
              </strong>{' '}
              of <strong className="text-slate-800">{filteredStories.length}</strong> patient blogs
              (Page {currentPage} of {totalPages})
            </div>

            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
              <button
                type="button"
                onClick={(e) => handlePageChange(currentPage - 1, e)}
                disabled={currentPage === 1}
                className="flex flex-1 sm:flex-initial h-9 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={(e) => handlePageChange(num, e)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                      currentPage === num
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="sm:hidden flex items-center justify-center px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                {currentPage} / {totalPages}
              </div>

              <button
                type="button"
                onClick={(e) => handlePageChange(currentPage + 1, e)}
                disabled={currentPage === totalPages}
                className="flex flex-1 sm:flex-initial h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 text-xs font-bold shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Container>

      {/* Modal Video Player with Direct Link to PetientReview Page */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                    {activeModal.name} - {activeModal.treatment}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {activeModal.state}, {activeModal.country} • {activeModal.hospital}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-red-600 hover:text-white"
                aria-label="Close video player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeModal.ytId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${activeModal.name} Story`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-slate-950 p-3.5 sm:p-4 text-white border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[11px] font-semibold text-blue-400 border border-blue-500/30">
                  {activeModal.category}
                </span>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {activeModal.rating.toFixed(1)} / 5.0
                </span>
              </div>

              {/* Action navigating to PetientReview page */}
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  navigate(`/patient-review/${activeModal.id}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-500"
              >
                <span>View Full Patient Review & Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
