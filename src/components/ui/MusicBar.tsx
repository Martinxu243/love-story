"use client";

import { useState } from "react";
import { Music, Pause } from "lucide-react";

interface MusicBarProps {
  title: string;
  artist: string;
}

export default function MusicBar({ title, artist }: MusicBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-strong rounded-2xl px-4 py-3.5 flex items-center gap-3 mx-4 relative overflow-hidden"
      style={{ border: "1px solid rgba(180,210,240,0.1)" }}>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(120,170,210,0.2) 0%, transparent 60%)" }} />

      {/* Play button with glow ring */}
      <div className="relative">
        {isPlaying && (
          <div className="absolute inset-0 rounded-full animate-pulse"
            style={{ boxShadow: "0 0 12px rgba(120,170,210,0.4)" }} />
        )}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-all duration-200"
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, rgba(120,170,210,0.3), rgba(160,200,240,0.2))"
              : "rgba(255,255,255,0.08)",
            border: `1px solid ${isPlaying ? "rgba(160,200,240,0.3)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-starlight" />
          ) : (
            <Music className="w-4 h-4 text-starlight/80" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 relative z-[1]">
        <div className="text-xs text-starlight truncate font-medium">{title}</div>
        <div className="text-[10px] text-stardim/60 truncate mt-0.5">{artist}</div>
      </div>

      {/* Animated equalizer or heart */}
      {isPlaying ? (
        <div className="flex gap-[2px] items-end h-5 relative z-[1]">
          <span className="w-[2px] bg-accent-blue/80 rounded-full animate-bounce" style={{ height: "8px", animationDelay: "0ms" }} />
          <span className="w-[2px] bg-accent-blue/80 rounded-full animate-bounce" style={{ height: "14px", animationDelay: "150ms" }} />
          <span className="w-[2px] bg-accent-blue/80 rounded-full animate-bounce" style={{ height: "10px", animationDelay: "300ms" }} />
          <span className="w-[2px] bg-accent-blue/80 rounded-full animate-bounce" style={{ height: "16px", animationDelay: "450ms" }} />
          <span className="w-[2px] bg-accent-blue/80 rounded-full animate-bounce" style={{ height: "6px", animationDelay: "600ms" }} />
        </div>
      ) : (
        <span className="text-sm relative z-[1] opacity-50">🎵</span>
      )}
    </div>
  );
}
