import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CATEGORIES, NAV_LINKS, STUDIO_CONFIG } from "@/lib/constants";
import { ArrowUpRight, Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EBE3D7]/60 text-[#252525] border-t border-[#765B43]/20 pt-16 pb-12 relative grain-overlay">
      <Container size="wide">
        {/* Top editorial brand statement */}
        <div className="pb-12 border-b border-[#765B43]/20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] text-[#252525] font-medium">
              {STUDIO_CONFIG.name}
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#765B43] max-w-md">
              &ldquo;{STUDIO_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-xs text-[#5C5850] leading-relaxed max-w-sm">
              {STUDIO_CONFIG.heroHook}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center text-[0.6875rem] uppercase tracking-wider px-2.5 py-1 bg-[#2F4A3A]/10 text-[#2F4A3A] font-medium border border-[#2F4A3A]/20">
                Alluri Sitharama Raju (ASR) District, AP
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Navigation */}
            <div className="flex flex-col space-y-3">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-[#765B43] font-semibold">
                Explore
              </span>
              <ul className="flex flex-col space-y-2 text-xs text-[#5C5850]">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[#2F4A3A] transition-colors inline-flex items-center group font-medium"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#2F4A3A] ml-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Categories */}
            <div className="flex flex-col space-y-3">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-[#765B43] font-semibold">
                Categories
              </span>
              <ul className="flex flex-col space-y-2 text-xs text-[#5C5850]">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="hover:text-[#2F4A3A] transition-colors font-medium"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/#albums"
                    className="hover:text-[#2F4A3A] transition-colors text-[#765B43] font-medium"
                  >
                    Handcrafted Albums
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investment"
                    className="hover:text-[#2F4A3A] transition-colors text-[#2F4A3A] font-semibold"
                  >
                    Investment &amp; Packages &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/availability"
                    className="hover:text-[#2F4A3A] transition-colors text-[#2F4A3A] font-semibold"
                  >
                    Seasonal Availability &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="flex flex-col space-y-3">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-[#765B43] font-semibold">
                Connect
              </span>
              <div className="flex flex-col space-y-2.5 text-xs text-[#5C5850]">
                <div className="flex items-start space-x-2">
                  <MapPin size={14} className="text-[#2F4A3A] shrink-0 mt-0.5" />
                  <span>{STUDIO_CONFIG.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-[#2F4A3A] shrink-0" />
                  <a href={`tel:${STUDIO_CONFIG.phone}`} className="hover:text-[#2F4A3A] font-medium">
                    {STUDIO_CONFIG.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-[#2F4A3A] shrink-0" />
                  <a href={`mailto:${STUDIO_CONFIG.contactEmail}`} className="hover:text-[#2F4A3A]">
                    {STUDIO_CONFIG.contactEmail}
                  </a>
                </div>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      STUDIO_CONFIG.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-[#2F4A3A] hover:text-[#1F3327] font-medium bg-[#2F4A3A]/10 px-3 py-1.5 border border-[#2F4A3A]/25"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Raju</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[0.7rem] text-[#5C5850] space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Camera size={14} className="text-[#2F4A3A]" />
            <span>
              &copy; {currentYear} {STUDIO_CONFIG.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Alluri Sitharama Raju District, Andhra Pradesh</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
