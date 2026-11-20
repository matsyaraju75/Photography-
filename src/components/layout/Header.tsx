"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CATEGORIES, STUDIO_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Phone,
  Camera,
  MapPin,
  Sparkles,
  BookOpen,
  Eye,
  Film,
  Layers,
  Calendar,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Track scroll position for dynamic glassmorphic background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile offcanvas is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown hover handlers with graceful delay
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
    setMoreDropdownOpen(false);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const handleMoreMouseEnter = () => {
    if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(false);
    setMoreDropdownOpen(true);
  };

  const handleMoreMouseLeave = () => {
    moreTimeoutRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#FAF7F0]/95 backdrop-blur-xl py-3 border-b border-[#765B43]/20 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-[#FAF7F0]/80 backdrop-blur-md py-4.5 border-b border-[#765B43]/10"
        )}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* 1. Studio Brand & Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F4A3A]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2F4A3A] flex items-center justify-center text-[#F5F1E8] shadow-xs group-hover:scale-105 transition-transform duration-300">
              <Camera size={18} className="text-[#F5F1E8]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.14em] text-[#252525] group-hover:text-[#2F4A3A] transition-colors duration-200 font-medium leading-tight">
                {STUDIO_CONFIG.name}
              </span>
              <span className="font-sans text-[0.5625rem] sm:text-[0.625rem] tracking-[0.18em] text-[#765B43] uppercase font-medium">
                ASR District &bull; Andhra Pradesh
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation with Premium Grouped Menus */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {/* Home */}
            <Link
              href="/"
              className={cn(
                "px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium transition-colors relative group",
                pathname === "/" ? "text-[#2F4A3A]" : "text-[#252525]/85 hover:text-[#2F4A3A]"
              )}
            >
              Home
              <span
                className={cn(
                  "absolute bottom-0 left-3 right-3 h-[2px] bg-[#2F4A3A] transition-all duration-200",
                  pathname === "/" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />
            </Link>

            {/* Services Dropdown (Mega Menu showcasing all 6 disciplines) */}
            <div
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={cn(
                  "px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium transition-colors flex items-center space-x-1 cursor-pointer",
                  servicesDropdownOpen || pathname.startsWith("/categories")
                    ? "text-[#2F4A3A]"
                    : "text-[#252525]/85 hover:text-[#2F4A3A]"
                )}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown
                  size={13}
                  className={cn(
                    "transition-transform duration-200 text-[#765B43]",
                    servicesDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Services Mega Dropdown Container */}
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#FAF7F0] border border-[#765B43]/20 shadow-2xl p-6 transition-all duration-250 ease-out z-50",
                  servicesDropdownOpen
                    ? "opacity-100 pointer-events-auto translate-y-2 visible"
                    : "opacity-0 pointer-events-none translate-y-0 invisible"
                )}
              >
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#765B43]/15">
                  <div>
                    <span className="text-[0.625rem] font-sans uppercase tracking-[0.2em] text-[#765B43] font-semibold block">
                      Specialized Disciplines
                    </span>
                    <h4 className="font-serif text-lg text-[#252525] font-medium">
                      Photography Services & Commissions
                    </h4>
                  </div>
                  <Link
                    href="/#categories"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="text-[0.6875rem] uppercase tracking-wider text-[#2F4A3A] hover:underline font-semibold flex items-center"
                  >
                    <span>All Services Overview</span>
                    <ArrowRight size={12} className="ml-1" />
                  </Link>
                </div>

                {/* 6 Category / Service Cards Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="group flex items-center space-x-3 p-2.5 bg-[#F5F1E8]/70 hover:bg-[#F5F1E8] border border-[#765B43]/15 hover:border-[#2F4A3A]/40 transition-all duration-200"
                    >
                      <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-[#D8C9B3]/40 border border-[#765B43]/20">
                        <Image
                          src={cat.coverImage}
                          alt={cat.title}
                          fill
                          sizes="60px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif text-base text-[#252525] group-hover:text-[#2F4A3A] transition-colors font-medium truncate">
                            {cat.title}
                          </h5>
                          <span className="text-[0.625rem] font-mono px-1.5 py-0.5 bg-[#FAF7F0] border border-[#765B43]/20 text-[#765B43] shrink-0 font-medium">
                            {cat.count} Photos
                          </span>
                        </div>
                        <p className="text-[0.6875rem] text-[#5C5850] truncate font-sans mt-0.5">
                          {cat.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom Bar: Quick link to Investment Calculator */}
                <div className="mt-4 pt-3 border-t border-[#765B43]/15 flex items-center justify-between text-xs font-sans bg-[#F5F1E8]/50 px-4 py-2.5">
                  <span className="text-[#5C5850]">
                    Need custom event pricing, drone aerials or Canvera albums?
                  </span>
                  <Link
                    href="/investment"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="font-medium text-[#2F4A3A] hover:underline flex items-center space-x-1"
                  >
                    <span>Calculate Investment</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <Link
              href="/#gallery"
              className="px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#252525]/85 hover:text-[#2F4A3A] transition-colors relative group"
            >
              Gallery
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2F4A3A] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>

            {/* Stories */}
            <Link
              href="/#stories"
              className="px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#252525]/85 hover:text-[#2F4A3A] transition-colors relative group"
            >
              Stories
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2F4A3A] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>

            {/* Investment / Packages */}
            <Link
              href="/investment"
              className={cn(
                "px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium transition-colors relative group",
                pathname === "/investment" ? "text-[#2F4A3A]" : "text-[#252525]/85 hover:text-[#2F4A3A]"
              )}
            >
              Investment
              <span
                className={cn(
                  "absolute bottom-0 left-3 right-3 h-[2px] bg-[#2F4A3A] transition-all duration-200",
                  pathname === "/investment" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />
            </Link>

            {/* Availability */}
            <Link
              href="/availability"
              className={cn(
                "px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium transition-colors relative group",
                pathname === "/availability" ? "text-[#2F4A3A]" : "text-[#252525]/85 hover:text-[#2F4A3A]"
              )}
            >
              Availability
              <span
                className={cn(
                  "absolute bottom-0 left-3 right-3 h-[2px] bg-[#2F4A3A] transition-all duration-200",
                  pathname === "/availability" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />
            </Link>

            {/* "More / Studio" Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMoreMouseEnter}
              onMouseLeave={handleMoreMouseLeave}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#252525]/85 hover:text-[#2F4A3A] transition-colors flex items-center space-x-1 cursor-pointer"
                aria-expanded={moreDropdownOpen}
              >
                <span>Studio</span>
                <ChevronDown
                  size={13}
                  className={cn(
                    "transition-transform duration-200 text-[#765B43]",
                    moreDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 w-64 bg-[#FAF7F0] border border-[#765B43]/20 shadow-xl py-2 transition-all duration-200 z-50",
                  moreDropdownOpen
                    ? "opacity-100 pointer-events-auto translate-y-2 visible"
                    : "opacity-0 pointer-events-none translate-y-0 invisible"
                )}
              >
                <Link
                  href="/#about"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-[#F5F1E8] text-[#252525] hover:text-[#2F4A3A] transition-colors"
                >
                  <Camera size={15} className="text-[#765B43]" />
                  <div>
                    <span className="block text-xs font-serif font-medium">About Raju</span>
                    <span className="block text-[0.625rem] text-[#5C5850]">Philosophy & Story</span>
                  </div>
                </Link>

                <Link
                  href="/#albums"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-[#F5F1E8] text-[#252525] hover:text-[#2F4A3A] transition-colors"
                >
                  <BookOpen size={15} className="text-[#765B43]" />
                  <div>
                    <span className="block text-xs font-serif font-medium">Handcrafted Albums</span>
                    <span className="block text-[0.625rem] text-[#5C5850]">Lay-Flat Family Heirlooms</span>
                  </div>
                </Link>

                <Link
                  href="/#behind-the-lens"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-[#F5F1E8] text-[#252525] hover:text-[#2F4A3A] transition-colors"
                >
                  <Layers size={15} className="text-[#765B43]" />
                  <div>
                    <span className="block text-xs font-serif font-medium">Behind The Lens</span>
                    <span className="block text-[0.625rem] text-[#5C5850]">Craft, Gear & Workflow</span>
                  </div>
                </Link>

                <Link
                  href="/#asr"
                  onClick={() => setMoreDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-[#F5F1E8] text-[#252525] hover:text-[#2F4A3A] transition-colors"
                >
                  <MapPin size={15} className="text-[#765B43]" />
                  <div>
                    <span className="block text-xs font-serif font-medium">Stories from ASR</span>
                    <span className="block text-[0.625rem] text-[#5C5850]">Regional Heritage & Hills</span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>

          {/* 3. Action Controls: WhatsApp Pill + Booking Button */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Live WhatsApp Pill */}
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#2F4A3A]/30 bg-[#2F4A3A]/5 hover:bg-[#2F4A3A] hover:text-[#FAF7F0] text-[#2F4A3A] text-xs font-sans font-medium transition-all duration-200 shadow-2xs group"
              title="Chat directly with Raju on WhatsApp"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <MessageCircle size={14} className="text-[#2F4A3A] group-hover:text-[#FAF7F0] transition-colors" />
              <span className="hidden sm:inline uppercase tracking-wider text-[0.6875rem]">WhatsApp</span>
            </a>

            {/* Book Session CTA */}
            <Button
              variant="primary"
              size="sm"
              href="/#contact"
              className="hidden sm:inline-flex px-4 py-2 text-xs font-sans tracking-[0.14em] uppercase"
            >
              Book Session
            </Button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#252525] hover:text-[#2F4A3A] transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F4A3A] cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. Responsive Mobile Offcanvas Drawer (Bootstrap-style collapsible) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#FAF7F0] lg:hidden flex flex-col justify-between pt-20 pb-6 px-6 transition-all duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0 visible"
            : "opacity-0 pointer-events-none -translate-y-4 invisible"
        )}
      >
        <div className="space-y-6 pt-3">
          {/* Quick Header in Drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-[#765B43]/20">
            <div>
              <span className="text-xs font-serif font-medium text-[#252525] block">
                {STUDIO_CONFIG.name}
              </span>
              <span className="text-[0.625rem] text-[#765B43] tracking-wider uppercase font-medium">
                {STUDIO_CONFIG.address}
              </span>
            </div>
            <a
              href={`tel:${STUDIO_CONFIG.phone}`}
              className="text-xs text-[#2F4A3A] font-semibold flex items-center space-x-1"
            >
              <Phone size={13} />
              <span>Call Studio</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Home</span>
              <span className="text-xs font-sans text-[#765B43]">01</span>
            </Link>

            {/* Collapsible Services Accordion */}
            <div className="border-b border-[#765B43]/10">
              <button
                type="button"
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="w-full flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] text-left cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <span>Photography Services</span>
                  <span className="text-[0.625rem] px-2 py-0.5 bg-[#2F4A3A]/10 text-[#2F4A3A] font-sans font-semibold rounded-full">
                    6 Disciplines
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "text-[#765B43] transition-transform duration-200",
                    mobileServicesExpanded ? "rotate-180" : ""
                  )}
                />
              </button>

              {mobileServicesExpanded && (
                <div className="pl-3 pr-1 pb-3 pt-1 space-y-2 bg-[#F5F1E8]/60 my-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2 bg-[#FAF7F0] border border-[#765B43]/15 text-sm font-sans text-[#252525] hover:text-[#2F4A3A]"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="relative w-8 h-8 rounded-xs overflow-hidden shrink-0">
                          <Image
                            src={cat.coverImage}
                            alt={cat.title}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-serif font-medium text-[#252525]">
                            {cat.title}
                          </span>
                          <span className="block text-[0.625rem] text-[#765B43]">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[0.625rem] font-mono text-[#765B43]">
                        {cat.count} frames
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Gallery Exhibition</span>
              <span className="text-xs font-sans text-[#765B43]">02</span>
            </Link>

            <Link
              href="/#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Featured Stories</span>
              <span className="text-xs font-sans text-[#765B43]">03</span>
            </Link>

            <Link
              href="/investment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Investment & Pricing</span>
              <span className="text-xs font-sans text-[#765B43]">04</span>
            </Link>

            <Link
              href="/availability"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Date Availability</span>
              <span className="text-xs font-sans text-[#765B43]">05</span>
            </Link>

            <Link
              href="/#albums"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>Handcrafted Albums</span>
              <span className="text-xs font-sans text-[#765B43]">06</span>
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 text-base font-serif text-[#252525] hover:bg-[#F5F1E8] border-b border-[#765B43]/10"
            >
              <span>About Raju</span>
              <span className="text-xs font-sans text-[#765B43]">07</span>
            </Link>
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-6 border-t border-[#765B43]/20 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 py-3 px-3 border border-[#2F4A3A] bg-[#2F4A3A]/5 text-[#2F4A3A] font-sans text-xs uppercase tracking-wider font-semibold"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <Button
              variant="primary"
              size="md"
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs uppercase tracking-wider"
            >
              Book Session
            </Button>
          </div>
          <p className="text-[0.625rem] text-[#5C5850] text-center font-sans">
            Phone: {STUDIO_CONFIG.phoneDisplay} &bull; {STUDIO_CONFIG.contactEmail}
          </p>
        </div>
      </div>
    </>
  );
}
