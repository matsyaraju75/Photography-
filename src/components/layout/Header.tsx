"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, STUDIO_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#F5F1E8]/95 backdrop-blur-md py-3.5 border-b border-[#765B43]/15 shadow-xs"
            : "bg-[#F5F1E8]/80 backdrop-blur-xs py-5 border-b border-[#765B43]/10"
        )}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Studio Brand Logo */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F4A3A]"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.16em] text-[#252525] group-hover:text-[#2F4A3A] transition-colors duration-300 font-medium">
              {STUDIO_CONFIG.name}
            </span>
            <span className="font-sans text-[0.625rem] tracking-[0.2em] text-[#5C5850] uppercase">
              Stories of Life &bull; Moments of Nature
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[0.6875rem] uppercase tracking-[0.16em] text-[#252525]/85 hover:text-[#2F4A3A] transition-colors duration-200 relative group py-1 font-medium"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2F4A3A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-xs text-[#2F4A3A] hover:text-[#1F3327] font-medium tracking-wider uppercase px-3 py-2 transition-colors border border-[#2F4A3A]/30 hover:border-[#2F4A3A]"
            >
              <MessageCircle size={14} className="mr-1.5" />
              WhatsApp
            </a>

            <Button
              variant="primary"
              size="sm"
              href="/#contact"
              className="hidden sm:inline-flex"
            >
              Book Session
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#252525] hover:text-[#2F4A3A] transition-colors xl:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F4A3A]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#FAF7F0] xl:hidden flex flex-col justify-between p-7 pt-24 transition-all duration-500 ease-in-out border-b border-[#765B43]/20 shadow-xl overflow-y-auto",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex flex-col space-y-5">
          <p className="font-sans text-[0.6875rem] tracking-[0.22em] uppercase text-[#765B43] font-medium">
            Explore Raju&apos;s Photography
          </p>
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xl font-serif tracking-wider text-[#252525] hover:text-[#2F4A3A] transition-colors border-b border-[#765B43]/15 pb-2.5"
              >
                <span>
                  <span className="text-xs font-sans text-[#765B43] mr-3">
                    0{idx + 1}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight size={16} className="text-[#5C5850]" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col space-y-3.5 pt-6 border-t border-[#765B43]/20 mt-6">
          <p className="text-xs text-[#5C5850] leading-relaxed">
            Based in Alluri Sitharama Raju (ASR) District, Andhra Pradesh. Available for weddings, celebrations, and outdoor assignments.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-xs tracking-wider uppercase px-4 py-3 bg-[#FAF7F0] border border-[#2F4A3A] text-[#2F4A3A] font-medium"
            >
              <MessageCircle size={15} className="mr-2" />
              Direct WhatsApp
            </a>
            <Button
              variant="primary"
              size="md"
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center"
            >
              Inquire For Availability
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
