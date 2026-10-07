"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  X,
  Star,
  Sparkles,
  Heart,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewSubmissionModal({
  isOpen,
  onClose,
  onSuccess,
}: ReviewSubmissionModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    eventType: "Telugu Wedding",
    location: "Paderu, ASR District",
    date: "2026 Celebration",
    rating: 5,
    quote: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setErrorMsg(json.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      setErrorMsg("Failed to connect to the studio server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-cream-paper border border-earth/25 w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 rounded-xs shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-earth/15">
          <div>
            <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-0.5">
              Client Feedback &bull; Letters of Trust
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              Share Your Story with Raju
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-xs cursor-pointer"
            aria-label="Close review dialog"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle size={40} className="mx-auto text-emerald-700 animate-bounce" />
            <h4 className="font-serif text-2xl text-charcoal font-semibold">
              Thank You So Much!
            </h4>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
              Your kind words and memories have been received with deep gratitude. Raju will review and publish your words to the site shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-xs text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Your Names / Family *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Suresh & Ananya"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Celebration Type *
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none cursor-pointer"
                >
                  <option value="Telugu Wedding">Telugu Wedding / Marriage</option>
                  <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                  <option value="Naming Ceremony">Naming / Cradle Ceremony</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Nature & Wildlife Tour">Nature &amp; Wildlife Tour</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paderu Mandapam, ASR District"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1.5">
                Rating
              </label>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      size={20}
                      className={star <= formData.rating ? "fill-amber-500 text-amber-500" : "text-earth/30"}
                    />
                  </button>
                ))}
                <span className="font-mono text-xs text-charcoal-muted ml-2">
                  {formData.rating} out of 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Your Words &amp; Experience with Raju *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share how Raju captured your quiet rituals, emotion, patience with family, or how you felt when looking at your final album..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-earth/15">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Send Review"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
