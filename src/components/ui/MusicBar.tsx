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
    <div className="glass-strong rounded-full px-4 py-3 flex items-center gap-3 mx-4">
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-starlight" />
        ) : (
          <Music className="w-4 h-4 text-starlight" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-starlight truncate">{title}</div>
        <div className="text-[10px] text-stardim truncate">{artist}</div>
      </div>
      {isPlaying && (
        <div className="flex gap-[2px] items-end h-4">
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "8px", animationDelay: "0ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "14px", animationDelay: "200ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "10px", animationDelay: "400ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "12px", animationDelay: "600ms" }} />
        </div>
      )}
    </div>
  );
}
