import { CheckCircle2, PhoneCall, X } from 'lucide-react';
import React, { useState } from 'react';

const CallbackModal = ({ doctor, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Within 15 Minutes');
  const [query, setQuery] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !doctor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
              <PhoneCall className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Request a Free Callback</h3>
              <p className="text-[11px] text-emerald-100">Direct Medical Assistance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-4 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Callback Requested!</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our senior healthcare coordinator will call you at{' '}
                <strong className="text-slate-800">{phone}</strong> ({preferredTime}) regarding{' '}
                <strong className="text-blue-600">{doctor.name}</strong>'s OPD consultation.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 rounded-xl bg-emerald-600 px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200/80">
                <p className="text-[11px] text-slate-500 font-medium">Doctor Consultation for:</p>
                <h5 className="text-xs font-bold text-slate-900">{doctor.name}</h5>
                <p className="text-[11px] text-blue-600 font-semibold">{doctor.hospitalName}</p>
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-red-700 border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Singh"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (for Callback) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Time for Call
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Within 15 Minutes">Within 15 Minutes (Instant)</option>
                  <option value="Today Afternoon (12 PM - 4 PM)">Today Afternoon (12 PM - 4 PM)</option>
                  <option value="Today Evening (4 PM - 8 PM)">Today Evening (4 PM - 8 PM)</option>
                  <option value="Tomorrow Morning (9 AM - 12 PM)">Tomorrow Morning (9 AM - 12 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Query or Medical Condition (Optional)
                </label>
                <textarea
                  rows={2}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Want opinion on surgery / appointment timing..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <PhoneCall className="h-4 w-4" />
                <span>{isSubmitting ? 'Requesting...' : 'Request Free Callback Now'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;
