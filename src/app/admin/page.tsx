"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FEATURED_STORIES, ALBUMS, STUDIO_CONFIG } from "@/lib/constants";
import {
  MessageSquare,
  FolderKanban,
  BookOpen,
  Compass,
  ArrowUpRight,
  Plus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string | null;
  location?: string | null;
  guestCount?: number | null;
  includeVideo: boolean;
  includeAlbum: boolean;
  message: string;
  status: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "BOOKED" | "ARCHIVED";
  notes?: string | null;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const res = await fetch("/api/enquiries");
        const data = await res.json();
        if (data.success && data.enquiries) {
          setEnquiries(data.enquiries);
        }
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  const handleQuickStatusChange = async (id: string, newStatus: EnquiryItem["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const newCount = enquiries.filter((e) => e.status === "NEW").length;
  const contactedCount = enquiries.filter((e) => e.status === "CONTACTED").length;
  const bookedCount = enquiries.filter((e) => e.status === "BOOKED").length;

  const kpis = [
    {
      label: "Active Inquiries",
      value: enquiries.length.toString(),
      trend: `${newCount} uncontacted leads`,
      icon: MessageSquare,
      badge: `${newCount} New`,
    },
    {
      label: "Documented Stories",
      value: FEATURED_STORIES.length.toString(),
      trend: "Published monographs",
      icon: FolderKanban,
      badge: "Curated",
    },
    {
      label: "Heirloom Albums",
      value: ALBUMS.length.toString(),
      trend: "Canvera & Linen specs",
      icon: BookOpen,
      badge: "Handcrafted",
    },
    {
      label: "Eastern Ghats Craft",
      value: "8+ Yrs",
      trend: "ASR District Native",
      icon: Compass,
      badge: "Authentic",
    },
  ];

  const getStatusBadge = (status: EnquiryItem["status"]) => {
    switch (status) {
      case "NEW":
        return <span className="px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 font-semibold">NEW</span>;
      case "CONTACTED":
        return <span className="px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-300 font-medium">CONTACTED</span>;
      case "MEETING_SCHEDULED":
        return <span className="px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300 font-medium">MEETING</span>;
      case "BOOKED":
        return <span className="px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider bg-forest/15 text-forest border border-forest/30 font-semibold">BOOKED</span>;
      case "ARCHIVED":
        return <span className="px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider bg-sand/30 text-charcoal-muted border border-earth/20 font-medium">ARCHIVED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-earth">
              Studio Command Center &bull; ASR District
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Raju&apos;s Studio Overview
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="primary" size="sm" href="/admin/projects">
            <Plus size={14} className="mr-1.5" />
            <span>Publish New Story</span>
          </Button>
          <Button variant="secondary" size="sm" href="/admin/enquiries">
            <span>Review Leads ({newCount})</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-6 bg-cream-paper border border-earth/20 shadow-xs flex flex-col justify-between hover:border-forest/40 transition-all rounded-xs"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-charcoal-muted font-medium">
                  {kpi.label}
                </span>
                <span className="p-1.5 bg-forest/10 rounded-xs text-forest">
                  <Icon size={16} />
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold block mb-1">
                  {kpi.value}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6875rem] text-earth">
                    {kpi.trend}
                  </span>
                  <span className="text-[0.6rem] font-mono px-1.5 py-0.5 bg-cream border border-earth/15 text-charcoal-muted uppercase">
                    {kpi.badge}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries Pipeline Table */}
      <div className="bg-cream-paper border border-earth/20 p-6 sm:p-8 space-y-6 shadow-xs rounded-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-earth/15 gap-2">
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-forest font-semibold block mb-1">
              Active Client Inquiries
            </span>
            <h2 className="font-serif text-2xl text-charcoal font-semibold">
              Recent Client Enquiries Pipeline
            </h2>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs uppercase tracking-wider text-forest font-semibold hover:underline flex items-center space-x-1"
          >
            <span>Open Full Pipeline ({enquiries.length})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-charcoal-muted">
            Loading authentic client inquiry records...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-charcoal-muted">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-earth/20 text-charcoal-muted font-sans uppercase tracking-widest text-[0.65rem] bg-cream/50">
                  <th className="py-3 px-4">Client Name &amp; Contact</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Inclusions</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Direct Concierge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth/10 text-charcoal">
                {enquiries.slice(0, 5).map((enq) => {
                  const whatsappGreeting = encodeURIComponent(
                    `Namaskaram ${enq.name} garu! This is Raju from Raju's Photography (ASR District). Thank you for inquiring about your ${enq.serviceType} celebration. I would love to share our availability and package details. When would be a convenient time to speak?`
                  );
                  const cleanPhone = enq.phone.replace(/[^0-9]/g, "");

                  return (
                    <tr key={enq.id} className="hover:bg-cream/70 transition-colors">
                      <td className="py-4 px-4 font-medium">
                        <div className="font-semibold text-charcoal text-sm">{enq.name}</div>
                        <div className="text-[0.6875rem] text-charcoal-muted font-mono">{enq.email}</div>
                        <div className="text-[0.6875rem] text-earth font-mono">{enq.phone}</div>
                      </td>
                      <td className="py-4 px-4 uppercase text-[0.6875rem] font-mono text-forest font-semibold">
                        {enq.serviceType}
                      </td>
                      <td className="py-4 px-4 text-charcoal-muted font-mono text-xs">
                        {enq.eventDate || "Flexible"}
                      </td>
                      <td className="py-4 px-4 text-charcoal-muted text-xs max-w-[160px] truncate">
                        {enq.location || "ASR District"}
                      </td>
                      <td className="py-4 px-4 text-[0.65rem] space-x-1.5 whitespace-nowrap">
                        {enq.includeVideo && (
                          <span className="bg-forest/10 px-2 py-0.5 border border-forest/20 text-forest font-medium">
                            4K Film
                          </span>
                        )}
                        {enq.includeAlbum && (
                          <span className="bg-earth/10 px-2 py-0.5 border border-earth/25 text-earth font-medium">
                            Album
                          </span>
                        )}
                        {!enq.includeVideo && !enq.includeAlbum && (
                          <span className="text-charcoal-muted text-[0.65rem]">Photos</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(enq.status)}
                          <select
                            value={enq.status}
                            disabled={updatingId === enq.id}
                            onChange={(e) =>
                              handleQuickStatusChange(enq.id, e.target.value as EnquiryItem["status"])
                            }
                            className="text-[0.65rem] font-mono bg-cream border border-earth/25 text-charcoal px-1.5 py-0.5 rounded-xs focus:outline-none focus:border-forest cursor-pointer"
                            aria-label={`Change status for ${enq.name}`}
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="MEETING_SCHEDULED">Meeting</option>
                            <option value="BOOKED">Booked</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${whatsappGreeting}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20 border border-emerald-600/30 rounded-xs text-[0.6875rem] font-mono transition-colors"
                        >
                          <span>WhatsApp</span>
                          <ArrowUpRight size={12} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all group flex flex-col justify-between shadow-xs rounded-xs"
        >
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-forest font-semibold block mb-1">
              Curated Stories
            </span>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors">
              Manage Story Monographs
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Curate Telugu weddings, Araku pre-weddings, naming ceremonies, and Eastern Ghats wildlife monographs.
            </p>
          </div>
          <span className="text-xs text-forest font-medium flex items-center space-x-1 mt-6">
            <span>Manage Projects ({FEATURED_STORIES.length})</span>
            <ArrowUpRight size={14} />
          </span>
        </Link>

        <Link
          href="/admin/albums"
          className="p-6 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all group flex flex-col justify-between shadow-xs rounded-xs"
        >
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-1">
              Heirloom Craft
            </span>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors">
              Handcrafted Album Designs
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Review Canvera Italian leatherette and natural linen lay-flat spread specifications for couples.
            </p>
          </div>
          <span className="text-xs text-forest font-medium flex items-center space-x-1 mt-6">
            <span>Manage Albums ({ALBUMS.length})</span>
            <ArrowUpRight size={14} />
          </span>
        </Link>

        <Link
          href="/admin/availability"
          className="p-6 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all group flex flex-col justify-between shadow-xs rounded-xs"
        >
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-forest font-semibold block mb-1">
              Seasonal Scheduling
            </span>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors">
              Manage Booking Dates
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Block Telugu wedding muhurtham dates, mark limited slots, and update location coverage.
            </p>
          </div>
          <span className="text-xs text-forest font-medium flex items-center space-x-1 mt-6">
            <span>Open Calendar</span>
            <ArrowUpRight size={14} />
          </span>
        </Link>

        <Link
          href="/admin/testimonials"
          className="p-6 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all group flex flex-col justify-between shadow-xs rounded-xs"
        >
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-amber-700 font-semibold block mb-1">
              Reputation &amp; Trust
            </span>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors">
              Client Testimonials &amp; Reviews
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Moderate and approve reviews from couples and families across Alluri Sitharama Raju District.
            </p>
          </div>
          <span className="text-xs text-forest font-medium flex items-center space-x-1 mt-6">
            <span>Moderate Reviews</span>
            <ArrowUpRight size={14} />
          </span>
        </Link>

        <Link
          href="/admin/settings"
          className="p-6 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all group flex flex-col justify-between shadow-xs rounded-xs"
        >
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-charcoal-muted font-semibold block mb-1">
              Studio Configuration
            </span>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors">
              Contact &amp; Studio Settings
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Update Raju&apos;s phone numbers, WhatsApp concierge greeting, studio address in Paderu, and social profiles.
            </p>
          </div>
          <span className="text-xs text-forest font-medium flex items-center space-x-1 mt-6">
            <span>Configure Studio</span>
            <ArrowUpRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
