"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BEFORE_AFTER_SAMPLES } from "@/lib/constants";
import { Check, SlidersHorizontal } from "lucide-react";

import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

export function BeforeAfterSlider() {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const sample = BEFORE_AFTER_SAMPLES[selectedSampleIndex] || BEFORE_AFTER_SAMPLES[0];

  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 sm:py-32 bg-cream relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              True-to-Life Color Grading
            </Badge>
            <TextReveal
              text="RAW ↔ Final Frame"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            Slide horizontally to compare camera sensor data with final color-corrected frames that honor natural skin tones and forest greens.
          </p>
        </div>

        {/* Sample selector buttons */}
        <div className="flex space-x-3 mb-10 overflow-x-auto pb-2">
          {BEFORE_AFTER_SAMPLES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedSampleIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-sans border transition-all cursor-pointer ${
                idx === selectedSampleIndex
                  ? "bg-forest text-cream border-forest font-medium shadow-xs"
                  : "bg-cream-paper text-charcoal-muted border-earth/20 hover:text-charcoal"
              }`}
            >
              {item.title} &bull; {item.category}
            </button>
          ))}
        </div>

        {/* Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Draggable Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden border border-earth/25 bg-sand/30 cursor-ew-resize group shadow-xs"
              style={{ touchAction: "pan-y" }}
            >
              {/* FINAL Image (Full Background) */}
              <div className="absolute inset-0">
                <Image
                  src={sample.finalImage}
                  alt={`${sample.title} Final Grade`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center pointer-events-none"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xs px-3 py-1 text-[0.65rem] tracking-widest uppercase font-sans text-cream border border-white/20">
                  Master Final Frame
                </div>
              </div>

              {/* RAW Image (Clipped Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="relative w-full h-full min-w-full">
                  <Image
                    src={sample.rawImage}
                    alt={`${sample.title} RAW Exposure`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover object-center pointer-events-none filter contrast-[0.9] saturate-[0.85]"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs px-3 py-1 text-[0.65rem] tracking-widest uppercase font-sans text-sand-light border border-white/20">
                    RAW Sensor Capture
                  </div>
                </div>
              </div>

              {/* Vertical Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-forest shadow-[0_0_8px_rgba(47,74,58,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Drag Handle Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cream border-2 border-forest flex items-center justify-center text-forest shadow-md">
                  <SlidersHorizontal size={14} />
                </div>
              </div>
            </div>

            <p className="text-[0.65rem] uppercase tracking-widest text-center text-charcoal-muted mt-3">
              Drag or touch slider horizontally to inspect color grading
            </p>
          </div>

          {/* Details & Techniques */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-sans text-[0.6875rem] tracking-[0.2em] uppercase text-forest block mb-1.5 font-semibold">
                Color &amp; Tone
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-3">
                {sample.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans mb-5">
                {sample.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-earth/15">
                <span className="font-sans text-[0.6875rem] uppercase tracking-wider text-charcoal font-semibold block">
                  Techniques Applied:
                </span>
                <ul className="space-y-2">
                  {sample.techniques.map((tech) => (
                    <li key={tech} className="flex items-center space-x-2 text-xs text-charcoal/85">
                      <Check size={13} className="text-forest shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-cream-paper border border-earth/20 text-xs text-charcoal-muted italic font-serif">
              &ldquo;No unnatural plastic skin smoothing. Every portrait preserves pores, genuine laughter, and ambient morning light.&rdquo;
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
