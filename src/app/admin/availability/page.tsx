"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Sparkles,
  MapPin,
  Clock,
  X,
} from "lucide-react";

interface DateRecord {
  date: string;
  status: "AVAILABLE" | "LIMITED" | "BOOKED";
  note?: string;
  location?: string;
  isMuhurtham?: boolean;
}

export default function AdminAvailabilityPage() {
  const [dates, setDates] = useState<DateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = October
  const [selectedDate, setSelectedDate] = useState<DateRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState<DateRecord>({
    date: "",
    status: "AVAILABLE",
    note: "",
    location: "ASR District",
    isMuhurtham: false,
  });

  const loadDates = async () => {
    try {
      const res = await fetch("/api/availability");
      const json = await res.json();
      if (json.success && json.dates) {
        setDates(json.dates);
      }
    } catch (e) {
      console.error("Failed to load availability:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDates();
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

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getDateRecord = (day: number): DateRecord => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const found = dates.find((d) => d.date === formattedDate);
    if (found) return found;
    return {
      date: formattedDate,
      status: "AVAILABLE",
      note: "",
      location: "ASR District",
      isMuhurtham: false,
    };
  };

  const handleSelectDay = (rec: DateRecord) => {
    setSelectedDate(rec);
    setEditForm(rec);
  };

  const handleSaveDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await loadDates();
        setSelectedDate(editForm);
      }
    } catch (err) {
      console.error("Failed to save date:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToAvailable = async (dateStr: string) => {
    if (!confirm(`Are you sure you want to unblock ${dateStr} and set it back to Available?`)) return;

    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(dateStr)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        await loadDates();
        const resetRec: DateRecord = {
          date: dateStr,
          status: "AVAILABLE",
          note: "",
          location: "ASR District",
          isMuhurtham: false,
        };
        setSelectedDate(resetRec);
        setEditForm(resetRec);
      }
    } catch (err) {
      console.error("Failed to delete date record:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Studio Scheduling &bull; Seasonal Booking Manager
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Availability &amp; Calendar Manager
          </h1>
        </div>

        {saveSuccess && (
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xs text-xs font-mono flex items-center space-x-1.5 animate-fade-in">
            <CheckCircle size={14} className="text-emerald-700" />
            <span>Date updated on public calendar!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar View (8 cols) */}
        <div className="lg:col-span-8 bg-cream-paper border border-earth/20 p-6 sm:p-8 rounded-xs shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-earth/15">
            <div className="flex items-center space-x-2">
              <CalendarIcon size={18} className="text-forest" />
              <h2 className="font-serif text-2xl text-charcoal font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
            </div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 border border-earth/20 rounded-xs hover:bg-cream text-charcoal transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 border border-earth/20 rounded-xs hover:bg-cream text-charcoal transition-colors cursor-pointer"
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
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 bg-cream/20 rounded-xs opacity-40" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const rec = getDateRecord(day);
              const isSelected = selectedDate?.date === rec.date;

              let statusBg = "bg-cream-paper border-earth/20 hover:border-forest/60 text-charcoal";
              let badgeColor = "bg-emerald-600";

              if (rec.status === "LIMITED") {
                statusBg = "bg-amber-50/80 border-amber-300 text-charcoal";
                badgeColor = "bg-amber-500";
              } else if (rec.status === "BOOKED") {
                statusBg = "bg-sand/30 border-earth/20 text-charcoal-muted";
                badgeColor = "bg-stone-500";
              }

              return (
                <button
                  key={rec.date}
                  type="button"
                  onClick={() => handleSelectDay(rec)}
                  className={`h-16 p-1.5 border rounded-xs transition-all flex flex-col justify-between text-left cursor-pointer ${statusBg} ${
                    isSelected ? "ring-2 ring-forest shadow-xs font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-semibold">{day}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`} />
                  </div>
                  <div className="truncate">
                    {rec.isMuhurtham && (
                      <span className="text-[0.55rem] font-mono text-amber-800 font-semibold block truncate">
                        Muhurtham
                      </span>
                    )}
                    <span className="text-[0.55rem] font-mono text-charcoal-muted block truncate">
                      {rec.status === "BOOKED" ? "Reserved" : rec.status === "LIMITED" ? "1 Slot" : "Open"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Editor Panel (4 cols) */}
        <div className="lg:col-span-4 bg-cream-paper border border-earth/20 p-6 sm:p-8 rounded-xs shadow-xs space-y-6">
          <div className="pb-4 border-b border-earth/15">
            <span className="font-mono text-xs uppercase text-earth font-semibold block mb-0.5">
              Inspector &amp; Quick Editor
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              {editForm.date ? editForm.date : "Select a Date"}
            </h3>
          </div>

          {editForm.date ? (
            <form onSubmit={handleSaveDate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Availability Status *
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as DateRecord["status"] })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none cursor-pointer"
                >
                  <option value="AVAILABLE">AVAILABLE (Open for Commissions)</option>
                  <option value="LIMITED">LIMITED (1 Morning or Evening Slot Left)</option>
                  <option value="BOOKED">BOOKED (Fully Reserved)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={editForm.isMuhurtham}
                    onChange={(e) => setEditForm({ ...editForm, isMuhurtham: e.target.checked })}
                    className="accent-forest h-4 w-4 rounded-xs"
                  />
                  <span className="font-sans font-semibold text-charcoal">
                    Mark as Auspicious Telugu Muhurtham
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Private / Client Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Suresh & Ananya Wedding (Paderu)"
                  value={editForm.note || ""}
                  onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Location / Coverage Region
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paderu Mandapam / Araku Valley"
                  value={editForm.location || ""}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-earth/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleResetToAvailable(editForm.date)}
                  className="text-xs text-red-600 hover:underline font-mono"
                >
                  Clear Booking
                </button>

                <Button variant="primary" size="sm" type="submit" disabled={isSaving}>
                  <Save size={13} className="mr-1.5" />
                  <span>{isSaving ? "Saving..." : "Save Date"}</span>
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center text-xs text-charcoal-muted">
              Click any date on the calendar grid to block, reserve, or mark as muhurtham.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
