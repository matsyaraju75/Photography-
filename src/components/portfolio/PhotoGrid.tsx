"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhotoAsset } from "@/types";
import { LightboxModal } from "@/components/portfolio/LightboxModal";
import { Eye, Camera } from "lucide-react";

interface PhotoGridProps {
  photos: PhotoAsset[];
  columns?: 2 | 3 | 4;
}

export function PhotoGrid({ photos, columns = 3 }: PhotoGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${colClasses[columns]} gap-6`}>
        {photos.map((photo, idx) => {
          const isPortrait = photo.aspectRatio === "portrait";

          return (
            <div
              key={photo.id || idx}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.alt || photo.caption}`}
              className="group relative cursor-pointer overflow-hidden bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all duration-300 shadow-xs focus-visible:outline-2 focus-visible:outline-forest"
            >
              {/* Responsive Container based on aspect ratio */}
              <div
                className={`relative w-full ${
                  isPortrait ? "aspect-[3/4]" : "aspect-[16/10]"
                } overflow-hidden bg-sand/30`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={idx < 3 ? "eager" : "lazy"}
                  className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay on hover (Desktop) */}
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-black/60 text-cream backdrop-blur-xs border border-white/20">
                      <Eye size={13} />
                    </span>
                  </div>

                  <div className="text-cream text-xs">
                    <p className="font-serif text-sm font-medium leading-snug line-clamp-2">{photo.caption || photo.alt}</p>
                    {photo.exif && (
                      <p className="text-[0.6875rem] font-mono text-sand-light mt-1 flex items-center">
                        <Camera size={11} className="mr-1.5 text-forest-light shrink-0" />
                        <span className="truncate">
                          {photo.exif.camera} &bull; {photo.exif.lens}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile-Friendly Editorial Caption (Section 26) */}
              <div className="md:hidden p-3 bg-cream border-t border-earth/15">
                <p className="font-serif text-xs text-charcoal font-medium leading-snug line-clamp-1">
                  {photo.caption || photo.alt}
                </p>
                {photo.location && (
                  <p className="text-[0.65rem] text-charcoal-muted mt-0.5">
                    {photo.location}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        photos={photos}
        currentIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />
    </>
  );
}
