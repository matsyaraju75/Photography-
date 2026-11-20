"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { STUDIO_CONFIG } from "@/lib/constants";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";
import { gsap } from "gsap";
import { MessageCircle, ChevronDown, Volume2, VolumeX, Play, Pause } from "lucide-react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Calming cinematic morning nature & celebration visuals
  const videoUrl =
    "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-in-nature-42171-large.mp4";
  const posterUrl = "/images/weddings/ricky-and-micky-wedding.jpg";

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!section || !bg || !content) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline for editorial typography
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bg,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1.0, opacity: 1, duration: 2.0, ease: "power2.out" }
      )
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=1.4"
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          ".hero-tagline",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".hero-hook",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 0.85, duration: 1.0 },
          "-=0.3"
        );

      // 2. Gentle parallax scroll scrub for background
      gsap.to(bg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-cream pt-16">
      {/* 1. Background Visuals with Warm Morning Tone */}
      <div ref={bgRef} className="absolute -top-[10%] -bottom-[10%] inset-x-0 w-full h-[120%] z-0 will-change-transform">
        <Image
          src={posterUrl}
          alt="Morning light over gentle landscapes and wedding celebrations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.7] contrast-[1.05] transition-opacity duration-1000"
        />

        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Warm Morning Light Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-black/35 to-black/50" />
        <div className="absolute inset-0 bg-[#2F4A3A]/10 mix-blend-multiply" />
      </div>

      {/* 2. Central Editorial Content */}
      <Container size="wide" ref={contentRef} className="relative z-10 py-24 sm:py-32 text-center flex flex-col items-center">
        {/* Subtle Region Badge */}
        <div className="hero-badge inline-flex items-center space-x-3 mb-5">
          <span className="w-6 sm:w-10 h-[1px] bg-sand" />
          <span className="font-sans text-[0.6875rem] sm:text-xs tracking-[0.25em] uppercase text-cream font-medium drop-shadow-sm">
            Alluri Sitharama Raju District &bull; Andhra Pradesh
          </span>
          <span className="w-6 sm:w-10 h-[1px] bg-sand" />
        </div>

        {/* Hero Title */}
        <h1 className="hero-title font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-[#FAF7F0] font-normal leading-[1.08] max-w-5xl drop-shadow-md">
          {STUDIO_CONFIG.name}
        </h1>

        {/* Brand Tagline */}
        <p className="hero-tagline mt-4 sm:mt-5 font-serif italic text-xl sm:text-2xl md:text-3xl text-sand-light font-light tracking-wide max-w-3xl drop-shadow-sm">
          {STUDIO_CONFIG.tagline}
        </p>

        {/* Small Supporting Text */}
        <p className="hero-hook mt-5 sm:mt-6 font-sans text-xs sm:text-sm md:text-base text-[#FAF7F0]/90 max-w-xl font-light leading-relaxed drop-shadow-sm px-4">
          &ldquo;{STUDIO_CONFIG.heroHook}&rdquo;
        </p>

        {/* CTAs */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5">
          <div className="hero-cta">
            <Button variant="primary" size="lg" href="#stories">
              Explore My Stories
            </Button>
          </div>

          <a
            href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              STUDIO_CONFIG.whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-300 text-xs px-6 py-3.5 bg-cream-paper/95 text-forest border border-sand hover:bg-forest hover:text-cream shadow-xs"
          >
            <MessageCircle size={15} className="mr-2" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Scroll Prompt */}
        <div className="hero-scroll mt-12 sm:mt-20 flex flex-col items-center opacity-85">
          <span className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-[#FAF7F0] mb-1.5 drop-shadow-xs">
            Scroll to explore
          </span>
          <ChevronDown size={16} className="text-[#FAF7F0] animate-bounce" />
        </div>
      </Container>

      {/* 3. Media Controls */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center space-x-2.5 bg-cream-paper/90 backdrop-blur-md px-3 py-1.5 border border-sand text-xs text-charcoal">
        <button
          onClick={togglePlay}
          className="hover:text-forest transition-colors p-1"
          title={isPlaying ? "Pause video" : "Play video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <span className="w-[1px] h-3 bg-earth/20" />
        <button
          onClick={toggleMute}
          className="hover:text-forest transition-colors p-1 flex items-center space-x-1.5"
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="text-[0.625rem] tracking-wider uppercase font-sans">
            {isMuted ? "Sound Off" : "Sound On"}
          </span>
        </button>
      </div>
    </section>
  );
}
