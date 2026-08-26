import {
  Building2,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Quote,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import React, { useRef } from 'react';

import Container from '../../components/common/Container';

const story = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    title: 'I can finally breathe easily again!',
    description:
      'A 3-month struggle with severe breathing issues ended in a successful procedure at Apollo Hospital. Hear how a timely diagnosis turned everything around.',
    doctorName: 'Dr. Arvind Kumar',
    doctorSpeciality: 'Pulmonologist',
    hospitalName: 'Apollo Hospital',
    patientName: 'Sunita Mehra',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    title: 'Back on my feet after robotic knee surgery',
    description:
      'Thanks to advanced robotic knee replacement and rehabilitation guidance, I regained 100% pain-free mobility within weeks.',
    doctorName: 'Dr. Priya Sharma',
    doctorSpeciality: 'Orthopedic Surgeon',
    hospitalName: 'Fortis Healthcare',
    patientName: 'Rohan Verma',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    title: 'Emergency angioplasty saved my father’s life',
    description:
      'Instant care within the golden hour and round-the-clock cardiac ICU team gave our family a second chance at life and good health.',
    doctorName: 'Dr. Rajesh Patel',
    doctorSpeciality: 'Cardiologist',
    hospitalName: 'Medanta - The Medicity',
    patientName: 'Anil Kapoor',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    title: 'Gentle pediatric care for our 5-year-old',
    description:
      'The doctors were so gentle and compassionate. My daughter felt completely comfortable and cared for throughout her hospital stay.',
    doctorName: 'Dr. Neha Gupta',
    doctorSpeciality: 'Pediatrician',
    hospitalName: 'Max Super Speciality',
    patientName: 'Meera Sharma (Mother)',
  },
];

const PatientStory = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full  py-16">
      <Container>
        {/* Header with Title and Slider Buttons */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
              <HeartHandshake className="h-3.5 w-3.5 text-blue-600" />
              <span>Real Recoveries</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Patient Stories & Experiences
            </h2>
            <p className="text-sm text-slate-600 sm:text-base max-w-2xl">
              Hear inspiring recovery journeys from real patients who found the right care with our trusted doctors and hospitals.
            </p>
          </div>

          {/* Slider Control Buttons */}
         
        </div>

        {/* Single Row Slider of Stories */}
        <div
          ref={sliderRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {story.map((item) => (
            <div
              key={item.id}
              className="group flex w-[320px] sm:w-[350px] flex-shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    {item.patientName}
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-500/90 px-2 py-0.5 rounded-full font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Recovered
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-3">
                  <Quote className="h-6 w-6 text-blue-500 opacity-60" />
                  <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
                    "{item.title}"
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Doctor & Hospital Info */}
                <div className="mt-5 border-t border-slate-100 pt-4 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{item.doctorName}</span>
                    {item.doctorSpeciality && (
                      <span className="text-slate-400">({item.doctorSpeciality})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{item.hospitalName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
         <div className="flex items-center gap-3 self-end sm:self-auto flex items-center justify-center">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
      </Container>
    </section>
  );
};

export default PatientStory;
