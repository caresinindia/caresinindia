import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Play,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HospitalArticlesAndVideos = ({ hospital }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const articles = hospital.articles || [
    {
      id: 'art-1',
      title: 'बच्चों में एप्लास्टिक एनीमिया क्या है - लक्षण कारण और उपचार',
      category: 'Paediatrics',
      date: 'Aug 18, 2026',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'art-2',
      title: 'कैंसर क्यों होता है - कारण लक्षण जोखिम कारक और इलाज',
      category: 'Oncology',
      date: 'Aug 14, 2026',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'art-3',
      title: 'थैलेसीमिया क्या है? लक्षण, कारण, जांच और आधुनिक इलाज के विकल्प',
      category: 'Haematology',
      date: 'May 28, 2026',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'art-4',
      title: 'कैंसर से बचाव के लिए जरूरी स्वस्थ आदतें और रूटीन स्क्रीनिंग',
      category: 'Paediatrics',
      date: 'Aug 18, 2026',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
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
    <section className="py-8 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Health Articles Row (Screenshot 4) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {articles.map((art) => (
            <Link
              key={art.id}
              to="/blog"
              className="w-[240px] sm:w-[270px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Brand & Category Tag */}
                <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Category ribbon across bottom of image */}
                  <div className="absolute bottom-0 left-0 bg-[#7c3aed] text-white text-[10px] font-bold px-3 py-1 rounded-tr-lg">
                    {art.category}
                  </div>
                </div>

                {/* Article Title */}
                <div className="p-3.5">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-relaxed">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-[11px] text-slate-400 font-medium">
                    | {art.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Centered Controls: < > Navigation Arrows */}
        <div className="mt-4 mb-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Article"
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
            aria-label="Next Article"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              canScrollRight ? 'text-[#e05638] hover:bg-[#fceae6]' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* 2. Explore Videos Section (Screenshot 4) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Explore Videos
            </h2>
            <Link
              to="/blog"
              className="text-xs sm:text-sm font-semibold text-[#e05638] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="max-w-md rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-lg transition">
            <div className="relative h-56 w-full bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800"
                alt="Doctor Video"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {hospital.shortName || 'Fortis Healthcare'}
                  </span>
                  <p className="mt-2 text-xs sm:text-sm font-extrabold text-slate-900 max-w-[200px] leading-tight">
                    "It's probably nothing" isn't a diagnosis. Our Doctors help understand what's really going on.
                  </p>
                </div>
              </div>

              {/* Centered Play Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/85 text-white shadow-xl backdrop-blur-xs transition hover:scale-110 hover:bg-rose-600"
              >
                <Play className="h-5 w-5 fill-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Action Button on Bottom Right (Visible in all screenshots) */}
        <a
          href="https://wa.me/911142776222?text=Hello%20Care%20in%20India,%20I%20want%20to%20know%20more%20about%20hospital%20services"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with Hospital Desk on WhatsApp"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a884] text-white shadow-2xl transition hover:scale-110 hover:bg-[#008f6f] active:scale-95 border-2 border-white"
        >
          <MessageCircle className="h-7 w-7 fill-white" />
        </a>

        {/* Video Player Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-2xl">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-3 right-3 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
              >
                ✕
              </button>
              <div className="aspect-video w-full flex items-center justify-center bg-slate-900 text-white">
                <iframe
                  title="Hospital Overview Video"
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HospitalArticlesAndVideos;
