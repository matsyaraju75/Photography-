import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Calculator,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export function InvestmentPreviewSection() {
  return (
    <section id="investment" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Investment &bull; Honest Pricing
            </Badge>
            <TextReveal
              text="Heirloom Collections & Pricing"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            Transparent pricing without agency markups. All packages include Raju&apos;s direct personal documentation, color grading, and archival cloud storage.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Reveal delay={0.1} className="p-8 bg-cream border border-earth/20 rounded-xs space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold block">
              01 &bull; Personal Craft
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              Documented Directly by Raju
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every wedding and family session is photographed personally by Raju — never outsourced to junior freelancers or unknown associates.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="p-8 bg-cream border border-earth/20 rounded-xs space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold block">
              02 &bull; True-to-Life Color
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              Archival Canvera Albums
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Handcrafted 250 GSM velvet matte Italian flush-mount albums, custom-designed to tell your story in seamless panoramic spreads.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="p-8 bg-cream border border-earth/20 rounded-xs space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold block">
              03 &bull; Honest Terms
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              Zero Travel Surcharges in ASR
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Local coverage across Paderu, Araku Valley, Lambasingi, Chintapalli, and Ananthagiri is completely included with 5-year RAW digital cloud backups.
            </p>
          </Reveal>
        </div>

        {/* Interactive Features Call-to-Action Bar */}
        <Reveal delay={0.35} className="p-8 sm:p-12 bg-cream border border-forest/30 rounded-xs shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold flex items-center space-x-1.5">
              <Calculator size={14} />
              <span>Interactive Package Estimator</span>
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
              Calculate Your Custom Investment in 60 Seconds
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Choose your celebration, duration, and add-ons (cinematography, drone, Canvera album) to generate an itemized quote you can share directly via WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Button variant="primary" size="lg" href="/investment">
              <Calculator size={15} className="mr-2" />
              <span>Launch Calculator</span>
            </Button>
            <Button variant="secondary" size="lg" href="/availability">
              <Calendar size={15} className="mr-2" />
              <span>Check Open Dates</span>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
