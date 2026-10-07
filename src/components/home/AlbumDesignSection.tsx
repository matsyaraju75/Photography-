"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ALBUM_PROCESS_STEPS, ALBUMS } from "@/lib/constants";
import { ChevronRight, ChevronLeft, BookOpen } from "lucide-react";

import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

export function AlbumDesignSection() {
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

  const albumSpreads = [
    {
      title: "Handcrafted Cover & Embossing",
      caption: "Durable earth-tone leather with custom blind embossing of names and dates.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85",
    },
    {
      title: "Ceremony Opening Spread",
      caption: "Lay-flat 180-degree panoramic spread without center seam or gutter distortion.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    },
    {
      title: "Celebration & Family Spread",
      caption: "Heavy archival fine-art matte paper designed to last generations without fading.",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=85",
    },
  ];

  const prevSpread = () => {
    setActiveSpreadIndex((prev) => (prev === 0 ? albumSpreads.length - 1 : prev - 1));
  };

  const nextSpread = () => {
    setActiveSpreadIndex((prev) => (prev === albumSpreads.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="albums" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Supporting Service
            </Badge>
            <TextReveal
              text="From Photo to Album"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
              A photograph reaches its true home when printed on archival paper. We turn digital moments into timeless family heirlooms you can hold.
            </p>
          </Reveal>
        </div>

        {/* 5-Step Process: Capture -> Select -> Edit -> Design -> Album */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ALBUM_PROCESS_STEPS.map((step, idx) => (
              <Reveal
                key={step.number}
                delay={idx * 0.08}
                className="p-5 bg-cream border border-earth/20 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-2xl text-forest font-medium">
                      {step.number}
                    </span>
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-earth">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal font-medium mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Interactive Lay-Flat Album Viewer */}
        <div className="bg-cream border border-earth/25 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 pb-4 border-b border-earth/15 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-forest mb-1 text-xs uppercase tracking-wider font-semibold">
                <BookOpen size={14} />
                <span>Interactive Album Spread Preview</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
                {albumSpreads[activeSpreadIndex].title}
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-charcoal-muted font-mono">
                Spread {activeSpreadIndex + 1} of {albumSpreads.length}
              </span>
              <button
                onClick={prevSpread}
                className="p-2 border border-earth/20 bg-cream-paper text-charcoal hover:bg-forest hover:text-cream transition-colors"
                aria-label="Previous spread"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSpread}
                className="p-2 border border-earth/20 bg-cream-paper text-charcoal hover:bg-forest hover:text-cream transition-colors"
                aria-label="Next spread"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Panoramic Spread Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20 border border-earth/20 shadow-inner">
            <Image
              src={albumSpreads[activeSpreadIndex].image}
              alt={albumSpreads[activeSpreadIndex].title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain sm:object-cover"
            />
            {/* Center Gutter Subtle Shadow (Simulating Open Book Spine) */}
            <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/25 to-black/15 pointer-events-none hidden sm:block opacity-40" />
          </div>

          <p className="mt-4 text-xs sm:text-sm text-charcoal-muted text-center italic font-serif">
            &ldquo;{albumSpreads[activeSpreadIndex].caption}&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
