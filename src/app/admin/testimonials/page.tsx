"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  MessageSquare,
  Star,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  X,
  MapPin,
  Calendar,
} from "lucide-react";

interface ReviewItem {
  id: string;
  clientName: string;
  eventType: string;
  location: string;
  date: string;
  quote: string;
  rating: number;
  status: "APPROVED" | "PENDING" | "ARCHIVED";
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form
  const [formData, setFormData] = useState({
    clientName: "",
    eventType: "Telugu Wedding",
    location: "Paderu, ASR District",
    date: "2026 Celebration",
    rating: 5,
    quote: "",
  });

  const loadReviews = async () => {
    try {
      const res = await fetch("/api/testimonials?all=true");
      const json = await res.json();
      if (json.success && json.reviews) {
        setReviews(json.reviews);
      }
    } catch (e) {
      console.error("Failed to load reviews:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: ReviewItem["status"]) => {
    const newStatus = currentStatus === "APPROVED" ? "PENDING" : "APPROVED";
    try {
      const res = await fetch("/api/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (e) {
      console.error("Error updating review:", e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from ${name}?`)) return;

    try {
      const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error("Error deleting review:", e);
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success && json.review) {
        setReviews([json.review, ...reviews]);
        setIsModalOpen(false);
        setFormData({
          clientName: "",
          eventType: "Telugu Wedding",
          location: "Paderu, ASR District",
          date: "2026 Celebration",
          rating: 5,
          quote: "",
        });
      }
    } catch (e) {
      console.error("Error adding review:", e);
    }
  };

  const filtered =
    filter === "ALL"
      ? reviews
      : reviews.filter((r) => r.status === filter);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Client Words &bull; Reputation &amp; Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Testimonials &amp; Reviews Moderation
          </h1>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={14} className="mr-1.5" />
          <span>Add Client Review</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["ALL", "APPROVED", "PENDING"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-all cursor-pointer ${
              filter === tab
                ? "bg-forest text-cream border-forest font-semibold"
                : "bg-cream-paper text-charcoal-muted border-earth/20 hover:text-charcoal"
            }`}
          >
            {tab} ({reviews.filter((r) => tab === "ALL" || r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-charcoal-muted bg-cream-paper border border-earth/20 rounded-xs">
          Loading client testimonials...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-cream-paper border border-earth/20 p-12 text-sm text-charcoal-muted rounded-xs shadow-xs">
          No reviews matching status &ldquo;{filter}&rdquo;.
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="p-6 sm:p-8 bg-cream-paper border border-earth/20 hover:border-forest/40 transition-all rounded-xs shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-earth/15">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-serif text-2xl text-charcoal font-semibold">
                      {r.clientName}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[0.625rem] font-mono uppercase tracking-wider rounded-xs font-semibold ${
                        r.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono text-charcoal-muted">
                    <span className="text-forest font-semibold">{r.eventType}</span>
                    <span>&bull;</span>
                    <span>{r.location}</span>
                    <span>&bull;</span>
                    <span>{r.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleStatus(r.id, r.status)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                      r.status === "APPROVED"
                        ? "bg-cream text-charcoal-muted border-earth/25 hover:bg-earth/10"
                        : "bg-forest text-cream border-forest font-semibold"
                    }`}
                  >
                    {r.status === "APPROVED" ? "Move to Pending" : "Approve for Website"}
                  </button>

                  <button
                    onClick={() => handleDelete(r.id, r.clientName)}
                    className="p-1.5 text-charcoal-muted hover:text-red-600 rounded-xs"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>

              <blockquote className="text-xs text-charcoal leading-relaxed italic p-3 bg-cream rounded-xs border border-earth/10 font-sans">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-cream-paper border border-earth/25 w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-earth/15">
              <h3 className="font-serif text-2xl text-charcoal font-semibold">
                Add Client Testimonial
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-muted hover:text-charcoal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Client Name(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkata Rao & Family"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-earth/15">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
