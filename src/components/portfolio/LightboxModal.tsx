"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { PhotoAsset } from "@/types";
import { STUDIO_CONFIG } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, MessageCircle } from "lucide-react";

interface LightboxModalProps {
  photos: PhotoAsset[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const currentPhoto = photos[currentIndex];
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1); // Loop to last
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // Loop to first
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only register as horizontal swipe if horizontal movement is dominant
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handlePrev(); // Swiped right -> go to previous
      } else {
        handleNext(); // Swiped left -> go to next
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  // Pre-formatted WhatsApp inquiry message for this specific photograph
  const photoTitle = currentPhoto.caption || currentPhoto.alt || "photograph";
  const inquiryMessage = encodeURIComponent(
    `Hello Raju! I was viewing your website gallery and loved this frame: "${photoTitle}" (${currentPhoto.location || "ASR District"}). I would like to inquire about your photography availability.`
  );
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${inquiryMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-sand tracking-widest">
            {String(currentIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          {currentPhoto.category && (
            <>
              <span className="text-white/25">&bull;</span>
              <span className="px-2 py-0.5 text-[0.6875rem] uppercase tracking-wider font-sans bg-forest/80 text-cream border border-forest-light/40">
                {currentPhoto.category.replace("-", " ")}
              </span>
            </>
          )}
          {currentPhoto.location && (
            <span className="hidden sm:inline-flex items-center text-xs text-sand-light/90 font-sans">
              <MapPin size={12} className="mr-1 text-sand" />
              {currentPhoto.location}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* WhatsApp Direct Inquire */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-sans text-cream bg-forest hover:bg-forest-light transition-colors border border-forest-light/50"
            title="Inquire about this style via WhatsApp"
          >
            <MessageCircle size={13} className="text-sand-light" />
            <span>Inquire Frame</span>
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-cream hover:text-sand transition-colors cursor-pointer rounded-full bg-white/10 hover:bg-white/20 active:scale-95"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-cream hover:text-sand transition-colors z-30 bg-black/60 hover:bg-black/80 border border-white/15 cursor-pointer active:scale-95"
        aria-label="Previous photograph"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-cream hover:text-sand transition-colors z-30 bg-black/60 hover:bg-black/80 border border-white/15 cursor-pointer active:scale-95"
        aria-label="Next photograph"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main High-Resolution Photo Display */}
      <div className="relative w-full h-full max-w-6xl max-h-[78vh] sm:max-h-[82vh] p-4 sm:p-8 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.alt || "Photography by Raju"}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-contain select-none"
          />
        </div>
      </div>

      {/* Bottom Narrative & EXIF Strip */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col sm:flex-row sm:items-end justify-between text-xs z-30 gap-3 font-sans">
        <div className="max-w-xl">
          <div className="flex items-center space-x-2 text-sand text-[0.75rem] mb-1 sm:hidden">
            {currentPhoto.location && (
              <span className="flex items-center">
                <MapPin size={11} className="mr-1 text-sand" />
                {currentPhoto.location}
              </span>
            )}
          </div>
          <p className="font-serif text-sm sm:text-base text-cream font-light leading-snug">
            {currentPhoto.caption || currentPhoto.alt}
          </p>
        </div>

        <div className="flex flex-col sm:items-end space-y-1">
          {currentPhoto.exif ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-mono text-sand-light/80">
              <span className="inline-flex items-center text-sand">
                <Camera size={11} className="mr-1 text-forest-light" />
                {currentPhoto.exif.camera || "Sony A7 IV"}
              </span>
              <span>&bull;</span>
              <span>{currentPhoto.exif.lens || "35mm Prime"}</span>
              <span>&bull;</span>
              <span>{currentPhoto.exif.aperture || "f/1.8"}</span>
              <span>&bull;</span>
              <span>{currentPhoto.exif.shutterSpeed || "1/500s"}</span>
              {currentPhoto.exif.iso && (
                <>
                  <span>&bull;</span>
                  <span>ISO {currentPhoto.exif.iso}</span>
                </>
              )}
            </div>
          ) : (
            <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-sand/70">
              Raju&apos;s Photography &bull; ASR District Collection
            </span>
          )}

          {/* Mobile Inquire WhatsApp Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center space-x-1.5 text-xs text-sand hover:text-cream mt-1"
          >
            <MessageCircle size={12} className="text-forest-light" />
            <span>Inquire this style on WhatsApp &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
