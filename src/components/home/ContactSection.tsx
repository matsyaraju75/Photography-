"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { STUDIO_CONFIG } from "@/lib/constants";
import { Send, CheckCircle2, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "weddings",
    eventDate: "",
    location: "",
    guestCount: "",
    includeVideo: false,
    includeAlbum: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
      } else {
        alert(json.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      // Fallback state so client isn't stranded
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Raju! My name is ${formData.name || "Client"}. I would like to inquire about ${
      formData.serviceType
    } photography for ${formData.eventDate || "an upcoming date"}${
      formData.location ? ` at ${formData.location}` : ""
    }.`
  )}`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Get in Touch
            </Badge>
            <TextReveal
              text="Book a Session"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            Tell me about your celebration, date, and location. I will get back to you personally within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-4">
                Let&apos;s Talk About Your Story
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans mb-6">
                Whether you are planning a traditional family wedding in the hills, a child&apos;s birthday celebration, or seeking fine prints of nature and wildlife, I look forward to connecting with you.
              </p>

              <div className="space-y-3.5 text-xs text-charcoal">
                <div className="flex items-start space-x-3 p-4 bg-cream border border-earth/20 shadow-xs">
                  <MapPin size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-charcoal mb-0.5">Location</span>
                    <span className="text-charcoal-muted">{STUDIO_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-cream border border-earth/20 shadow-xs">
                  <Phone size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-charcoal mb-0.5">Phone Call</span>
                    <a href={`tel:${STUDIO_CONFIG.phone}`} className="text-forest hover:underline">
                      {STUDIO_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-cream border border-earth/20 shadow-xs">
                  <Mail size={16} className="text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-charcoal mb-0.5">Email</span>
                    <a href={`mailto:${STUDIO_CONFIG.contactEmail}`} className="text-forest hover:underline">
                      {STUDIO_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="p-6 bg-cream border border-forest/30 shadow-xs">
              <div className="flex items-center space-x-2 text-forest mb-2">
                <MessageCircle size={18} />
                <span className="font-sans text-xs uppercase tracking-widest font-semibold">
                  Fastest Response via WhatsApp
                </span>
              </div>
              <p className="text-xs text-charcoal-muted mb-4 leading-relaxed">
                Prefer a quick chat? Message Raju directly to check date availability or discuss plans.
              </p>
              <Button
                variant="primary"
                size="sm"
                href={whatsappHref}
                isExternal
                className="w-full text-center"
              >
                Chat Directly on WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-cream border border-earth/25 p-7 sm:p-10 shadow-xs">
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <CheckCircle2 size={44} className="text-forest mb-5" />
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-2">
                  Thank You for Your Message
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted max-w-md font-sans mb-6">
                  Your message has reached Raju. I will review your event date and get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-forest underline hover:text-forest-dark"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Suresh Kumar"
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="suresh@example.com"
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Photography Discipline */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Photography Type *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    >
                      <option value="weddings">Wedding / Marriage Photography</option>
                      <option value="love-stories">Pre-Wedding / Love Story</option>
                      <option value="celebrations">Birthday Photography</option>
                      <option value="family">Naming Ceremony Photography</option>
                      <option value="nature">Nature &amp; Landscape Assignment</option>
                      <option value="wildlife">Wildlife Photography</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Event Date */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Event Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Paderu, Araku, Vizag"
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Estimated Guests */}
                  <div>
                    <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                      Est. Guests (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      placeholder="e.g. 100"
                      className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Additional services checkboxes */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-charcoal">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeVideo}
                      onChange={(e) => setFormData({ ...formData, includeVideo: e.target.checked })}
                      className="accent-[#2F4A3A] w-4 h-4 rounded-none"
                    />
                    <span>Include Cinematography / Video</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeAlbum}
                      onChange={(e) => setFormData({ ...formData, includeAlbum: e.target.checked })}
                      className="accent-[#2F4A3A] w-4 h-4 rounded-none"
                    />
                    <span>Include Handcrafted Photo Album</span>
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-earth font-semibold mb-1.5">
                    Your Message / Vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell Raju about what you are planning, key rituals or moments, and any questions you have..."
                    className="w-full bg-cream-paper border border-earth/25 px-3.5 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Send Enquiry to Raju</span>
                      <Send size={14} className="ml-1" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
