import {
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Heart,
  PhoneCall,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../components/common/Container';

const data = [
  {
    id: 1,
    title: 'Book Appointment',
    description: 'Book an appointment with the best doctors',
    icon: Calendar,
    path: '/book-appointment',
  },
  {
    id: 2,
    title: 'Find a Doctor',
    description: 'Find the best doctors near you',
    icon: Stethoscope,
    path: '/doctors',
  },
  {
    id: 3,
    title: 'Find a Hospital',
    description: 'Find the best hospitals near you',
    icon: Building2,
    path: '/hospitals',
  },
  {
    id: 4,
    title: 'Specialities',
    description: 'Find the best specialities near you',
    icon: Heart,
    path: '/specialities',
  },
];

const HomeBar = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 bg-slate-50/60 border-b border-slate-100">
      <Container>
        {/* 2-Part Grid: Left Side (Information/Consultations) & Right Side (Quick Actions Grid) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Part 1: Left Side - Help & Consultation */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>24/7 Healthcare Assistance</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                We can Help You — To Book Appointments or Consultations
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Get seamless access to top-rated doctors, hospitals, and specialized medical care across India. We ensure fast, reliable, and verified healthcare services tailored for you.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1 sm:gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Verified Specialists</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Top Hospitals</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>24/7 Helpline Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/book-appointment')}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Talk to AI Doctor
              </button>
              <a
                href="tel:1800000000"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <PhoneCall className="h-4 w-4 text-blue-600" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Part 2: Right Side - 2-Column Action Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.map((item) => {   
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(item.path);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div>
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center text-xs font-medium text-blue-600 transition-transform group-hover:translate-x-1">
                    <span>Explore</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeBar;
