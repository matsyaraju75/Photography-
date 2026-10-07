"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { STUDIO_CONFIG } from "@/lib/constants";
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Save,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Camera,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [settings, setSettings] = useState({
    name: STUDIO_CONFIG.name,
    tagline: STUDIO_CONFIG.tagline,
    phone: STUDIO_CONFIG.phone,
    whatsappNumber: STUDIO_CONFIG.whatsappNumber,
    whatsappMessage: STUDIO_CONFIG.whatsappMessage,
    contactEmail: STUDIO_CONFIG.contactEmail,
    location: STUDIO_CONFIG.location,
    address: STUDIO_CONFIG.address,
    instagram: STUDIO_CONFIG.social.instagram,
    youtube: STUDIO_CONFIG.social.youtube,
    craftYears: "8+",
    activeRegion: "Alluri Sitharama Raju (ASR) District & Eastern Ghats",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const previewWhatsAppUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    settings.whatsappMessage
  )}`;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Studio Identity &bull; Contact Configuration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Studio Settings &amp; Channels
          </h1>
        </div>

        {saveSuccess && (
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xs text-xs font-mono flex items-center space-x-1.5 animate-fade-in">
            <CheckCircle size={14} className="text-emerald-700" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Studio Overview */}
        <div className="p-6 sm:p-8 bg-cream-paper border border-earth/20 rounded-xs shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-earth/15">
            <Camera size={18} className="text-forest" />
            <h2 className="font-serif text-xl text-charcoal font-semibold">
              Studio Identity &amp; Location
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Studio Brand Name
              </label>
              <input
                type="text"
                required
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Studio Tagline
              </label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Home Base / District
              </label>
              <input
                type="text"
                required
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Studio Address
              </label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Direct Concierge & WhatsApp Configuration */}
        <div className="p-6 sm:p-8 bg-cream-paper border border-earth/20 rounded-xs shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-earth/15">
            <MessageCircle size={18} className="text-emerald-700" />
            <h2 className="font-serif text-xl text-charcoal font-semibold">
              WhatsApp Concierge &amp; Phone Inquiries
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none font-mono"
              />
              <span className="text-[0.6875rem] text-charcoal-muted mt-1 block">
                Displayed on public website header, contact form, and footer.
              </span>
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none font-mono"
              />
              <span className="text-[0.6875rem] text-charcoal-muted mt-1 block">
                Format: 919494321888 (No spaces or plus sign for wa.me links).
              </span>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
              Default Client Greeting Message
            </label>
            <textarea
              rows={3}
              value={settings.whatsappMessage}
              onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
              className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none leading-relaxed"
            />
            <span className="text-[0.6875rem] text-charcoal-muted mt-1 block">
              Pre-filled message when prospective clients click WhatsApp buttons across the website.
            </span>
          </div>

          {/* WhatsApp Direct Test Box */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[0.65rem] uppercase text-emerald-800 font-semibold block mb-0.5">
                Live WhatsApp Link Preview
              </span>
              <p className="text-xs text-emerald-900 font-mono truncate max-w-md">
                {previewWhatsAppUrl}
              </p>
            </div>
            <a
              href={previewWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-700 text-cream hover:bg-emerald-800 text-xs font-mono font-medium rounded-xs flex items-center space-x-1.5 shrink-0 transition-colors"
            >
              <span>Test In WhatsApp</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Email & Digital Presence */}
        <div className="p-6 sm:p-8 bg-cream-paper border border-earth/20 rounded-xs shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-earth/15">
            <Mail size={18} className="text-forest" />
            <h2 className="font-serif text-xl text-charcoal font-semibold">
              Email &amp; Social Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Studio Contact Email
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Submission Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-earth/20">
          <Button variant="primary" size="md" type="submit" disabled={saving}>
            <Save size={14} className="mr-1.5" />
            <span>{saving ? "Saving Changes..." : "Save Studio Settings"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
