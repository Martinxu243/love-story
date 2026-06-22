"use client";

import PageHeader from "@/components/ui/PageHeader";
import { formatDate } from "@/lib/utils";
import type { FootprintsData } from "@/lib/data";

interface Props {
  footprints: FootprintsData;
}

export default function MapClient({ footprints }: Props) {
  const { cities, totalKm, nextDestination } = footprints;

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="足迹地图" subtitle="Footprints" />
      <div className="px-4 pt-6">
        <div
          className="relative rounded-card overflow-hidden border border-[#e8e0d5]"
          style={{
            background: "linear-gradient(135deg, #e8ecf0 0%, #dce4ec 30%, #e0e8f0 60%, #d8e0e8 100%)",
            height: "240px",
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M62 30 Q70 35 72 52 Q68 55 68 58 Q66 60 70 42 Q68 50 66 68" fill="none" stroke="rgba(150,150,150,0.25)" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
          {cities.map((city) => (
            <div key={city.id} className="absolute flex flex-col items-center" style={{ left: `${city.x}%`, top: `${city.y}%` }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: city.color, boxShadow: `0 0 8px ${city.color}60` }} />
              <span className="text-[8px] text-[#5a6a78] mt-0.5 whitespace-nowrap font-medium">{city.name}</span>
            </div>
          ))}
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] text-[#8a98a8]">已探索 {cities.length} 座城市</span>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4 flex gap-3">
        <div className="flex-1 warm-card p-4 text-center">
          <p className="text-[10px] text-[#b0a090] mb-1">下一站</p>
          <p className="text-lg text-[#5a7a98] font-bold font-serif">🏔️ {nextDestination}</p>
        </div>
        <div className="flex-1 warm-card p-4 text-center">
          <p className="text-[10px] text-[#b0a090] mb-1">累计里程</p>
          <p className="text-lg text-[#5a7a98] font-bold font-serif">{totalKm.toLocaleString()}km</p>
        </div>
      </div>
      <div className="px-4 py-6">
        <h3 className="text-xs text-[#b0a090] font-bold tracking-wider uppercase mb-3">探索记录</h3>
        <div className="flex flex-col gap-2">
          {cities.map((city) => (
            <div key={city.id} className="flex items-center gap-3 bg-white rounded-medium p-3 border border-[#eee]">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: city.color, boxShadow: `0 0 6px ${city.color}60` }} />
              <span className="text-sm text-[#5a6a78] font-medium">{city.name}</span>
              <span className="text-[10px] text-[#b0a090] ml-auto">{formatDate(city.date)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
