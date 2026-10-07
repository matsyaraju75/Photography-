"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ALBUMS } from "@/lib/constants";
import { AlbumItem } from "@/types";
import {
  Plus,
  BookOpen,
  Layers,
  CheckCircle,
  ArrowUpRight,
  X,
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function AdminAlbumsPage() {
  const [albums, setAlbums] = useState<AlbumItem[]>(ALBUMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    material: "Canvera Flush-Mount Italian Leatherette",
    pagesCount: 50,
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85",
    description: "",
  });

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlbum: AlbumItem = {
      id: `alb-${Date.now()}`,
      title: formData.title,
      subtitle: formData.subtitle || "Heirloom Edition",
      coverImage: formData.coverImage,
      material: formData.material,
      pagesCount: Number(formData.pagesCount) || 50,
      description: formData.description,
      spreads: [
        {
          id: `sp-${Date.now()}-1`,
          pageNumber: 1,
          imageUrl: formData.coverImage,
          title: "Cover & Muhurtham Opening",
        },
      ],
    };

    setAlbums([...albums, newAlbum]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      subtitle: "",
      material: "Canvera Flush-Mount Italian Leatherette",
      pagesCount: 50,
      coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85",
      description: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-earth block mb-1">
            Heirloom Print Studio &bull; Canvera &amp; Linen Craft
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
            Handcrafted Album Designs
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} className="mr-1.5" />
            <span>New Album Specification</span>
          </Button>
          <Button variant="outline" size="sm" href="/albums" isExternal>
            <span>View Client Gallery</span>
            <ArrowUpRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Album Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {albums.map((album) => (
          <div
            key={album.id}
            className="p-6 sm:p-8 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all flex flex-col justify-between space-y-6 rounded-xs shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 text-[0.625rem] font-mono uppercase tracking-wider bg-forest/10 text-forest border border-forest/30 font-semibold rounded-xs">
                  Flush-Mount Lay-Flat
                </span>
                <span className="font-mono text-xs text-charcoal-muted">
                  {album.pagesCount} Pages &bull; Archival 250 GSM
                </span>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/30 mb-6 rounded-xs">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <span className="font-mono text-xs uppercase text-earth font-semibold block mb-1">
                {album.subtitle}
              </span>

              <h2 className="font-serif text-2xl text-charcoal font-semibold mb-2">
                {album.title}
              </h2>

              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                {album.description}
              </p>

              <div className="p-4 bg-cream border border-earth/15 text-xs font-mono text-charcoal space-y-1.5 rounded-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-forest font-semibold">Cover:</span>
                  <span>{album.material}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-forest font-semibold">Curated Spreads:</span>
                  <span>{album.spreads.length} panoramic lay-flat spreads</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-earth/15 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-mono font-medium flex items-center space-x-1.5">
                <CheckCircle size={14} className="text-emerald-600" />
                <span>Active in Client Consultation</span>
              </span>
              <Link
                href="/albums"
                className="text-forest hover:underline font-mono font-semibold flex items-center space-x-1"
              >
                <span>Preview Book</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* New Album Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-cream-paper border border-earth/25 w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 rounded-xs shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-earth/15">
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-earth font-semibold block mb-0.5">
                  Print Specifications
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold">
                  Add Handcrafted Album Design
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-charcoal-muted hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAlbum} className="space-y-4 text-xs">
              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Album Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Heritage Velvet Grand Monograph"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Subtitle / Edition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heirloom Edition"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Page Count *
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={120}
                    value={formData.pagesCount}
                    onChange={(e) => setFormData({ ...formData, pagesCount: parseInt(e.target.value, 10) || 50 })}
                    className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Cover Material &amp; Binding *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Canvera Italian Matte Leatherette with Gold Debossing"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-sans uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Craft Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain binding technique, archival paper, durability, and viewing experience..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-cream border border-earth/25 px-3 py-2 text-charcoal rounded-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-earth/15">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Album Specification
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
