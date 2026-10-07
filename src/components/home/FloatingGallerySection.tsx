"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { LightboxModal } from "@/components/portfolio/LightboxModal";
import { CURATED_GALLERY_PHOTOS } from "@/lib/constants";
import { PhotoAsset } from "@/types";
import { Camera, MapPin, Maximize2, Compass, Layers, Sparkles, Eye } from "lucide-react";

// Lazy-load the heavy 3D canvas so it NEVER blocks initial page load (Section 17 & 24)
const DynamicFloatingCanvas = dynamic(
  () =>
    import("@/components/3d/FloatingWallCanvas").then(
      (mod) => mod.FloatingWallCanvas
    ),
  {
    ssr: false,
    loading: () => <DepthLoadingSkeleton />,
  }
);

function DepthLoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center bg-cream border border-earth/20 p-8 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-forest/20 border-t-forest animate-spin mb-4" />
      <span className="font-serif text-lg text-charcoal font-medium">
        Calibrating Spatial Depth Wall...
      </span>
      <p className="font-sans text-xs text-charcoal-muted mt-1 max-w-xs">
        Loading Three.js spatial perspective for Eastern Ghats photographs.
      </p>
    </div>
  );
}

export function FloatingGallerySection() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // 6 Curated diverse frames across categories for spatial exploration
  const spatialPhotos = useMemo(() => {
    return [
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-love-1") || CURATED_GALLERY_PHOTOS[4], // Love Stories
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-nat-1") || CURATED_GALLERY_PHOTOS[8],  // Nature Mist
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-wed-1") || CURATED_GALLERY_PHOTOS[0],  // Wedding
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-wild-1") || CURATED_GALLERY_PHOTOS[13],// Wildlife
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-nat-2") || CURATED_GALLERY_PHOTOS[9],  // Monsoon Rain
      CURATED_GALLERY_PHOTOS.find((p) => p.id === "gal-fam-1") || CURATED_GALLERY_PHOTOS[6],  // Family Cradle
    ];
  }, []);

  // Set default selected photo on load
  useEffect(() => {
    if (spatialPhotos.length > 0 && !selectedPhoto) {
      setSelectedPhoto(spatialPhotos[0]);
    }
  }, [spatialPhotos, selectedPhoto]);

  // Check WebGL availability and screen size
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }

    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const lightboxIndex = useMemo(() => {
    if (!selectedPhoto) return 0;
    const idx = spatialPhotos.findIndex((p) => p.id === selectedPhoto.id);
    return idx >= 0 ? idx : 0;
  }, [selectedPhoto, spatialPhotos]);

  return (
    <section className="py-24 sm:py-32 bg-cream relative border-t border-earth/20 grain-overlay overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-earth/20 gap-6">
          <div>
            <Badge variant="gold" className="mb-3">
              Section 07 &bull; Spatial Exhibition
            </Badge>
            <TextReveal
              text="The Floating Depth Wall"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal tracking-tight block"
            />
            <p className="font-serif italic text-base sm:text-lg text-forest mt-2">
              &ldquo;Photographs suspended at different depths in space.&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs font-sans text-charcoal-muted gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-cream-paper border border-earth/25 text-charcoal">
              <Compass size={13} className="mr-1.5 text-forest" />
              Interactive 3D Depth View
            </span>
            <p className="text-left sm:text-right text-[0.75rem] max-w-xs leading-relaxed">
              Move your mouse to gently pivot the spatial perspective. Click any frame to inspect details.
            </p>
          </div>
        </div>

        {/* 3D Exhibition Stage */}
        <div className="relative bg-cream-paper border border-earth/25 shadow-xs overflow-hidden">
          {/* Top Instruction Pill */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center space-x-2 px-3 py-1 bg-cream/90 backdrop-blur-xs border border-earth/20 text-[0.6875rem] text-charcoal-muted font-sans">
            <Layers size={12} className="text-forest" />
            <span>Mouse movement shifts depth perspective</span>
          </div>

          {/* Conditional 3D / Fallback rendering */}
          {webGLSupported && !isMobileDevice ? (
            <div className="w-full h-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">
              <DynamicFloatingCanvas
                photos={spatialPhotos}
                selectedPhoto={selectedPhoto}
                onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              />
            </div>
          ) : (
            /* Elegant Mobile & No-WebGL 2.5D Layered Fallback (Prompt: On mobile, simplify or disable expensive 3D) */
            <div className="p-6 sm:p-10">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-forest font-semibold">
                  Touch &bull; Spatial Selection
                </span>
                <p className="text-xs text-charcoal-muted mt-1">
                  Tap any photograph to explore its narrative and camera settings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spatialPhotos.map((photo) => {
                  const isSelected = selectedPhoto?.id === photo.id;
                  return (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`cursor-pointer border transition-all duration-300 p-2.5 bg-cream shadow-xs ${
                        isSelected
                          ? "border-forest ring-1 ring-forest"
                          : "border-earth/20 hover:border-earth/40"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30 mb-2">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center"
                        />
                      </div>
                      <p className="font-serif text-sm text-charcoal font-medium truncate">
                        {photo.caption || photo.alt}
                      </p>
                      <p className="text-[0.6875rem] text-charcoal-muted mt-0.5">
                        {photo.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Selected Photo Detail Bar */}
          {selectedPhoto && (
            <div className="border-t border-earth/20 p-5 sm:p-6 bg-cream/95 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
              <div className="max-w-xl">
                <div className="flex items-center space-x-2 text-[0.6875rem] text-earth font-sans mb-1">
                  {selectedPhoto.category && (
                    <span className="uppercase tracking-widest font-semibold">
                      {selectedPhoto.category.replace("-", " ")}
                    </span>
                  )}
                  {selectedPhoto.location && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center">
                        <MapPin size={11} className="mr-1 text-forest" />
                        {selectedPhoto.location}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium leading-snug">
                  {selectedPhoto.caption || selectedPhoto.alt}
                </h3>
                {selectedPhoto.exif && (
                  <p className="text-[0.6875rem] font-mono text-charcoal-muted mt-1 flex items-center">
                    <Camera size={11} className="mr-1.5 text-forest" />
                    <span>
                      {selectedPhoto.exif.camera} &bull; {selectedPhoto.exif.lens} &bull; {selectedPhoto.exif.aperture} &bull; {selectedPhoto.exif.shutterSpeed}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-forest text-cream hover:bg-forest-dark transition-colors font-sans text-xs uppercase tracking-wider border border-forest cursor-pointer shadow-xs active:scale-98"
                >
                  <Eye size={13} />
                  <span>Inspect Full Frame</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Fullscreen Lightbox Modal when viewing chosen frame */}
      <LightboxModal
        photos={spatialPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setSelectedPhoto(spatialPhotos[newIdx])}
      />
    </section>
  );
}
