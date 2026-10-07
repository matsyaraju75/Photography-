"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { BEHIND_THE_LENS_STEPS } from "@/lib/constants";
import { Camera, Eye, Sliders, Layers } from "lucide-react";

import { TextReveal } from "@/components/ui/TextReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function BehindTheLensSection() {
  const stepIcons = [Camera, Eye, Sliders, Layers];

  const stepImages = [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
  ];

  return (
    <section id="behind-the-lens" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Craft &amp; Discipline
            </Badge>
            <TextReveal
              text="Behind the Lens"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
              From scouting early morning light in the hills to hand-calibrated color grading that honors real skin tones and forest greens.
            </p>
          </Reveal>
        </div>

        {/* 4-Step Pipeline: SETUP -> SHOOT -> EDIT -> FINAL PHOTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BEHIND_THE_LENS_STEPS.map((step, idx) => {
            const IconComponent = stepIcons[idx] || Camera;
            const stepImage = stepImages[idx];

            return (
              <Reveal key={step.step} delay={0.1 * idx}>
                <div className="group bg-cream border border-earth/20 overflow-hidden shadow-xs hover:border-forest/50 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Visual Preview */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/30">
                      <ParallaxImage
                        src={stepImage}
                        alt={step.title}
                        aspectRatio="aspect-[4/3]"
                        speed={0.06}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Step Number Tag */}
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <span className="text-[0.625rem] font-sans uppercase tracking-widest text-cream bg-black/60 px-2 py-0.5 backdrop-blur-xs font-semibold">
                            STEP {step.step}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3 text-cream/90 bg-black/50 p-1.5 rounded-full pointer-events-none">
                          <IconComponent size={14} />
                        </div>
                      </ParallaxImage>
                    </div>

                    {/* Step Details */}
                    <div className="p-5">
                      <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-forest font-semibold block mb-1">
                        {step.title}
                      </span>
                      <h3 className="font-serif text-xl text-charcoal font-medium mb-2 group-hover:text-forest transition-colors">
                        {step.headline}
                      </h3>
                      <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-1 border-t border-earth/10 flex items-center justify-between text-[0.65rem] text-charcoal-muted uppercase tracking-wider font-mono">
                    <span>Stage {step.step} / 04</span>
                    <span className="text-forest">&rarr;</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
