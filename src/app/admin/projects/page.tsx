"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FEATURED_STORIES } from "@/lib/constants";
import { ProjectStory } from "@/types";
import {
  Plus,
  X,
  FolderKanban,
  Calendar,
  MapPin,
  ArrowUpRight,
  Trash2,
  Filter,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New project form state
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    category: "wedding",
    eventDate: "",
    location: "Araku Valley, ASR District",
    summary: "",
    coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
  });

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && json.projects) {
          setProjects(json.projects);
        } else {
          setProjects(FEATURED_STORIES);
        }
      } catch (e) {
        console.error("Failed to load projects:", e);
        setProjects(FEATURED_STORIES);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success && json.project) {
        setProjects([json.project, ...projects]);
        setIsModalOpen(false);
        setFormData({
          title: "",
          clientName: "",
          category: "wedding",
          eventDate: "",
          location: "Araku Valley, ASR District",
          summary: "",
          coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        });
      }
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove story "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Story Monographs CMS &bull; Portfolio Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Projects &amp; Monographs
          </h1>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={14} className="mr-1.5" />
          <span>Publish New Monograph</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {["ALL", "WEDDING", "PRE-WEDDING", "BIRTHDAY", "NAMING-CEREMONY", "NATURE", "WILDLIFE"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-all cursor-pointer ${
              filter === cat
                ? "bg-forest text-cream border-forest font-semibold shadow-xs"
                : "bg-cream-paper text-charcoal-muted border-earth/20 hover:text-charcoal hover:bg-earth/10"
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-charcoal-muted bg-cream-paper border border-earth/20 rounded-xs">
          Loading published monographs...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center bg-cream-paper border border-earth/20 p-12 text-sm text-charcoal-muted rounded-xs shadow-xs">
          No story projects matching category &ldquo;{filter}&rdquo;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all flex flex-col justify-between overflow-hidden group rounded-xs shadow-xs"
            >
              <div>
                {/* Cover Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30">
                  <Image
                    src={proj.coverImage.url}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-cream/90 text-forest border border-forest/30 font-semibold backdrop-blur-xs rounded-xs">
                      {proj.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[0.6875rem] font-mono text-earth mb-2">
                    <MapPin size={11} className="shrink-0 text-forest" />
                    <span className="truncate">{proj.location}</span>
                    <span>&bull;</span>
                    <span className="shrink-0">{proj.eventDate}</span>
                  </div>

                  <h2 className="font-serif text-xl text-charcoal font-semibold mb-2 group-hover:text-forest transition-colors line-clamp-1">
                    {proj.title}
                  </h2>

                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-3 border-t border-earth/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[0.6875rem] text-charcoal-muted uppercase">
                  {proj.chapters.length} Chapters
                </span>

                <div className="flex items-center space-x-3">
                  <Link
                    href={`/stories/${proj.slug}`}
                    className="text-forest hover:underline font-semibold flex items-center space-x-1"
                  >
                    <span>View Live</span>
                    <ArrowUpRight size={12} />
                  </Link>

                  <button
                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                    className="p-1 text-charcoal-muted hover:text-red-600 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-cream-paper border border-earth/25 w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto space-y-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-earth/15">
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-0.5">
                  Editorial Portfolio
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold">
                  Publish New Story Monograph
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-charcoal-muted hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh & Ananya — Paderu Hilltop Wedding"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Suresh & Ananya"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  >
                    <option value="wedding">Wedding / Marriage</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="naming-ceremony">Naming Ceremony</option>
                    <option value="nature">Nature Photography</option>
                    <option value="wildlife">Wildlife</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Event Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. November 2026"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paderu, ASR District"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Story Narrative Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the emotional atmosphere, morning light, and cultural significance of this celebration..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Cover Photo URL (High-Res CDN)
                </label>
                <input
                  type="url"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-earth/15">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Monograph"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
