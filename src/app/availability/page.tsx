import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AvailabilityCalendar } from "@/components/business/AvailabilityCalendar";
import { STUDIO_CONFIG } from "@/lib/constants";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Date Availability & Booking Calendar | Raju's Photography",
  description:
    "Check live seasonal date availability for Telugu weddings, Lambasingi mist shoots, and celebrations in Alluri Sitharama Raju (ASR) District.",
};

const SEASONS = [
  {
    season: "Winter Mist & Pre-Wedding Season",
    months: "October – January",
    highlight: "Lambasingi & Araku Valley",
    description:
      "Crisp 4°C morning mist, pine forest trails, and soft golden light. Prime season for hilltop couple sessions and outdoor celebrations.",
  },
  {
    season: "Peak Telugu Wedding Muhurthams",
    months: "November & December (Karthika Masam)",
    highlight: "Paderu, Chodavaram & Vizag Mandapams",
    description:
      "Sacred morning Jeelakarra Bellam muhurtham dates. High demand — early reservation recommended.",
  },
  {
    season: "Spring Blossom & Cradle Celebrations",
    months: "February – April (Magha & Chaitra Masam)",
    highlight: "Ancestral Homes & Coffee Blossoms",
    description:
      "Gentle warm weather, white coffee blossom aroma across Araku hills, and intimate cradle ceremonies.",
  },
];

export default function AvailabilityPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <Container size="wide" className="space-y-16 sm:space-y-24">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="subtle" className="text-forest border-forest/30 bg-forest/10">
            Booking &bull; Seasonal Calendar
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-semibold tracking-tight">
            Check Real-Time Date Availability
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-sans">
            Raju personally documents every wedding and celebration without delegating to junior freelance crews. Inspect our real-time availability below before fixing your auspicious muhurtham.
          </p>
        </div>

        {/* Live Calendar Component */}
        <section aria-label="Interactive Seasonal Calendar">
          <AvailabilityCalendar />
        </section>

        {/* Seasonal Guide across ASR District */}
        <section className="bg-cream-paper border border-earth/20 p-8 sm:p-12 rounded-xs shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold flex items-center space-x-1.5">
              <Compass size={14} className="text-forest" />
              <span>Eastern Ghats Climate Guide</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
              Best Photography Seasons in ASR District
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Planning outdoor sessions or destination rituals? Here is what you can expect during each month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            {SEASONS.map((s, idx) => (
              <div key={idx} className="p-5 bg-cream rounded-xs border border-earth/15 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6875rem] text-forest font-semibold uppercase">
                    {s.months}
                  </span>
                  <span className="text-[0.625rem] font-mono px-2 py-0.5 bg-forest/10 text-forest border border-forest/20 rounded-xs">
                    {s.highlight}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-charcoal font-semibold">
                  {s.season}
                </h3>
                <p className="text-charcoal-muted text-xs leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-serif text-lg text-emerald-950 font-semibold block">
                Have a date in mind that is not listed?
              </span>
              <p className="text-xs text-emerald-800">
                Contact Raju directly to discuss custom dates, multi-day coverage, or travel across South India.
              </p>
            </div>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Namaskaram Raju! I would like to check availability for my upcoming celebration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-700 text-cream text-xs font-mono uppercase tracking-wider font-semibold rounded-xs shadow-xs hover:bg-emerald-800 transition-colors shrink-0"
            >
              Check Custom Date on WhatsApp
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
