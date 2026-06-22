import DayCounter from "@/components/ui/DayCounter";
import HeartbeatLine from "@/components/ui/HeartbeatLine";
import { daysBetween } from "@/lib/utils";
import config from "@/data/config.json";

export default function HeroSection() {
  const days = daysBetween(config.startDate);

  return (
    <div className="relative mx-4 mt-2 rounded-[28px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(120,170,210,0.35) 0%, rgba(140,185,220,0.2) 25%, rgba(160,200,230,0.08) 55%, rgba(180,200,220,0.02) 100%)",
      }}
    >
      {/* Clouds — more and better positioned */}
      <span className="absolute top-3 left-3 text-xl opacity-60 animate-float select-none">☁️</span>
      <span className="absolute top-6 right-4 text-base opacity-40 animate-float select-none" style={{ animationDelay: "1.5s" }}>☁️</span>
      <span className="absolute top-14 left-[60%] text-sm opacity-30 animate-float select-none" style={{ animationDelay: "3s" }}>☁️</span>

      {/* Decorative sparkles */}
      <span className="absolute top-8 left-[15%] text-[6px] opacity-30 animate-twinkle select-none" style={{ animationDelay: "0.5s" }}>✦</span>
      <span className="absolute top-16 right-[20%] text-[5px] opacity-25 animate-twinkle select-none" style={{ animationDelay: "2s" }}>✦</span>
      <span className="absolute top-24 left-[75%] text-[4px] opacity-20 animate-twinkle select-none" style={{ animationDelay: "1s" }}>✦</span>

      <div className="px-5 pt-7 pb-6 text-center relative z-[1]">
        {/* Top label with decorative line */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-8 bg-gradient-to-r from-transparent to-white/15" />
          <p className="text-[10px] text-stardim/50 tracking-[5px] uppercase whitespace-nowrap">
            Since {config.startDate}
          </p>
          <div className="h-px flex-1 max-w-8 bg-gradient-to-l from-transparent to-white/15" />
        </div>

        <h1 className="font-serif text-2xl text-starlight font-bold tracking-[3px] mb-5">
          {config.title}
        </h1>

        {/* Days Counter Card — enhanced with glow ring */}
        <div className="inline-block relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-[22px] blur-xl"
            style={{ background: "rgba(120,170,210,0.15)" }} />
          <div className="relative glass-strong rounded-[22px] px-8 py-5"
            style={{ border: "1px solid rgba(180,210,240,0.15)" }}>
            <p className="text-[9px] text-stardim/50 tracking-[4px] mb-2 uppercase">在一起</p>
            <DayCounter days={days} />
            <p className="text-[11px] text-stardim tracking-[3px] mt-2">天</p>
          </div>
        </div>

        <div className="mt-3">
          <HeartbeatLine />
        </div>

        {/* Daily Quote — enhanced chip */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mt-2"
          style={{ border: "1px solid rgba(180,210,240,0.1)" }}>
          <span className="text-sm">💙</span>
          <p className="text-[12px] text-starlight/80 italic">{config.dailyQuote}</p>
        </div>
      </div>

      {/* Bottom decorative gradient line */}
      <div className="h-px mx-8 opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180,210,240,0.5), transparent)" }} />
    </div>
  );
}
