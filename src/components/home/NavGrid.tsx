"use client";

import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const featured = [
  { emoji: "📖", title: "时光日记", desc: "我们的故事", href: "/timeline" },
  { emoji: "🖼️", title: "回忆相册", desc: "定格美好", href: "/gallery" },
];

const others = [
  { emoji: "💬", title: "语录", href: "/quotes" },
  { emoji: "🎯", title: "愿望", href: "/wishlist" },
  { emoji: "💌", title: "情书", href: "/letters" },
  { emoji: "🗺️", title: "足迹", href: "/map" },
];

export default function NavGrid() {
  return (
    <div className="px-4 relative z-[1]">
      {/* 2 Featured Cards */}
      <div className="flex gap-3 mb-3">
        {featured.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1">
            <GlassCard className="p-5 text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-sm text-starlight font-semibold">{item.title}</div>
              <div className="text-[9px] text-stardim mt-1">{item.desc}</div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* 4 Small Grid */}
      <div className="grid grid-cols-4 gap-3">
        {others.map((item) => (
          <Link key={item.href} href={item.href}>
            <GlassCard className="p-3 text-center">
              <div className="text-xl">{item.emoji}</div>
              <div className="text-[9px] text-stardim mt-1">{item.title}</div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
