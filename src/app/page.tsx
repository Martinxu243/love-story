import HeroSection from "@/components/home/HeroSection";
import NavGrid from "@/components/home/NavGrid";
import MusicBar from "@/components/ui/MusicBar";
import config from "@/data/config.json";

export default function HomePage() {
  return (
    <div className="relative z-[1] min-h-[100dvh] flex flex-col pb-8">
      {/* Spacer for status bar */}
      <div className="h-3" />

      <HeroSection />

      <div className="mt-4 flex-1">
        <NavGrid />
      </div>

      {/* Music Bar - pinned to bottom */}
      <div className="mt-auto pt-6">
        <MusicBar title={config.music.title} artist={config.music.artist} />
      </div>
    </div>
  );
}
