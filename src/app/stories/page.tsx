"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FEATURED_STORIES, CATEGORIES } from "@/lib/constants";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function StoriesIndexPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredStories =
    selectedFilter === "all"
      ? FEATURED_STORIES
      : FEATURED_STORIES.filter((s) => s.category === selectedFilter);

  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* Editorial Header */}
      <section className="py-20 sm:py-28 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <Badge variant="gold" className="mb-4">
            Narrative Archives
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight mb-4">
            Stories of Life, Love &amp; The Wild
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-forest max-w-2xl font-light leading-relaxed">
            Every celebration, wedding ritual, and forest encounter commands its own complete visual narrative.
          </p>

          {/* Category Filter Chips */}
          <div className="mt-10 flex flex-wrap gap-2.5 pt-6 border-t border-earth/20">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans border transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-forest text-cream border-forest font-medium shadow-xs"
                  : "bg-cream text-charcoal-muted border-earth/20 hover:text-charcoal"
              }`}
            >
              All Stories ({FEATURED_STORIES.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedFilter(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans border transition-all cursor-pointer ${
                  selectedFilter === cat.slug
                    ? "bg-forest text-cream border-forest font-medium shadow-xs"
                    : "bg-cream text-charcoal-muted border-earth/20 hover:text-charcoal"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group flex flex-col bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all duration-300 overflow-hidden shadow-xs"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand/30">
                  <Image
                    src={story.coverImage.url}
                    alt={story.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-cream bg-black/60 px-2 py-0.5 backdrop-blur-xs font-medium">
                      {story.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-cream text-[0.6875rem]">
                    <span className="inline-flex items-center">
                      <MapPin size={12} className="text-sand mr-1" />
                      {story.location}
                    </span>
                    <span className="inline-flex items-center">
                      <Calendar size={12} className="text-sand mr-1" />
                      {story.eventDate}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-charcoal font-medium leading-snug mb-2 group-hover:text-forest transition-colors">
                      {story.title}
                    </h2>
                    <p className="text-xs text-charcoal/80 leading-relaxed font-sans mb-4">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-earth/15 flex items-center justify-between text-xs text-forest font-semibold uppercase tracking-wider">
                    <span>Explore Photo Essay</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
