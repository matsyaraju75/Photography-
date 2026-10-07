"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { ASR_STORIES } from "@/lib/constants";
import { MapPin } from "lucide-react";

export function AsrStoriesSection() {
  return (
    <section id="asr" className="py-24 sm:py-32 bg-cream relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Regional Identity
            </Badge>
            <TextReveal
              text="Stories from ASR"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight block"
            />
          </div>
          <div className="max-w-md mt-4 md:mt-0">
            <p className="font-serif italic text-base sm:text-lg text-forest mb-1">
              &ldquo;I photograph the place and people around me.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
              From the quiet early mist of Araku hills and rain washing over Maredumilli teak forests to weekly village shandies (*santalu*) and wildlife in the canopy.
            </p>
          </div>
        </div>

        {/* Stories from ASR Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ASR_STORIES.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.1}
              className="group flex flex-col bg-cream-paper border border-earth/20 overflow-hidden shadow-xs hover:border-forest/50 transition-all duration-300"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/30">
                <ParallaxImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="aspect-[4/5]"
                  speed={0.08}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-cream bg-black/60 px-2 py-0.5 backdrop-blur-xs font-medium">
                      0{index + 1} &bull; {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center text-cream text-[0.6875rem] pointer-events-none">
                    <MapPin size={12} className="text-sand mr-1 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </ParallaxImage>
              </div>

              {/* Story Description */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-2.5">
                <h3 className="font-serif text-lg text-charcoal font-medium leading-snug group-hover:text-forest transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
