"use client";

import Link from "next/link";

const featured = [
  {
    emoji: "📖",
    title: "时光日记",
    desc: "记录我们的每一个重要时刻",
    href: "/timeline",
    gradient: "from-amber-500/20 via-rose-400/15 to-transparent",
    iconBg: "from-amber-400/20 to-rose-400/15",
    iconBorder: "rgba(251,191,36,0.25)",
  },
  {
    emoji: "🖼️",
    title: "回忆相册",
    desc: "定格那些美好的瞬间",
    href: "/gallery",
    gradient: "from-sky-400/20 via-indigo-400/15 to-transparent",
    iconBg: "from-sky-400/20 to-indigo-400/15",
    iconBorder: "rgba(56,189,248,0.25)",
  },
];

const others = [
  {
    emoji: "💬",
    title: "甜蜜语录",
    href: "/quotes",
    color: "#f59e8b",
    bg: "rgba(245,158,139,0.12)",
  },
  {
    emoji: "🎯",
    title: "愿望清单",
    href: "/wishlist",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
  },
  {
    emoji: "💌",
    title: "情书抽屉",
    href: "/letters",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
  },
  {
    emoji: "🗺️",
    title: "足迹地图",
    href: "/map",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
  },
];

export default function NavGrid() {
  return (
    <div className="px-4 relative z-[1]">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="h-4 w-0.5 rounded-full bg-accent-blue/60" />
        <h2 className="text-xs text-starmid tracking-[3px] uppercase font-medium">
          探索我们的故事
        </h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* 2 Featured Cards — richly styled */}
      <div className="flex gap-3 mb-4">
        {featured.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1 group">
            <div
              className="relative rounded-2xl p-5 h-full transition-all duration-300 group-active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${item.iconBorder}, transparent 70%)`,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-bl-2xl"
                style={{ background: `radial-gradient(circle at top right, ${item.iconBorder}, transparent 70%)` }} />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 relative"
                style={{
                  background: `linear-gradient(135deg, ${item.iconBorder}, transparent)`,
                  border: `1px solid ${item.iconBorder}`,
                  boxShadow: `0 4px 16px ${item.iconBorder}`,
                }}
              >
                <span className="text-2xl relative z-[1]">{item.emoji}</span>
              </div>

              <h3 className="text-sm text-starlight font-bold mb-1.5 tracking-wide">
                {item.title}
              </h3>
              <p className="text-[10px] text-stardim/70 leading-relaxed">
                {item.desc}
              </p>

              {/* Tiny arrow indicator */}
              <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-accent-blue">进入</span>
                <span className="text-accent-blue text-xs">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider with icon */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[10px] text-stardim/40 tracking-[2px]">更多回忆</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* 4 Small Cards — each with colored icon container */}
      <div className="grid grid-cols-4 gap-3">
        {others.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <div
              className="glass rounded-2xl p-3.5 text-center transition-all duration-300 group-active:scale-[0.95] hover:brightness-125"
              style={{ border: `1px solid rgba(255,255,255,0.06)` }}
            >
              {/* Colored icon circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.color}20`,
                }}
              >
                <span className="text-lg">{item.emoji}</span>
              </div>
              <div
                className="text-[10px] font-medium tracking-wide"
                style={{ color: item.color }}
              >
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
