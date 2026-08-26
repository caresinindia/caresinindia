import {
  Calendar as CalendarIcon,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';

// Format helper to YYYY-MM-DD
const toISODate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format to user-friendly string
const formatDateLabel = (d, today) => {
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = d.getDate();
  const year = d.getFullYear();

  if (diffDays === 0) return `Today, ${dayNum} ${monthName}`;
  if (diffDays === 1) return `Tomorrow, ${dayNum} ${monthName}`;
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
};

const AppointmentCalendar = ({ selectedDate, onSelectDate, maxDays = 35 }) => {
  const scrollRef = useRef(null);
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  // Today normalized to midnight
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Max selectable date (Today + 35 days)
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(today.getDate() + maxDays);
    return d;
  }, [today, maxDays]);

  // Generate 36 days list (Day 0 to Day 35)
  const daysList = useMemo(() => {
    const list = [];
    for (let i = 0; i <= maxDays; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = toISODate(d);
      const label = formatDateLabel(d, today);
      list.push({
        date: d,
        iso,
        label,
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }
    return list;
  }, [today, maxDays]);

  // Calendar month view state
  const [viewMonthDate, setViewMonthDate] = useState(() => new Date(today));

  const viewYear = viewMonthDate.getFullYear();
  const viewMonth = viewMonthDate.getMonth();

  // Days in month grid
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon, ...

    const grid = [];
    // Padding before 1st of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      grid.push({ empty: true, key: `empty-${i}` });
    }

    // Actual month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      d.setHours(0, 0, 0, 0);
      const iso = toISODate(d);
      const isPast = d < today;
      const isBeyondMax = d > maxDate;
      const isSelectable = !isPast && !isBeyondMax;
      const label = formatDateLabel(d, today);

      grid.push({
        empty: false,
        key: iso,
        date: d,
        dayNum: day,
        iso,
        label,
        isSelectable,
        isToday: d.getTime() === today.getTime(),
      });
    }

    return grid;
  }, [viewYear, viewMonth, today, maxDate]);

  // Scroll horizontal date strip
  const scrollStrip = (direction) => {
    if (scrollRef.current) {
      const amount = 240;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  // Month navigation in calendar
  const canGoPrevMonth = useMemo(() => {
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0);
    return prevMonthLastDay >= today;
  }, [viewYear, viewMonth, today]);

  const canGoNextMonth = useMemo(() => {
    const nextMonthFirstDay = new Date(viewYear, viewMonth + 1, 1);
    return nextMonthFirstDay <= maxDate;
  }, [viewYear, viewMonth, maxDate]);

  const handlePrevMonth = () => {
    if (canGoPrevMonth) {
      setViewMonthDate(new Date(viewYear, viewMonth - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (canGoNextMonth) {
      setViewMonthDate(new Date(viewYear, viewMonth + 1, 1));
    }
  };

  const handleDateSelect = (label) => {
    onSelectDate(label);
    setShowFullCalendar(false);
  };

  return (
    <div className="space-y-3">
      {/* Top Header: Label, 35-day badge, and Calendar toggle button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-blue-600" />
            <span>Select Appointment Date</span>
          </label>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
            Next {maxDays} Days Open
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowFullCalendar((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold transition ${
            showFullCalendar
              ? 'bg-blue-600 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600'
          }`}
        >
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{showFullCalendar ? 'Close Calendar' : 'Full Calendar'}</span>
        </button>
      </div>

      {/* Selected Date Indicator Banner */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 border border-slate-200 text-xs">
        <span className="text-slate-500 font-medium">Selected Date:</span>
        <span className="font-extrabold text-blue-700">{selectedDate}</span>
      </div>

      {/* VIEW 1: Horizontal Scrollable 35-Day Strip */}
      {!showFullCalendar && (
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            type="button"
            onClick={() => scrollStrip('left')}
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Scroll dates left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto py-1 px-1 scroll-smooth snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {daysList.map((item) => {
              const isSelected = selectedDate === item.label;
              return (
                <button
                  key={item.iso}
                  type="button"
                  onClick={() => handleDateSelect(item.label)}
                  className={`flex h-16 w-16 sm:w-20 shrink-0 snap-start flex-col items-center justify-center rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {item.dayName}
                  </span>
                  <span className="text-sm font-extrabold leading-tight">{item.dayNum}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {item.monthName}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollStrip('right')}
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Scroll dates right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* VIEW 2: Full Interactive Month Calendar Grid */}
      {showFullCalendar && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3 animate-fadeIn">
          {/* Calendar Month Navigation Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold text-slate-900">
              {viewMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={!canGoNextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarGrid.map((cell) => {
              if (cell.empty) {
                return <div key={cell.key} className="h-8" />;
              }

              const isSelected = selectedDate === cell.label;

              return (
                <button
                  key={cell.key}
                  type="button"
                  disabled={!cell.isSelectable}
                  onClick={() => cell.isSelectable && handleDateSelect(cell.label)}
                  className={`flex h-8 w-full items-center justify-center rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                      : cell.isSelectable
                      ? 'text-slate-800 hover:bg-blue-50 hover:text-blue-600'
                      : 'text-slate-300 cursor-not-allowed bg-slate-50/50'
                  } ${cell.isToday && !isSelected ? 'border border-blue-400 text-blue-600' : ''}`}
                >
                  {cell.dayNum}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>Available next 35 days</span>
            </span>
            <span className="text-[10px] text-slate-400">Past & &gt;35d disabled</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
