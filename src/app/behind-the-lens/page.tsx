import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { BEHIND_THE_LENS_STEPS, STUDIO_CONFIG } from "@/lib/constants";
import { Camera, Shield, Sliders, Layers, Eye, Check, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Behind The Lens — The Craft & Equipment of ${STUDIO_CONFIG.name}`,
  description:
    "Explore Raju's field preparation, dual-card redundancy standards, lens selection, and true-to-life color grading workflow in ASR District.",
};

export default function BehindTheLensPage() {
  const gearList = [
    {
      category: "Camera Bodies",
      items: [
        "Sony Alpha 7 IV (Full-Frame Hybrid for Stills & 4K Cinema)",
        "Backup Dual-Card Body for Complete Event Redundancy",
      ],
    },
    {
      category: "Optical Prime & Zoom Lenses",
      items: [
        "FE 35mm f/1.4 GM (Wide Environmental Portraits & Courtyards)",
        "FE 85mm f/1.8 (Intimate Ritual Moments & Gentle Portraits)",
        "FE 70-200mm f/4 G (Discreet Ceremony Coverage from a Distance)",
        "FE 200-600mm G Super-Telephoto (Canopy Birds & Wildlife in Eastern Ghats)",
      ],
    },
    {
      category: "Cinematography & Audio",
      items: [
        "DJI Ronin Gimbal Stabilization",
        "Wireless Lavalier Audio Mics for Wedding Vows & Ritual Chants",
        "Compact 4K Aerial Drone for Venue & Landscape Panoramas",
      ],
    },
    {
      category: "Data Integrity & Editing",
      items: [
        "Dual Simultaneous Recording on High-Speed SDXC Cards",
        "Calibrated Color-Accurate Displays for Natural Skin Tones",
        "Immediate Encrypted Cloud & Local Dual-Drive Backup",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Header Banner */}
      <section className="py-20 sm:py-28 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <Badge variant="gold" className="mb-4">
            Field Rigor &amp; Craftsmanship
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight mb-4">
            Behind the Lens
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-forest max-w-2xl font-light leading-relaxed">
            Effortless photographs are the result of quiet preparation, dual-card redundancy, and deep human empathy.
          </p>
        </Container>
      </section>

      {/* 2. 4-Stage Workflow: SETUP -> SHOOT -> EDIT -> FINAL PHOTO */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="mb-14">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-1 font-semibold">
              The Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Setup &rarr; Shoot &rarr; Edit &rarr; Final Photo
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mt-2 font-sans">
              Demonstrating the deliberate care and effort that goes into every finished photograph.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BEHIND_THE_LENS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-cream-paper border border-earth/20 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl text-forest font-medium">
                      {step.step}
                    </span>
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-earth">
                      Stage {step.step}
                    </span>
                  </div>
                  <span className="text-[0.6875rem] font-sans uppercase tracking-wider text-forest font-semibold block mb-1">
                    {step.title}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal font-medium mb-2">
                    {step.headline}
                  </h3>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Before/After Color Grading Comparison */}
      <BeforeAfterSlider />

      {/* 4. Equipment Loadout */}
      <section className="py-20 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <div className="mb-14">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-1 font-semibold">
              Equipment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Gear We Rely On in the Field
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mt-2 font-sans">
              Carefully chosen optical tools for weddings, celebrations, and dense forest expeditions across ASR District.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gearList.map((group) => (
              <div
                key={group.category}
                className="bg-cream border border-earth/20 p-7 shadow-xs"
              >
                <div className="flex items-center space-x-2 text-forest mb-4 pb-3 border-b border-earth/15">
                  <Camera size={16} />
                  <h3 className="font-serif text-xl text-charcoal font-medium">
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start space-x-2 text-xs sm:text-sm text-charcoal/85">
                      <Check size={14} className="text-forest shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Data Safety Standard */}
      <section className="py-20 border-b border-earth/20">
        <Container size="narrow" className="text-center">
          <Shield size={28} className="text-forest mx-auto mb-3" />
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            The Dual-Card Safety Standard
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/85 max-w-lg mx-auto font-sans leading-relaxed mb-6">
            A sacred wedding or child&apos;s milestone cannot be repeated. Every exposure writes simultaneously to two separate memory cards inside the camera body, ensuring your memories are permanently preserved.
          </p>
          <div className="inline-flex items-center text-xs font-mono text-forest uppercase tracking-widest bg-forest/10 px-4 py-2 border border-forest/20">
            100% Redundancy on Every Shoot
          </div>
        </Container>
      </section>

      {/* 6. Booking Callout */}
      <section className="py-20 text-center bg-cream-paper">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            Ready to Plan Your Session?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Whether for an intimate wedding, pre-wedding in Araku, or a family event, get in touch with Raju.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Check Date Availability
            </Button>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-xs px-6 py-3.5 bg-cream border border-forest text-forest hover:bg-forest hover:text-cream transition-all shadow-xs"
            >
              <MessageCircle size={15} className="mr-2" />
              Direct WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
