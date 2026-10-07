"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LightboxModal } from "@/components/portfolio/LightboxModal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CURATED_GALLERY_PHOTOS, STUDIO_CONFIG } from "@/lib/constants";
import { PhotoAsset, PhotographyCategoryType } from "@/types";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";
import { gsap } from "gsap";
import { Camera, MapPin, Maximize2, ChevronDown, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

type FilterId = "all" | PhotographyCategoryType;

interface FilterOption {
  id: FilterId;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All Frames" },
  { id: "weddings", label: "Weddings" },
  { id: "love-stories", label: "Love Stories" },
  { id: "celebrations", label: "Celebrations" },
  { id: "family", label: "Family Beginnings" },
  { id: "nature", label: "Nature & Hills" },
  { id: "wildlife", label: "Wildlife" },
];

export function MasonryGallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CURATED_GALLERY_PHOTOS.length };
    CURATED_GALLERY_PHOTOS.forEach((photo) => {
      if (photo.category) {
        counts[photo.category] = (counts[photo.category] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Filtered photo assets
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return CURATED_GALLERY_PHOTOS;
    return CURATED_GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);
  }, [activeFilter]);

  // Paginated/curated display slice (Performance: do not load entire gallery at once)
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  // Section 16 & 18: Subtle exhibition movement as user scrolls
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const container = galleryRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Smooth card reveal on filter or load
      gsap.fromTo(
        ".gallery-card",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.04,
          ease: "power2.out",
        }
      );

      // 2. Subtle differential scroll drift on larger screens (Exhibition Walking Effect)
      if (window.innerWidth >= 768) {
        const cards = container.querySelectorAll<HTMLElement>(".gallery-card");
        cards.forEach((card, idx) => {
          const driftOffset = idx % 2 === 0 ? 12 : -12;
          gsap.fromTo(
            card,
            { y: -driftOffset },
            {
              y: driftOffset,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            }
          );
        });
      }
    }, container);

    return () => ctx.revert();
  }, [activeFilter, displayedPhotos.length]);

  const handleFilterChange = (filterId: FilterId) => {
    setActiveFilter(filterId);
    setVisibleCount(12); // Reset page count on filter switch
  };

  const handleOpenLightbox = (indexInDisplayed: number) => {
    setSelectedPhotoIndex(indexInDisplayed);
    setLightboxOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredPhotos.length));
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/20 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-8 border-b border-earth/20 gap-6">
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-3">
              Section 06 &bull; Photo Wall &amp; Gallery
            </Badge>
            <TextReveal
              text="The Living Wall"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal tracking-tight block"
            />
            <p className="font-serif text-lg sm:text-xl text-charcoal-muted mt-3 italic font-light">
              &ldquo;Frames captured without pretense — the laughter of children, sacred rituals, morning mist over Araku, and the quiet wild birds of the Eastern Ghats.&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-charcoal-muted font-sans gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-cream border border-earth/25 text-forest font-medium">
              <Sparkles size={12} className="mr-1.5 text-earth" />
              {CURATED_GALLERY_PHOTOS.length} Authentic ASR Frames
            </span>
            <p className="max-w-xs text-left sm:text-right text-[0.75rem] leading-relaxed">
              Curated by Raju across Araku, Paderu, Maredumilli, Ananthagiri &amp; Chintapalli.
            </p>
          </div>
        </div>

        {/* Category Filter Navigation (Mobile-first horizontal scrollbar) */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = categoryCounts[filter.id] || 0;

              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`shrink-0 px-4 py-2 text-xs uppercase tracking-wider font-sans transition-all duration-300 border cursor-pointer select-none flex items-center space-x-2 ${
                    isActive
                      ? "bg-forest text-cream border-forest font-medium shadow-xs"
                      : "bg-cream text-charcoal-muted border-earth/20 hover:text-charcoal hover:border-earth/40"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`text-[0.65rem] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-cream/20 text-cream" : "bg-earth/10 text-charcoal-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Masonry Layout (CSS Columns with break-inside-avoid) */}
        <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {displayedPhotos.map((photo, index) => {
            // Distinct aspect ratio per photo asset
            const aspectClass =
              photo.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : photo.aspectRatio === "square"
                ? "aspect-[1/1]"
                : "aspect-[16/10]";

            return (
              <div
                key={photo.id || index}
                onClick={() => handleOpenLightbox(index)}
                className="gallery-card break-inside-avoid mb-6 group relative cursor-pointer overflow-hidden bg-cream border border-earth/20 hover:border-forest/50 transition-all duration-300 shadow-xs focus-visible:outline-2 focus-visible:outline-forest will-change-transform"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenLightbox(index);
                  }
                }}
                aria-label={`View photo: ${photo.alt || photo.caption}`}
              >
                {/* Image Container */}
                <div className={`relative w-full ${aspectClass} overflow-hidden bg-sand/30`}>
                  <Image
                    src={photo.url}
                    alt={photo.alt || "Photograph by Raju"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 4 ? "eager" : "lazy"}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                    {photo.category && (
                      <span className="px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider font-sans bg-forest/85 text-cream backdrop-blur-xs border border-forest-light/40 shadow-xs">
                        {photo.category.replace("-", " ")}
                      </span>
                    )}

                    <span className="p-1.5 rounded-full bg-black/50 text-cream backdrop-blur-xs border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={12} />
                    </span>
                  </div>

                  {/* Desktop Hover Scrim */}
                  <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-5 text-cream">
                    {photo.location && (
                      <div className="flex items-center text-[0.6875rem] text-sand mb-1 font-sans">
                        <MapPin size={11} className="mr-1 text-sand" />
                        <span>{photo.location}</span>
                      </div>
                    )}

                    <p className="font-serif text-base font-normal leading-snug line-clamp-2">
                      {photo.caption || photo.alt}
                    </p>

                    {photo.exif && (
                      <div className="mt-2 pt-2 border-t border-white/15 flex items-center space-x-2 text-[0.6875rem] font-mono text-sand-light">
                        <Camera size={11} className="text-forest-light shrink-0" />
                        <span className="truncate">
                          {photo.exif.camera} &bull; {photo.exif.lens}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile-Friendly Editorial Caption (Section 26: Important content must not depend only on hover) */}
                <div className="md:hidden p-3.5 bg-cream border-t border-earth/15">
                  <div className="flex items-center justify-between text-[0.6875rem] text-charcoal-muted mb-1 font-sans">
                    {photo.location ? (
                      <span className="flex items-center text-earth">
                        <MapPin size={11} className="mr-1 text-forest" />
                        {photo.location}
                      </span>
                    ) : (
                      <span>ASR District</span>
                    )}
                    {photo.exif?.camera && (
                      <span className="font-mono text-[0.65rem] text-charcoal-muted/80">
                        {photo.exif.camera}
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-sm text-charcoal font-medium leading-snug line-clamp-1">
                    {photo.caption || photo.alt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Pagination & Gallery Footer */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-earth/20 flex flex-col items-center text-center">
          <div className="text-xs font-sans text-charcoal-muted mb-4">
            Showing <strong className="text-charcoal">{displayedPhotos.length}</strong> of{" "}
            <strong className="text-charcoal">{filteredPhotos.length}</strong> frames in this category
          </div>

          {displayedPhotos.length < filteredPhotos.length ? (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-forest text-cream hover:bg-forest-dark transition-all duration-300 font-sans text-xs uppercase tracking-widest border border-forest cursor-pointer shadow-xs active:scale-98"
            >
              <span>Load More Frames</span>
              <ChevronDown size={14} />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans text-charcoal-muted">
              <span>All {filteredPhotos.length} curated frames displayed.</span>
              <span className="hidden sm:inline">&bull;</span>
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Raju, I looked through your website gallery and would love to discuss custom coverage for my event."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-forest font-medium hover:underline space-x-1"
              >
                <MessageCircle size={13} className="text-forest" />
                <span>Have a custom event or shoot in mind? Inquire on WhatsApp &rarr;</span>
              </a>
            </div>
          )}
        </div>
      </Container>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        photos={filteredPhotos}
        currentIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />
    </section>
  );
}
