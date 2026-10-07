"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FEATURED_STORIES } from "@/lib/constants";
import { MapPin, Calendar, Quote, ArrowRight, Camera } from "lucide-react";

export function SignatureWorkSection() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const activeStory = FEATURED_STORIES[selectedStoryIndex] || FEATURED_STORIES[0];

  return (
    <section id="stories" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Narrative Photo Essays
            </Badge>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
              Featured Stories
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 md:mt-0">
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm leading-relaxed font-sans">
              I photograph moments as chapters in a larger human story — capturing the quiet pauses between rituals and the honest rhythm of life.
            </p>
            <Link
              href="/stories"
              className="text-xs uppercase tracking-widest text-forest hover:text-forest-dark font-medium whitespace-nowrap border-b border-forest/40 pb-1"
            >
              All Stories &rarr;
            </Link>
          </div>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex space-x-3.5 overflow-x-auto pb-4 mb-10 scrollbar-none" role="tablist">
          {FEATURED_STORIES.map((story, idx) => {
            const isActive = idx === selectedStoryIndex;
            return (
              <button
                key={story.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedStoryIndex(idx)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-sans border transition-all duration-300 whitespace-nowrap cursor-pointer text-left ${
                  isActive
                    ? "bg-forest text-cream border-forest font-medium shadow-xs"
                    : "bg-cream text-charcoal-muted border-earth/20 hover:text-charcoal hover:border-earth/40"
                }`}
              >
                <span>{story.title}</span>
                <span className="block text-[0.625rem] opacity-80 font-normal tracking-wider mt-0.5">
                  {story.categoryLabel} &bull; {story.location}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Story Featured Stage */}
        <div className="bg-cream border border-earth/25 p-6 sm:p-10 lg:p-12 mb-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story Hero Cover */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-sand/30 border border-earth/20 group">
              <Image
                src={activeStory.coverImage.url}
                alt={activeStory.coverImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />

              {/* EXIF Camera Stamp */}
              {activeStory.coverImage.exif && (
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[0.6875rem] text-cream bg-black/60 px-2.5 py-1 backdrop-blur-xs font-mono">
                  <Camera size={13} className="text-sand" />
                  <span>
                    {activeStory.coverImage.exif.camera} &bull; {activeStory.coverImage.exif.lens}
                  </span>
                </div>
              )}
            </div>

            {/* Story Synopsis & Metadata */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-muted">
                <span className="inline-flex items-center text-forest font-medium">
                  <MapPin size={13} className="mr-1" />
                  {activeStory.location}
                </span>
                <span>&bull;</span>
                <span className="inline-flex items-center">
                  <Calendar size={13} className="mr-1" />
                  {activeStory.eventDate}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-medium leading-snug">
                {activeStory.title}
              </h3>

              <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                {activeStory.summary}
              </p>

              {/* Testimonial Quote if available */}
              {activeStory.testimonial && (
                <div className="p-4 bg-cream-paper border-l-2 border-forest my-2 text-xs sm:text-sm text-charcoal/85 italic font-serif">
                  <Quote size={16} className="text-forest mb-1 opacity-70" />
                  <p>&ldquo;{activeStory.testimonial.quote}&rdquo;</p>
                  <p className="mt-2 not-italic font-sans text-[0.6875rem] text-charcoal-muted font-medium">
                    &mdash; {activeStory.testimonial.author}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={`/stories/${activeStory.slug}`}
                  className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-medium text-forest hover:text-forest-dark group"
                >
                  <span className="border-b border-forest/40 pb-0.5 group-hover:border-forest">
                    View Complete Photo Essay
                  </span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
