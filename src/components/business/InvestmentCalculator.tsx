"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { STUDIO_CONFIG } from "@/lib/constants";
import {
  Camera,
  Film,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  HelpCircle,
} from "lucide-react";

interface CategoryOption {
  id: string;
  name: string;
  tagline: string;
  basePrice: number; // INR
  defaultHours: string;
  idealFor: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "wedding",
    name: "Telugu Wedding / Marriage",
    tagline: "Jeelakarra Bellam & Sacred Rituals",
    basePrice: 55000,
    defaultHours: "Full Day (8-10 hrs)",
    idealFor: "Paderu, Araku & South India Mandapams",
  },
  {
    id: "pre-wedding",
    name: "Hilltop Pre-Wedding Experience",
    tagline: "Lambasingi Mist & Coffee Valley Trails",
    basePrice: 32000,
    defaultHours: "Full Day Sunrise-to-Sunset",
    idealFor: "Couples seeking intimate, unposed natural frames",
  },
  {
    id: "naming-ceremony",
    name: "Naming / Cradle Ceremony",
    tagline: "Uyyala Pandaga & Family Blessings",
    basePrice: 24000,
    defaultHours: "Half Day (4-5 hrs)",
    idealFor: "Ancestral home gatherings & intimate rituals",
  },
  {
    id: "birthday",
    name: "Birthday Celebration",
    tagline: "1st Birthday & Family Milestones",
    basePrice: 20000,
    defaultHours: "Half Day (4-5 hrs)",
    idealFor: "Outdoor resort lawns & family parties",
  },
  {
    id: "wildlife",
    name: "Nature & Wildlife Expedition",
    tagline: "Eastern Ghats Bio-Documentation",
    basePrice: 35000,
    defaultHours: "Full Day Field Expedition",
    idealFor: "Forest reserves, researchers & eco-groups",
  },
];

interface DurationOption {
  id: string;
  label: string;
  multiplier: number;
  description: string;
}

const DURATIONS: DurationOption[] = [
  { id: "half-day", label: "Half-Day Ritual (4-5 hrs)", multiplier: 0.8, description: "Cradle, birthday, or single morning muhurtham" },
  { id: "full-day", label: "Full-Day Coverage (8-10 hrs)", multiplier: 1.0, description: "Complete ceremony, rituals & candid guest portraits" },
  { id: "two-days", label: "2-Day Complete Celebration", multiplier: 1.85, description: "Pellikuthuru / Mehendi + Morning Muhurtham + Reception" },
];

interface AddonOption {
  id: string;
  label: string;
  price: number;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const ADDONS: AddonOption[] = [
  {
    id: "second-photographer",
    label: "Second Candid Photographer",
    price: 12000,
    description: "Parallel coverage of bride, groom, and spontaneous guest emotions",
    icon: Camera,
  },
  {
    id: "cinematography",
    label: "4K Cinematic Film + Teaser Reel",
    price: 28000,
    description: "Dedicated lead cinematographer with audio capture and color grade",
    icon: Film,
  },
  {
    id: "drone",
    label: "4K Aerial Drone Coverage",
    price: 14000,
    description: "Sweeping valley landscapes, mandapam vistas & baraat processions",
    icon: Sparkles,
  },
  {
    id: "canvera-album",
    label: "Canvera Flush-Mount Italian Album",
    price: 18000,
    description: "50-Page archival velvet matte paper with personalized embossing",
    icon: BookOpen,
  },
  {
    id: "parent-albums",
    label: "Parent Keepsake Mini Albums (Pair)",
    price: 9000,
    description: "Two matching 30-page compact albums for both sets of parents",
    icon: BookOpen,
  },
  {
    id: "express-teaser",
    label: "24-Hour Express Teaser Reel",
    price: 6000,
    description: "30-second vertical teaser delivered within 24 hrs for WhatsApp & Instagram",
    icon: Clock,
  },
];

export function InvestmentCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(CATEGORIES[0]);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>(DURATIONS[1]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "cinematography",
    "canvera-album",
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Price Calculation
  const baseCategoryPrice = Math.round(selectedCategory.basePrice * selectedDuration.multiplier);
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ADDONS.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const estimatedTotal = baseCategoryPrice + addonsTotal;

  // WhatsApp Quote Text Generation
  const activeAddonsLabels = selectedAddons
    .map((id) => ADDONS.find((a) => a.id === id)?.label)
    .filter(Boolean);

  const quoteMessage = encodeURIComponent(
    `Namaskaram Raju! I used the Investment Calculator on your website and would love to check availability for:

• Celebration: ${selectedCategory.name}
• Duration: ${selectedDuration.label}
• Deliverables Selected:
  - Lead Photography by Raju (Included)
  ${activeAddonsLabels.map((l) => `- ${l}`).join("\n  ")}
• Estimated Investment: ₹${estimatedTotal.toLocaleString("en-IN")}

Could you please share your availability and confirm date reservation logistics?`
  );

  const cleanPhone = STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="w-full bg-cream-paper border border-earth/20 rounded-xs shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 sm:p-10 border-b border-earth/15 bg-cream/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold">
                Transparent &amp; Authentic Pricing
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
              Interactive Investment Estimator
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-forest bg-forest/10 px-3 py-1.5 border border-forest/20 rounded-xs self-start sm:self-auto">
            <ShieldCheck size={16} />
            <span>No Hidden Taxes or Travel Surcharges in ASR Dt.</span>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
          Every celebration is unique. Customize your coverage duration and deliverables below to generate an itemized estimate for your upcoming date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Configurator Column (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-earth/15">
          {/* Step 1: Celebration Category */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-forest text-cream flex items-center justify-center text-[0.6875rem]">1</span>
                <span>Select Your Celebration</span>
              </span>
              <span className="text-[0.6875rem] font-mono text-charcoal-muted">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left p-3.5 border rounded-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cream border-forest ring-1 ring-forest/60 shadow-xs"
                        : "bg-cream/40 border-earth/20 hover:border-earth/40 hover:bg-cream"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-semibold text-charcoal">
                        {cat.name}
                      </span>
                      {isSelected && <CheckCircle2 size={16} className="text-forest shrink-0" />}
                    </div>
                    <span className="block text-[0.6875rem] text-forest font-medium line-clamp-1 mb-1">
                      {cat.tagline}
                    </span>
                    <span className="block text-[0.625rem] text-charcoal-muted">
                      Base: ₹{cat.basePrice.toLocaleString("en-IN")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-forest text-cream flex items-center justify-center text-[0.6875rem]">2</span>
              <span>Coverage Duration</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {DURATIONS.map((dur) => {
                const isSelected = selectedDuration.id === dur.id;
                return (
                  <button
                    key={dur.id}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`text-left p-3.5 border rounded-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cream border-forest ring-1 ring-forest/60 shadow-xs"
                        : "bg-cream/40 border-earth/20 hover:border-earth/40 hover:bg-cream"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans text-xs font-semibold text-charcoal">
                        {dur.label}
                      </span>
                      {isSelected && <CheckCircle2 size={14} className="text-forest shrink-0" />}
                    </div>
                    <span className="block text-[0.625rem] text-charcoal-muted leading-tight">
                      {dur.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Deliverables & Add-ons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-forest text-cream flex items-center justify-center text-[0.6875rem]">3</span>
                <span>Craft Deliverables &amp; Add-ons</span>
              </span>
              <span className="text-[0.6875rem] font-mono text-charcoal-muted">Optional</span>
            </div>

            <div className="space-y-2">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                const Icon = addon.icon;
                return (
                  <label
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-start justify-between p-3.5 border rounded-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cream border-forest/60 shadow-xs"
                        : "bg-cream/40 border-earth/15 hover:border-earth/30 hover:bg-cream"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-0.5 accent-forest h-4 w-4 rounded-xs"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <Icon size={14} className="text-forest" />
                          <span className="text-xs font-semibold text-charcoal">
                            {addon.label}
                          </span>
                        </div>
                        <p className="text-[0.6875rem] text-charcoal-muted mt-0.5 leading-snug">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-forest shrink-0 ml-4">
                      +₹{addon.price.toLocaleString("en-IN")}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 bg-cream/40 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border-b border-earth/15 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold block mb-1">
                Your Curated Collection
              </span>
              <h3 className="font-serif text-2xl text-charcoal font-semibold">
                Investment Summary
              </h3>
            </div>

            {/* Line items list */}
            <div className="space-y-3 text-xs font-sans">
              <div className="flex justify-between items-start pb-2 border-b border-earth/10">
                <div>
                  <span className="font-medium text-charcoal block">
                    Lead Photography by Raju
                  </span>
                  <span className="text-[0.6875rem] text-charcoal-muted font-mono">
                    {selectedCategory.name} &bull; {selectedDuration.label}
                  </span>
                </div>
                <span className="font-mono font-medium text-charcoal">
                  ₹{baseCategoryPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {selectedAddons.map((addonId) => {
                const item = ADDONS.find((a) => a.id === addonId);
                if (!item) return null;
                return (
                  <div key={item.id} className="flex justify-between items-start pb-2 border-b border-earth/10">
                    <span className="text-charcoal-muted">
                      {item.label}
                    </span>
                    <span className="font-mono font-medium text-charcoal">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Guaranteed Deliverables with Every Package */}
            <div className="p-4 bg-cream border border-earth/15 rounded-xs space-y-2 text-xs">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-forest font-semibold block">
                Standard Inclusions with Every Booking:
              </span>
              <ul className="space-y-1.5 text-[0.6875rem] text-charcoal-muted">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-forest shrink-0" />
                  <span>All high-res color graded photographs (no watermark)</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-forest shrink-0" />
                  <span>Private digital cloud gallery for seamless family sharing</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-forest shrink-0" />
                  <span>5-Year archival backup of your RAW digital negatives</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-forest shrink-0" />
                  <span>Travel throughout ASR District (Paderu, Araku, Lambasingi)</span>
                </li>
              </ul>
            </div>

            {/* Total Estimated Price */}
            <div className="pt-2 border-t border-earth/20 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal-muted font-mono block">
                  Estimated Total
                </span>
                <span className="text-[0.625rem] text-earth font-mono">
                  All-inclusive &bull; 40% Advance to Reserve
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif text-3xl sm:text-4xl text-forest font-bold block">
                  ₹{estimatedTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4">
            <a
              href={`https://wa.me/${cleanPhone}?text=${quoteMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-cream text-xs font-mono uppercase tracking-wider font-semibold rounded-xs shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer text-center"
            >
              <Send size={14} />
              <span>Send This Quote on WhatsApp to Raju</span>
            </a>

            <Button
              variant="outline"
              size="md"
              href="#contact"
              className="w-full text-center"
            >
              <span>Inquire Formally via Contact Form</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>

            <p className="text-[0.65rem] text-center text-charcoal-muted pt-1">
              Have unique requirements or multi-city celebrations? Reach out for a tailored consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
