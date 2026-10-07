"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDIO_CONFIG } from "@/lib/constants";
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  MessageSquare,
  Settings,
  ArrowUpRight,
  Menu,
  X,
  Compass,
  Camera,
  Calendar,
  Star,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Enquiries Pipeline", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Story Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Handcrafted Albums", href: "/admin/albums", icon: BookOpen },
    { label: "Dates & Availability", href: "/admin/availability", icon: Calendar },
    { label: "Client Reviews", href: "/admin/testimonials", icon: Star },
    { label: "Studio Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header Bar */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-cream-paper border-b border-earth/20 z-40 sticky top-0 shadow-xs">
        <Link href="/admin" className="flex items-center space-x-2">
          <Camera size={18} className="text-forest" />
          <span className="font-serif text-lg tracking-wider font-semibold text-charcoal">
            {STUDIO_CONFIG.name}
          </span>
          <span className="text-[0.6rem] font-mono tracking-widest px-1.5 py-0.5 bg-forest/10 text-forest border border-forest/20 uppercase">
            Studio
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-charcoal hover:text-forest transition-colors rounded-xs focus:outline-none focus:ring-1 focus:ring-forest"
          aria-label="Toggle admin navigation menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-30 w-72 bg-cream-paper border-r border-earth/20 p-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-xl md:shadow-none" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Portal Branding */}
          <div className="pb-6 mb-6 border-b border-earth/15">
            <Link href="/" className="group block">
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="w-6 h-6 rounded-xs bg-forest flex items-center justify-center text-cream">
                  <Camera size={13} />
                </div>
                <span className="font-serif text-xl tracking-[0.12em] text-charcoal font-semibold group-hover:text-forest transition-colors">
                  {STUDIO_CONFIG.name}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 pl-8">
                <Compass size={11} className="text-earth" />
                <span className="font-mono text-[0.625rem] uppercase tracking-wider text-earth font-medium">
                  Studio Dashboard &bull; ASR District
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 text-xs font-sans tracking-wider uppercase transition-all rounded-xs ${
                    isActive
                      ? "bg-forest text-cream font-medium shadow-xs"
                      : "text-charcoal-muted hover:text-charcoal hover:bg-earth/10"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-cream" : "text-earth"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Photographer Profile & Public Website Link */}
        <div className="pt-6 border-t border-earth/15 space-y-4">
          <div className="flex items-center space-x-3 p-2 bg-cream rounded-xs border border-earth/10">
            <div className="w-9 h-9 rounded-full bg-forest text-cream flex items-center justify-center font-serif text-xs font-semibold shadow-xs">
              RP
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-charcoal truncate">
                Raju
              </span>
              <span className="block text-[0.625rem] text-earth font-mono truncate">
                Visual Storyteller &bull; ASR Dt.
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-forest hover:text-forest-dark border border-forest/30 hover:border-forest p-2.5 bg-forest/5 hover:bg-forest/10 transition-all font-medium rounded-xs"
          >
            <span>View Live Website</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
