"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Lightbox from "@/components/ui/Lightbox";
import gallery from "@/data/gallery.json";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const years = [...new Set(gallery.map((p) => p.year))].sort((a, b) => b - a);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const filtered = filterYear ? gallery.filter((p) => p.year === filterYear) : gallery;

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="回忆相册" subtitle="Gallery" />
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        <button onClick={() => setFilterYear(null)} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${filterYear === null ? "bg-[#5a7a98] text-white" : "bg-warm-cream text-[#8a98a8] border border-warm-sand"}`}>全部</button>
        {years.map((year) => (
          <button key={year} onClick={() => setFilterYear(year)} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${filterYear === year ? "bg-[#5a7a98] text-white" : "bg-warm-cream text-[#8a98a8] border border-warm-sand"}`}>{year}</button>
        ))}
      </div>
      <div className="px-4 pb-8">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((photo, idx) => (
            <div key={photo.id} onClick={() => setLightboxIndex(gallery.findIndex((p) => p.id === photo.id))}
              className="rounded-small overflow-hidden cursor-pointer active:scale-95 transition-transform aspect-square flex items-center justify-center text-3xl"
              style={{ background: `linear-gradient(135deg, hsl(${idx * 40 + 30}, 30%, 85%), hsl(${idx * 40 + 30}, 25%, 78%))` }}>
              {photo.title.slice(0, 2)}
            </div>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox photos={gallery} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)} />
      )}
    </div>
  );
}
