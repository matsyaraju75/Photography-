"use client";

import React, { useState, useEffect } from "react";
import { STUDIO_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface DateRecord {
  date: string;
  status: "AVAILABLE" | "LIMITED" | "BOOKED";
  note?: string;
  location?: string;
  isMuhurtham?: boolean;
}

export function AvailabilityCalendar() {
  const [dates, setDates] = useState<DateRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Month navigation: starting from October 2026 (matching our project timeline)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [selectedDate, setSelectedDate] = useState<DateRecord | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch("/api/availability");
        const json = await res.json();
        if (json.success && json.dates) {
          setDates(json.dates);
        }
      } catch (err) {
        console.error("Failed to load availability:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Build days grid for currentMonth & currentYear
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getDateRecord = (day: number): DateRecord => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const found = dates.find((d) => d.date === formattedDate);
    if (found) return found;
    return {
      date: formattedDate,
      status: "AVAILABLE",
      note: "Full day & evening slots currently open",
      location: "ASR District & South India",
      isMuhurtham: false,
    };
  };

  const cleanPhone = STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="w-full bg-cream-paper border border-earth/20 rounded-xs shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 sm:p-8 bg-cream/70 border-b border-earth/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <CalendarIcon size={16} className="text-forest" />
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold">
              Live Seasonal Calendar &bull; ASR District
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
            Raju&apos;s Date Availability
          </h2>
          <p className="text-xs text-charcoal-muted mt-1">
            Telugu wedding muhurtham dates fill 3–6 months in advance. Click any date below to inspect status.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[0.6875rem] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-charcoal">Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-charcoal">Limited (1 Slot)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
            <span className="text-charcoal">Reserved</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Sparkles size={11} className="text-amber-700" />
            <span className="text-amber-900 font-semibold">Muhurtham</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-earth/15">
          {/* Month Switcher Toolbar */}
          <div className="flex items-center justify-between pb-6">
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 border border-earth/20 rounded-xs hover:bg-cream text-charcoal transition-colors cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 border border-earth/20 rounded-xs hover:bg-cream text-charcoal transition-colors cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[0.6875rem] text-charcoal-muted uppercase tracking-wider pb-2 border-b border-earth/10">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-3">
            {/* Empty slots for previous month offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 bg-cream/20 rounded-xs opacity-40" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const rec = getDateRecord(day);
              const isSelected = selectedDate?.date === rec.date;

              let statusBg = "bg-cream-paper border-earth/20 hover:border-forest/60 text-charcoal";
              let badgeColor = "bg-emerald-600";

              if (rec.status === "LIMITED") {
                statusBg = "bg-amber-50/70 border-amber-300 hover:border-amber-500 text-charcoal";
                badgeColor = "bg-amber-500";
              } else if (rec.status === "BOOKED") {
                statusBg = "bg-sand/30 border-earth/20 text-charcoal-muted opacity-80";
                badgeColor = "bg-stone-400";
              }

              return (
                <button
                  key={rec.date}
                  type="button"
                  onClick={() => setSelectedDate(rec)}
                  className={`h-16 sm:h-20 p-1.5 sm:p-2 border rounded-xs transition-all flex flex-col justify-between text-left cursor-pointer ${statusBg} ${
                    isSelected ? "ring-2 ring-forest shadow-xs font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {day}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`} />
                  </div>

                  <div className="space-y-0.5">
                    {rec.isMuhurtham && (
                      <span className="flex items-center space-x-1 text-[0.55rem] sm:text-[0.625rem] font-mono text-amber-800 font-semibold truncate">
                        <Sparkles size={8} className="shrink-0" />
                        <span className="hidden sm:inline">Muhurtham</span>
                      </span>
                    )}
                    <span className="block text-[0.55rem] sm:text-[0.6rem] font-mono text-charcoal-muted truncate">
                      {rec.status === "BOOKED" ? "Reserved" : rec.status === "LIMITED" ? "1 Slot" : "Open"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details Panel (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-cream/40 flex flex-col justify-between space-y-6">
          {selectedDate ? (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-earth font-semibold block mb-1">
                  Selected Date Inspection
                </span>
                <h4 className="font-serif text-2xl text-charcoal font-semibold">
                  {new Date(selectedDate.date + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h4>
              </div>

              {/* Status Indicator Badge */}
              <div className="p-3.5 bg-cream border border-earth/20 rounded-xs space-y-2">
                <div className="flex items-center space-x-2">
                  {selectedDate.status === "AVAILABLE" ? (
                    <CheckCircle size={16} className="text-emerald-700" />
                  ) : selectedDate.status === "LIMITED" ? (
                    <AlertCircle size={16} className="text-amber-600" />
                  ) : (
                    <XCircle size={16} className="text-stone-500" />
                  )}
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-charcoal">
                    {selectedDate.status === "AVAILABLE"
                      ? "Available for Booking"
                      : selectedDate.status === "LIMITED"
                      ? "Limited Availability (1 Slot)"
                      : "Fully Reserved"}
                  </span>
                </div>

                {selectedDate.isMuhurtham && (
                  <div className="flex items-center space-x-1.5 text-xs text-amber-900 font-medium">
                    <Sparkles size={12} className="text-amber-700 shrink-0" />
                    <span>Auspicious Telugu Wedding Muhurtham Date</span>
                  </div>
                )}

                {selectedDate.note && (
                  <p className="text-xs text-charcoal-muted leading-relaxed pt-1 border-t border-earth/10">
                    {selectedDate.note}
                  </p>
                )}

                {selectedDate.location && (
                  <div className="flex items-center space-x-1.5 text-[0.6875rem] font-mono text-earth">
                    <MapPin size={11} className="text-forest" />
                    <span>Coverage Region: {selectedDate.location}</span>
                  </div>
                )}
              </div>

              {/* WhatsApp Date Inquiry Action */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Namaskaram Raju! I noticed on your calendar that ${selectedDate.date} is currently marked as ${selectedDate.status}. I would like to inquire about reserving this date for my upcoming celebration in ASR District. Is it still available?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-cream text-xs font-mono uppercase tracking-wider font-semibold rounded-xs shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer text-center"
                >
                  <span>Reserve Date via WhatsApp</span>
                  <ArrowUpRight size={13} />
                </a>

                <p className="text-[0.625rem] text-charcoal-muted text-center leading-tight">
                  Dates are officially locked only upon receipt of the 40% reservation advance.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-charcoal-muted space-y-3">
              <CalendarIcon size={32} className="mx-auto text-earth/50" />
              <p className="font-serif text-lg text-charcoal font-medium">
                Click Any Date to Inspect
              </p>
              <p className="text-[0.6875rem] leading-relaxed max-w-xs mx-auto">
                Select a date on the calendar to view morning/evening slot availability, muhurtham details, and location notes.
              </p>
            </div>
          )}

          {/* Quick Contact Link */}
          <div className="pt-4 border-t border-earth/15">
            <div className="text-[0.6875rem] text-charcoal-muted flex items-center justify-between">
              <span>Have a tentative date?</span>
              <a href="#contact" className="text-forest font-semibold hover:underline">
                Write to Raju &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
