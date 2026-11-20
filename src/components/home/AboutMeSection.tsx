"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { STUDIO_CONFIG } from "@/lib/constants";
import { Camera, MapPin, Heart } from "lucide-react";

export function AboutMeSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={0.1} className="relative w-full max-w-sm sm:max-w-md">
              <ParallaxImage
                src="/images/raju.jpeg"
                alt="Raju — Photographer from ASR District"
                aspectRatio="aspect-[4/5]"
                speed={0.1}
                sizes="(max-width: 768px) 100vw, 400px"
                className="border border-earth/25 bg-sand/30 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-cream pointer-events-none">
                  <p className="font-serif text-lg font-medium">Raju</p>
                  <p className="text-[0.6875rem] font-sans uppercase tracking-widest text-sand-light">
                    Photographer &bull; ASR District
                  </p>
                </div>
              </ParallaxImage>
            </Reveal>
          </div>

          {/* Story & Philosophy Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <Reveal delay={0.1}>
              <Badge variant="gold">
                The Photographer
              </Badge>
            </Reveal>

            <Reveal delay={0.15}>
              <TextReveal
                text="A Little About Me"
                as="h2"
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.18] block"
              />
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-serif italic text-lg sm:text-xl text-forest leading-relaxed">
                &ldquo;{STUDIO_CONFIG.aboutManifesto}&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="space-y-4 text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans">
                <p>
                  I am a photographer living and working in the <strong>Alluri Sitharama Raju (ASR) District</strong> of Andhra Pradesh.
                  Growing up surrounded by mist-covered hills, village trails, and ancient forest belts, I learned early that the most
                  meaningful stories are not manufactured in a studio. They are lived out in the open.
                </p>
                <p>
                  Whether I am documenting a multi-day traditional wedding, a child&apos;s joyful first birthday, a naming ceremony,
                  or waiting in the forest canopy at dawn for birds to take flight — my goal remains the same: to give you photographs
                  that feel simple, warm, and true to life.
                </p>
              </div>
            </Reveal>

            {/* Core Values Ribbon */}
            <Reveal delay={0.3}>
              <div className="pt-6 border-t border-earth/20 grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div className="flex items-start space-x-2.5">
                  <MapPin size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-charcoal">Home Base</span>
                    <span className="text-xs text-charcoal-muted">ASR District, AP</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Heart size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-charcoal">Focus</span>
                    <span className="text-xs text-charcoal-muted">Emotion &amp; Real Life</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5 col-span-2 sm:col-span-1">
                  <Camera size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-charcoal">Philosophy</span>
                    <span className="text-xs text-charcoal-muted">Unposed &bull; Natural</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
