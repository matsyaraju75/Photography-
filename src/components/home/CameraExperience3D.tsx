"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Camera, Sparkles, RefreshCw, ArrowRight } from "lucide-react";

// Lazy-load the heavy 3D canvas so it NEVER blocks initial page load
const DynamicCameraCanvas = dynamic(
  () => import("@/components/3d/CameraCanvas").then((mod) => mod.CameraCanvas),
  {
    ssr: false,
    loading: () => <CameraLoadingSkeleton />,
  }
);

function CameraLoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex flex-col items-center justify-center bg-studio-card/60 border border-studio-border">
      <div className="w-12 h-12 rounded-full border border-studio-gold/40 border-t-studio-gold animate-spin mb-4" />
      <span className="font-mono text-xs uppercase tracking-widest text-studio-muted">
        Calibrating 3D Rangefinder...
      </span>
    </div>
  );
}

export function CameraExperience3D() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL availability on client mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  const triggerShutter = () => {
    // Shutter flash effect
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
      setIsCaptured(true);
    }, 280);
  };

  const resetCapture = () => {
    setIsCaptured(false);
  };

  return (
    <section className="py-28 sm:py-36 bg-studio-black relative border-t border-studio-border/60 grain-overlay overflow-hidden">
      {/* Shutter White Flash Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-300 ${
          isFlashActive ? "opacity-90" : "opacity-0"
        }`}
      />

      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-studio-border">
          <Reveal>
            <Badge variant="gold" className="mb-4">
              Interactive 3D Experience
            </Badge>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-studio-sand font-light">
              Camera &rarr; Shutter &rarr; Story
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-studio-muted max-w-md mt-6 md:mt-0 leading-relaxed font-sans">
              Experience the physical soul of our craft. Move your cursor to inspect our primary rangefinder, then trip the shutter to reveal the captured frame.
            </p>
          </Reveal>
        </div>

        {/* 3D Stage & Story Transition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-studio-dark border border-studio-border p-6 sm:p-10 lg:p-12 relative">
          {/* Left Canvas or Captured Photograph */}
          <div className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-studio-card border border-studio-border flex items-center justify-center">
            {isCaptured ? (
              /* The Captured Master Frame */
              <div className="relative w-full h-full animate-fade-in group">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                  alt="Captured Wedding Moment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-black/90 via-transparent to-transparent opacity-80" />

                {/* Corner EXIF Stamp */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-studio-sand">
                  <div>
                    <span className="font-sans text-[0.65rem] uppercase tracking-widest text-studio-gold block">
                      Captured Frame &bull; Villa Cetinale
                    </span>
                    <span className="font-serif text-lg text-studio-sand">
                      Elena &amp; Marcus &bull; Tuscany
                    </span>
                  </div>
                  <button
                    onClick={resetCapture}
                    className="flex items-center space-x-1.5 text-xs text-studio-gold hover:text-studio-sand bg-black/70 px-3 py-1.5 border border-studio-gold/30 backdrop-blur-xs cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    <span>Reset Shutter</span>
                  </button>
                </div>
              </div>
            ) : webGLSupported ? (
              /* The 3D Interactive Camera */
              <div className="relative w-full h-full">
                <DynamicCameraCanvas
                  onShutterClick={triggerShutter}
                  isTriggered={isFlashActive}
                />
                <div className="absolute bottom-4 left-4 pointer-events-none text-[0.65rem] uppercase tracking-widest text-studio-muted font-sans bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-xs">
                  Cursor Tilt Active &bull; Click Shutter to Capture
                </div>
              </div>
            ) : (
              /* Graceful Fallback if WebGL unavailable */
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85"
                  alt="Studio Rangefinder Camera"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Right Narrative & Concept Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-studio-gold block mb-2 font-medium">
                The Philosophy of Capture
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-studio-sand font-normal mb-4">
                {isCaptured ? "A Moment Preserved Forever." : "From Machine to Masterpiece."}
              </h3>
              <p className="text-xs sm:text-sm text-studio-muted leading-relaxed font-sans mb-6">
                {isCaptured
                  ? "At 1/500th of a second, an unrepeatable breath becomes immortalized. The camera did not create the love; it simply witnessed it."
                  : "Every camera in our collection is an extension of the photographer's eye — machined brass dials, calibrated glass elements, and quiet mechanical shutters designed for unobtrusive presence."}
              </p>

              {/* 3-Step Journey Indicator */}
              <div className="space-y-3 pt-4 border-t border-studio-border">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-studio-gold text-studio-black flex items-center justify-center font-mono text-[0.65rem] font-bold">
                    1
                  </span>
                  <span className="text-studio-sand/90 font-sans">
                    Precision Optical Alignment &amp; Light Reading
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[0.65rem] font-bold ${
                      isCaptured
                        ? "bg-studio-gold text-studio-black"
                        : "border border-studio-gold text-studio-gold"
                    }`}
                  >
                    2
                  </span>
                  <span className="text-studio-sand/90 font-sans">
                    Tactile Shutter Release (1/500s &bull; f/1.4)
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[0.65rem] font-bold ${
                      isCaptured
                        ? "bg-studio-gold text-studio-black"
                        : "border border-white/20 text-studio-muted"
                    }`}
                  >
                    3
                  </span>
                  <span className="text-studio-sand/90 font-sans">
                    Archival Heirlooms Preserved for Generations
                  </span>
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-6 border-t border-studio-border flex flex-col sm:flex-row gap-4">
              {isCaptured ? (
                <Button
                  variant="primary"
                  size="md"
                  href="/stories/elena-and-marcus-florence"
                  className="w-full sm:w-auto"
                >
                  <span className="flex items-center space-x-2">
                    <span>Read The Full Tuscany Story</span>
                    <ArrowRight size={14} />
                  </span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={triggerShutter}
                  className="w-full sm:w-auto"
                >
                  <span className="flex items-center space-x-2">
                    <Camera size={14} />
                    <span>Trip Camera Shutter</span>
                  </span>
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                href="#behind-the-lens"
                className="w-full sm:w-auto"
              >
                Inspect Gear Setup
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
