import DayCounter from "@/components/ui/DayCounter";
import HeartbeatLine from "@/components/ui/HeartbeatLine";
import { daysBetween } from "@/lib/utils";
import config from "@/data/config.json";

export default function HeroSection() {
  const days = daysBetween(config.startDate);

  return (
    <div className="relative mx-4 mt-2 rounded-t-[22px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(120,170,210,0.25) 0%, rgba(140,185,220,0.15) 30%, rgba(160,200,230,0.05) 60%, transparent 100%)",
      }}
    >
      {/* Clouds */}
      <span className="absolute top-2 left-4 text-lg opacity-50 animate-float select-none">☁️</span>
      <span className="absolute top-5 right-5 text-sm opacity-35 animate-float select-none" style={{ animationDelay: "2s" }}>☁️</span>

      <div className="px-5 pt-6 pb-5 text-center relative z-[1]">
        <p className="text-[10px] text-stardim/50 tracking-[4px] uppercase mb-2">
          Since {config.startDate}
        </p>
        <h1 className="font-serif text-xl text-starlight font-bold tracking-[2px] mb-4">
          {config.title}
        </h1>

        {/* Days Counter Card */}
        <div className="inline-block glass-strong rounded-card px-6 py-4">
          <p className="text-[9px] text-stardim/40 tracking-[3px] mb-1 uppercase">在一起</p>
          <DayCounter days={days} />
          <p className="text-[11px] text-stardim tracking-[2px] mt-1">天</p>
        </div>

        <HeartbeatLine />

        {/* Daily Quote Chip */}
        <div className="inline-block glass rounded-full px-4 py-2 mt-2">
          <p className="text-[11px] text-accent-soft italic">{config.dailyQuote}</p>
        </div>
      </div>
    </div>
  );
}
