"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  ArrowUpRight,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Search,
  Sparkles,
  X,
  Save,
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

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // New offline inquiry form state
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "wedding",
    eventDate: "",
    location: "Paderu, ASR District",
    guestCount: "",
    includeVideo: true,
    includeAlbum: true,
    message: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/enquiries");
        const json = await res.json();
        if (json.success && json.enquiries) {
          setEnquiries(json.enquiries);
        }
      } catch (e) {
        console.error("Failed to load enquiries:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const updateStatus = async (id: string, newStatus: EnquiryItem["status"]) => {
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
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: noteText }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, notes: noteText } : item))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  const handleDeleteEnquiry = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove the inquiry from ${name}?`)) return;

    try {
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNew(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const json = await res.json();
      if (json.success && json.enquiry) {
        setEnquiries([json.enquiry, ...enquiries]);
        setIsNewLeadModalOpen(false);
        setNewLeadForm({
          name: "",
          email: "",
          phone: "",
          serviceType: "wedding",
          eventDate: "",
          location: "Paderu, ASR District",
          guestCount: "",
          includeVideo: true,
          includeAlbum: true,
          message: "",
        });
      }
    } catch (err) {
      console.error("Failed to add manual lead:", err);
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Filter & search logic
  const filtered = enquiries.filter((enq) => {
    const matchesFilter = filter === "ALL" ? true : enq.status === filter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone.includes(searchQuery) ||
      (enq.location && enq.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      enq.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: EnquiryItem["status"]) => {
    switch (status) {
      case "NEW":
        return <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 font-semibold rounded-xs">NEW</span>;
      case "CONTACTED":
        return <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-300 font-medium rounded-xs">CONTACTED</span>;
      case "MEETING_SCHEDULED":
        return <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300 font-medium rounded-xs">MEETING SCHEDULED</span>;
      case "BOOKED":
        return <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-forest/15 text-forest border border-forest/30 font-semibold rounded-xs">BOOKED</span>;
      case "ARCHIVED":
        return <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-sand/30 text-charcoal-muted border border-earth/20 font-medium rounded-xs">ARCHIVED</span>;
      default:
        return null;
    }
  };

  const counts: Record<string, number> = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === "NEW").length,
    CONTACTED: enquiries.filter((e) => e.status === "CONTACTED").length,
    MEETING_SCHEDULED: enquiries.filter((e) => e.status === "MEETING_SCHEDULED").length,
    BOOKED: enquiries.filter((e) => e.status === "BOOKED").length,
    ARCHIVED: enquiries.filter((e) => e.status === "ARCHIVED").length,
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Client Inquiries &bull; Lead Management CRM
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Enquiries Pipeline
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="primary" size="sm" onClick={() => setIsNewLeadModalOpen(true)}>
            <Plus size={14} className="mr-1.5" />
            <span>Record Offline Lead</span>
          </Button>
        </div>
      </div>

      {/* Search and Tabs Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-cream-paper p-4 border border-earth/20 rounded-xs shadow-xs">
        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-1.5">
          {["ALL", "NEW", "CONTACTED", "MEETING_SCHEDULED", "BOOKED", "ARCHIVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-all cursor-pointer flex items-center space-x-1.5 ${
                filter === tab
                  ? "bg-forest text-cream border-forest font-semibold shadow-xs"
                  : "bg-cream text-charcoal-muted border-earth/20 hover:text-charcoal hover:bg-earth/10"
              }`}
            >
              <span>{tab.replace("_", " ")}</span>
              <span className={`text-[0.625rem] px-1.5 py-0.2 rounded-full ${filter === tab ? "bg-cream/20 text-cream" : "bg-earth/15 text-charcoal"}`}>
                {counts[tab] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, phone, venue..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-cream border border-earth/25 text-charcoal placeholder-charcoal-muted/60 focus:outline-none focus:border-forest rounded-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Enquiry Cards List */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-charcoal-muted bg-cream-paper border border-earth/20 rounded-xs">
          Loading client pipeline records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-cream-paper border border-earth/20 p-12 text-sm text-charcoal-muted rounded-xs shadow-xs">
          No inquiries matching criteria &ldquo;{filter}&rdquo; {searchQuery ? `with search "${searchQuery}"` : ""}.
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
            const whatsappGreeting = encodeURIComponent(
              `Namaskaram ${enq.name} garu! This is Raju from Raju's Photography (ASR District). Thank you for inquiring about your ${enq.serviceType} celebration. I would love to share our availability and package details. When would be a convenient time to speak?`
            );

            return (
              <div
                key={enq.id}
                className="p-6 sm:p-8 bg-cream-paper border border-earth/20 hover:border-forest/40 transition-all rounded-xs shadow-xs flex flex-col justify-between space-y-6"
              >
                {/* Header row: client info & status select */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-earth/15">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="font-serif text-2xl text-charcoal font-semibold">
                        {enq.name}
                      </h2>
                      {getStatusBadge(enq.status)}
                    </div>
                    <div className="flex items-center space-x-3 text-xs font-mono">
                      <span className="uppercase text-forest font-semibold">
                        Discipline: {enq.serviceType}
                      </span>
                      <span className="text-earth">&bull;</span>
                      <span className="text-charcoal-muted text-[0.6875rem]">
                        Received: {new Date(enq.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Status Selector & Delete */}
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-charcoal-muted font-sans font-medium">Pipeline Phase:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => updateStatus(enq.id, e.target.value as EnquiryItem["status"])}
                      className="bg-cream border border-earth/25 px-3 py-1.5 text-xs text-charcoal font-mono rounded-xs focus:border-forest focus:outline-none cursor-pointer"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="MEETING_SCHEDULED">MEETING SCHEDULED</option>
                      <option value="BOOKED">BOOKED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>

                    <button
                      onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                      className="p-1.5 text-charcoal-muted hover:text-red-600 transition-colors rounded-xs border border-transparent hover:border-red-200 hover:bg-red-50"
                      title="Delete inquiry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Event details metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-charcoal p-3.5 bg-cream rounded-xs border border-earth/10">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-forest shrink-0" />
                    <span>{enq.eventDate || "Date TBD"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-forest shrink-0" />
                    <span className="truncate">{enq.location || "ASR District"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={14} className="text-forest shrink-0" />
                    <span>{enq.guestCount ? `${enq.guestCount} Guests` : "Intimate Gathering"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles size={14} className="text-earth shrink-0" />
                    <span>
                      {enq.includeVideo && enq.includeAlbum
                        ? "4K Film + Album"
                        : enq.includeVideo
                        ? "4K Film Included"
                        : enq.includeAlbum
                        ? "Handcrafted Album"
                        : "Pure Still Photos"}
                    </span>
                  </div>
                </div>

                {/* Client Brief Message */}
                <div className="p-4 bg-cream/70 border border-earth/15 text-xs text-charcoal font-sans leading-relaxed rounded-xs">
                  <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-1">
                    Client Vision &amp; Requirements:
                  </span>
                  {enq.message}
                </div>

                {/* Admin Internal Notes Section */}
                <div className="p-4 bg-sand/15 border border-earth/15 rounded-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase text-charcoal-muted font-semibold flex items-center space-x-1">
                      <Edit3 size={11} className="text-forest" />
                      <span>Raju&apos;s Private Studio Notes</span>
                    </span>
                    {editingNotesId !== enq.id && (
                      <button
                        onClick={() => {
                          setEditingNotesId(enq.id);
                          setNoteText(enq.notes || "");
                        }}
                        className="text-[0.6875rem] font-mono text-forest hover:underline"
                      >
                        {enq.notes ? "Edit Note" : "+ Add Note"}
                      </button>
                    )}
                  </div>

                  {editingNotesId === enq.id ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={2}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="e.g. Spoke on phone, muhurtham timing is 8:45 AM, send package PDF on WhatsApp..."
                        className="w-full text-xs p-2.5 bg-cream-paper border border-earth/30 rounded-xs text-charcoal focus:outline-none focus:border-forest"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-2.5 py-1 text-xs text-charcoal-muted hover:text-charcoal font-mono"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(enq.id)}
                          className="px-3 py-1 bg-forest text-cream text-xs font-mono font-medium rounded-xs flex items-center space-x-1"
                        >
                          <Save size={12} />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-charcoal italic">
                      {enq.notes || "No notes recorded yet. Click '+ Add Note' to log discussion details, quotes, or muhurtham timings."}
                    </p>
                  )}
                </div>

                {/* Action buttons: Direct Concierge & Contact */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-earth/15">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-charcoal-muted">
                    <a
                      href={`mailto:${enq.email}`}
                      className="hover:text-forest flex items-center space-x-1.5 transition-colors"
                    >
                      <Mail size={13} className="text-forest" />
                      <span>{enq.email}</span>
                    </a>
                    <a
                      href={`tel:${enq.phone}`}
                      className="hover:text-forest flex items-center space-x-1.5 transition-colors"
                    >
                      <Phone size={13} className="text-forest" />
                      <span>{enq.phone}</span>
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${whatsappGreeting}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-700 text-cream hover:bg-emerald-800 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 rounded-xs shadow-xs transition-all font-medium"
                    >
                      <span>1-Click WhatsApp Quick Reply</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual New Lead Modal */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-cream-paper border border-earth/25 w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-earth/15">
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-0.5">
                  Walk-In or Phone Consultation
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold">
                  Record New Client Inquiry
                </h3>
              </div>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-xs"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Client / Family Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh & Haritha"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 94400 12345"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@gmail.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={newLeadForm.serviceType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceType: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  >
                    <option value="wedding">Wedding / Marriage</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="naming-ceremony">Naming Ceremony</option>
                    <option value="nature">Nature Photography</option>
                    <option value="wildlife">Wildlife Photography</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Tentative Event Date
                  </label>
                  <input
                    type="date"
                    value={newLeadForm.eventDate}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, eventDate: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lambasingi Resorts / Paderu Mandapam"
                  value={newLeadForm.location}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Client Request &amp; Vision *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details discussed with the client..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLeadForm.includeVideo}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, includeVideo: e.target.checked })}
                    className="accent-forest"
                  />
                  <span>Include Cinematography</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLeadForm.includeAlbum}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, includeAlbum: e.target.checked })}
                    className="accent-forest"
                  />
                  <span>Include Canvera Album</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-earth/15">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsNewLeadModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={isSubmittingNew}>
                  <span>{isSubmittingNew ? "Saving..." : "Record Inquiry"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
