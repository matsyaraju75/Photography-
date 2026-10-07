"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/constants";
import { ProcessStep } from "@/types";

export function ProcessSection() {
  return (
    <section id="process" className="py-28 sm:py-36 bg-cream relative border-t border-earth/20 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-earth/20">
          <Reveal>
            <Badge variant="gold" className="mb-4">
              Client Journey
            </Badge>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
              From First Hello to Finished Heirloom
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-6 md:mt-0 leading-relaxed font-sans">
              Deliberate steps ensuring total peace of mind, artistic excellence, and an enjoyable experience.
            </p>
          </Reveal>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step: ProcessStep, idx: number) => (
            <Reveal
              key={step.number}
              delay={0.08 * (idx % 4)}
              className={idx === PROCESS_STEPS.length - 1 ? "md:col-span-2 lg:col-span-1 xl:col-span-2" : ""}
            >
              <div
                className="h-full p-8 bg-studio-card border border-studio-border hover:border-studio-gold/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl text-studio-gold/80 font-light group-hover:text-studio-gold transition-colors">
                      {step.number}
                    </span>
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-studio-muted border border-white/10 px-2 py-0.5">
                      Step {step.number}
                    </span>
                  </div>

                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-studio-gold block mb-1 font-medium">
                    {step.title}
                  </span>

                  <h3 className="font-serif text-2xl text-studio-sand font-normal mb-3 group-hover:text-studio-gold transition-colors">
                    {step.headline}
                  </h3>

                  <p className="text-xs text-studio-muted leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-studio-border/50 flex items-center justify-between text-[0.65rem] text-studio-muted uppercase tracking-wider">
                  <span>The Lumen Standard</span>
                  <span className="text-studio-gold">&rarr;</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
