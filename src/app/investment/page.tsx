import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InvestmentCalculator } from "@/components/business/InvestmentCalculator";
import { STUDIO_CONFIG } from "@/lib/constants";
import {
  Camera,
  Film,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Investment & Packages | Raju's Photography",
  description:
    "Transparent, honest photography investment and pricing for Telugu weddings, Lambasingi pre-weddings, naming ceremonies, and celebrations in Alluri Sitharama Raju (ASR) District.",
};

interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  isPopular?: boolean;
  deliverables: string[];
  idealFor: string;
}

const FEATURED_PACKAGES: PackageTier[] = [
  {
    id: "essential",
    name: "The Essential Story",
    tagline: "Pure Candid Photography & High-Res Gallery",
    price: "₹55,000",
    idealFor: "Intimate weddings, single-day celebrations & cradle ceremonies",
    deliverables: [
      "Lead Photography Coverage by Raju (up to 8 Hours)",
      "350+ Curated, Color-Graded High-Resolution Photographs",
      "Private Digital Cloud Web Gallery for Family Sharing",
      "Full Resolution Print Release (No Watermarks)",
      "5-Year Archival Cloud Backup of RAW Negatives",
      "Travel within ASR District (Paderu, Araku, Lambasingi) Included",
    ],
  },
  {
    id: "heirloom",
    name: "The Heirloom Legacy",
    tagline: "Photography + 4K Cinema + Canvera Lay-Flat Album",
    price: "₹95,000",
    isPopular: true,
    idealFor: "Most popular for traditional Telugu weddings & multi-ritual days",
    deliverables: [
      "Full Day Dual Coverage: Lead Photographer + Candid Second Shooter",
      "Dedicated 4K Cinematographer with Cinematic Audio & Drone Aerials",
      "3 to 5 Minute 4K Cinematic Highlight Film + Instagram Teaser Reel",
      "600+ Edited High-Resolution Digital Photographs",
      "Canvera Flush-Mount Italian Leatherette 50-Page Album (250 GSM)",
      "Private Family Cloud Gallery & 5-Year RAW Archival Backup",
      "Express 24-Hour Digital Teaser Delivery for WhatsApp",
    ],
  },
  {
    id: "grand-celebration",
    name: "The 2-Day Grand Chronicle",
    tagline: "Complete Multi-Day Multi-Crew Documentation",
    price: "₹1,65,000",
    idealFor: "Destination Telugu weddings, Pellikuthuru, Muhurtham & Grand Receptions",
    deliverables: [
      "Full 2-Day Comprehensive Coverage (Pre-wedding ritual + Muhurtham + Reception)",
      "4-Person Professional Crew (2 Photographers + 2 Cinematographers)",
      "Complete 4K Cinema Feature (15–20 Min) + 4K Teaser Film",
      "Licensed 4K Drone Aerial Pilot for Valley & Mandapam Vistas",
      "Two Premium Canvera 60-Page Albums (Couple Heirloom + Parent Album)",
      "1,000+ Mastered High-Resolution Digital Negatives",
      "Handcrafted Wooden Keepsake USB Box with 50 Fine-Art Cotton 4x6 Prints",
    ],
  },
];

const FAQS = [
  {
    question: "How far in advance should we reserve our wedding date?",
    answer:
      "Auspicious Telugu wedding muhurtham dates (especially during Karthika Masam in November-December and Magha Masam in January-February) typically book 3 to 6 months in advance. Because Raju personally shoots every commission and never takes double bookings on the same day, early reservation is advised.",
  },
  {
    question: "What is your booking & payment policy?",
    answer:
      "To officially lock your date on Raju's calendar, a 40% advance is required alongside a signed booking agreement. 50% is due on the wedding day, and the remaining 10% is settled upon final approval of your handcrafted Canvera album design.",
  },
  {
    question: "Do you charge extra for travel within ASR District?",
    answer:
      "No! Travel across Alluri Sitharama Raju District — including Paderu, Araku Valley, Lambasingi, Chintapalli, and Ananthagiri — is already included in our standard pricing without any hidden mileage fees.",
  },
  {
    question: "When do we receive our final photos and films?",
    answer:
      "A curated 20-photo sneak peek is delivered within 48 hours for immediate WhatsApp family sharing. Your full color-graded web gallery is delivered within 3 weeks, and your handcrafted Canvera album is printed, bound, and delivered to your doorstep within 4 to 6 weeks.",
  },
];

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-24">
      <Container size="wide" className="space-y-16 sm:space-y-24">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="subtle" className="text-forest border-forest/30 bg-forest/10">
            Investment &bull; Honest Pricing
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-semibold tracking-tight">
            Transparent Investment for Lifelong Heirlooms
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-sans">
            Good photography is not an expense for a single day — it is an heirloom that lives with your family for generations. Here is our straightforward, honest approach to pricing with zero hidden surcharges.
          </p>
        </div>

        {/* 1. Interactive Investment Calculator */}
        <section aria-label="Interactive Investment Estimator">
          <InvestmentCalculator />
        </section>

        {/* 2. Curated Signature Package Collections */}
        <section className="space-y-10" aria-label="Curated Wedding Collections">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold">
              Pre-Designed Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
              Popular Wedding Packages
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Curated combinations most frequently chosen by couples across Andhra Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 sm:p-8 bg-cream-paper border rounded-xs shadow-xs flex flex-col justify-between space-y-6 relative ${
                  pkg.isPopular
                    ? "border-forest ring-1 ring-forest/60"
                    : "border-earth/20"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-forest text-cream font-mono text-[0.625rem] uppercase tracking-widest font-semibold rounded-xs shadow-xs">
                      Most Selected Collection
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal font-semibold">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-forest font-medium mt-0.5">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-earth/10 flex items-baseline space-x-2">
                    <span className="font-serif text-4xl text-charcoal font-bold">
                      {pkg.price}
                    </span>
                    <span className="text-[0.6875rem] text-charcoal-muted font-mono">
                      All-Inclusive
                    </span>
                  </div>

                  <p className="text-[0.6875rem] text-charcoal-muted italic">
                    Ideal for: {pkg.idealFor}
                  </p>

                  <div className="pt-4 border-t border-earth/10 space-y-2.5">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-earth font-semibold block">
                      Deliverables &amp; Inclusions:
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal leading-snug">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 size={13} className="text-forest shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-earth/15">
                  <Button
                    variant={pkg.isPopular ? "primary" : "secondary"}
                    size="md"
                    href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Namaskaram Raju! I would like to inquire about the ${pkg.name} (${pkg.price}) for my upcoming wedding/celebration.`
                    )}`}
                    isExternal
                    className="w-full text-center"
                  >
                    <span>Inquire via WhatsApp</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Frequently Asked Questions (Pricing & Booking) */}
        <section className="bg-cream-paper border border-earth/20 p-8 sm:p-12 rounded-xs shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold flex items-center space-x-1.5">
              <HelpCircle size={14} />
              <span>Investment Clarity</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-4 bg-cream rounded-xs border border-earth/10 space-y-2">
                <h3 className="font-serif text-lg text-charcoal font-semibold">
                  {faq.question}
                </h3>
                <p className="text-charcoal-muted text-xs leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
