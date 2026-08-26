import {
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  HeartHandshake,
  MapPin,
  MessageSquare,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  User,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import { PATIENT_REVIEWS_DATA } from '../../data/patientReviewsData';

const PetientReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find active patient by route ID or default to first/newest
  const activeReview = useMemo(() => {
    if (id) {
      const found = PATIENT_REVIEWS_DATA.find((item) => String(item.id) === String(id));
      if (found) return found;
    }
    return PATIENT_REVIEWS_DATA[0];
  }, [id]);

  const [copied, setCopied] = useState(false);

  // Scroll to top on patient switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeReview.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${activeReview.name}'s Medical Review - ${activeReview.treatment}`,
          text: activeReview.reviewTitle,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Other patient reviews excluding active one
  const otherReviews = useMemo(() => {
    return PATIENT_REVIEWS_DATA.filter((item) => item.id !== activeReview.id).slice(0, 4);
  }, [activeReview.id]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <Container>
        {/* Navigation Breadcrumb & Back Button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Stories</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
            </button>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <span>Get Free Doctor Consultation</span>
            </Link>
          </div>
        </div>

        {/* Main Grid: Left Detailed Review & Video (8 Cols), Right Doctor/Hospital Summary (4 Cols) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Video Player & Comprehensive Review Story */}
          <div className="space-y-6 lg:col-span-8">
            {/* 1. Video Player Container */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
              {/* Responsive 16:9 YouTube Video Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeReview.ytId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${activeReview.name}'s Medical Journey Video`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Player Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                    {activeReview.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Medical Outcome
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Duration: {activeReview.duration}</span>
                </div>
              </div>
            </div>

            {/* 2. Patient Header & Story Headline */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
              {/* Top Meta: Location, Age, Treatment */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 font-bold">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {activeReview.name}
                      </h1>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{activeReview.patientAge}</span>
                        <span>•</span>
                        <span>{activeReview.gender}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <MapPin className="h-3.5 w-3.5 text-red-500" />
                          {activeReview.state}, {activeReview.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 border border-amber-200">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-amber-900">
                    {activeReview.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              {/* Story Title */}
              <h2 className="mt-6 text-lg font-bold text-slate-900 sm:text-xl leading-snug">
                "{activeReview.reviewTitle}"
              </h2>

              {/* Treatment Received Highlight Box */}
              <div className="mt-4 rounded-2xl bg-blue-50/80 p-4 border border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-700">Treatment Undergone</span>
                    <p className="text-sm font-bold text-slate-900">{activeReview.treatment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{activeReview.recoveryTime}</span>
                </div>
              </div>

              {/* Detailed Experience Story */}
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Patient Detailed Review & Experience
                </h3>
                <p className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 text-slate-700 italic leading-relaxed">
                  "{activeReview.detailedReview}"
                </p>
              </div>

              {/* Key Clinical Highlights */}
              <div className="mt-8">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  Key Highlights of Medical Care
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {activeReview.keyHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Timeline / Journey Milestones */}
              {activeReview.treatmentMilestones && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Patient Treatment Journey Timeline
                  </h4>
                  <div className="space-y-3">
                    {activeReview.treatmentMilestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="relative flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:bg-slate-50"
                      >
                        <div className="flex h-7 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-[11px] font-bold text-white shadow-sm">
                          {milestone.day}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{milestone.title}</h5>
                          <p className="mt-0.5 text-xs text-slate-600 leading-normal">{milestone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Hospital, Doctor, Cost Comparison & Fast Consultation */}
          <div className="space-y-6 lg:col-span-4">
            {/* Treating Doctor & Hospital Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">
                Medical Team & Hospital
              </h3>

              {/* Doctor Details */}
              <div className="flex items-start gap-3.5 border-b border-slate-100 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shrink-0 shadow-md shadow-blue-500/20">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{activeReview.doctor}</h4>
                  <p className="text-xs text-blue-700 font-semibold">{activeReview.doctorSpeciality}</p>
                  <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {activeReview.doctorExperience}
                  </span>
                </div>
              </div>

              {/* Hospital Details */}
              <div className="mt-4 flex items-start gap-3">
                <Building2 className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-medium">Hospital Visited:</span>
                  <p className="text-xs font-bold text-slate-900">{activeReview.hospital}</p>
                </div>
              </div>

              {/* Cost Savings Card */}
              <div className="mt-5 rounded-2xl bg-emerald-50/90 p-4 border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>Cost Efficiency Advantage:</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-emerald-900">
                  {activeReview.costSavings}
                </p>
              </div>

              {/* Book Appointment CTA Button */}
              <Link
                to="/book-appointment"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 px-4 text-center text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-98"
              >
                <span>Consult with {activeReview.doctor.split(' ')[1] || 'Doctor'}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust & Satisfaction Breakdown */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-3.5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                Satisfaction Ratings
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Surgical Expertise & Doctor Care</span>
                    <span className="text-amber-600 font-bold">5.0 / 5.0</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-full w-full rounded-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Hospital Infrastructure & Hygiene</span>
                    <span className="text-amber-600 font-bold">5.0 / 5.0</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-full w-full rounded-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>International Patient Support</span>
                    <span className="text-amber-600 font-bold">4.9 / 5.0</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-full w-[98%] rounded-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Value for Money</span>
                    <span className="text-amber-600 font-bold">5.0 / 5.0</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-full w-full rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Assistance Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-xl">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 border border-blue-400/30">
                <HeartHandshake className="h-3.5 w-3.5" />
                Free Medical Assessment
              </span>
              <h4 className="mt-3 text-base font-bold text-white">
                Have a medical query like {activeReview.name}?
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Send your reports to get a complimentary medical opinion from top specialists in India.
              </p>
              <Link
                to="/book-appointment"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
              >
                Send Medical Reports
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Other Patient Video Stories */}
        <div className="mt-16 border-t border-slate-200/80 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Explore More Patient Stories</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Watch how other international patients recovered with our partner doctors.
              </p>
            </div>
            <Link
              to="/blog"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherReviews.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/patient-review/${item.id}`)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md cursor-pointer"
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${item.ytId}/hqdefault.jpg`}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {item.duration}
                  </div>
                </div>

                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-[11px] font-bold text-amber-900 bg-amber-50 px-1 rounded border border-amber-200">
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-red-500" />
                      {item.state}, {item.country}
                    </p>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1 mt-1">
                      {item.treatment}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-blue-600 pt-2 border-t border-slate-100 flex items-center gap-0.5">
                    Read Full Case Study <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PetientReview;
