import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-cream relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Photography Disciplines
            </Badge>
            <TextReveal
              text="Six Visual Worlds"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            From the laughter of childhood birthdays and wedding rituals to misty forest paths and Eastern Ghats wildlife.
          </p>
        </div>

        {/* Asymmetric Editorial Category Layout */}
        <div className="space-y-16 lg:space-y-24">
          {CATEGORIES.map((cat, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={cat.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Imagery Block */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden bg-sand/30 border border-earth/20 hover:border-forest/50 transition-all duration-500 shadow-xs ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <ParallaxImage
                    src={cat.coverImage}
                    alt={cat.title}
                    aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
                    speed={0.1}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Index Number */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none">
                      <span className="font-serif text-xl sm:text-2xl text-cream font-medium bg-black/60 px-3 py-1 backdrop-blur-xs border border-white/20">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-xs text-cream pointer-events-none">
                      <span className="font-sans uppercase tracking-[0.18em] text-[0.6875rem] bg-black/60 px-2.5 py-1 backdrop-blur-xs">
                        {cat.title}
                      </span>
                    </div>
                  </ParallaxImage>
                </div>

                {/* Narrative Details Block */}
                <Reveal
                  direction={isEven ? "right" : "left"}
                  delay={0.15}
                  className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="inline-flex items-center space-x-2">
                    <span className="w-6 h-[1.5px] bg-forest" />
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-forest font-semibold">
                      {cat.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="inline-flex items-center space-x-2.5 text-xs uppercase tracking-[0.18em] text-forest hover:text-forest-dark transition-colors font-medium group"
                    >
                      <span className="border-b border-forest/40 pb-1 group-hover:border-forest">
                        Explore {cat.title}
                      </span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-forest" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
