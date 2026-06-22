import HeroSection from "@/components/home/HeroSection";
import NavGrid from "@/components/home/NavGrid";
import MusicBar from "@/components/ui/MusicBar";
import { getConfig } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const config = getConfig();
  return (
    <div className="relative z-[1] min-h-[100dvh] flex flex-col pb-8">
      <div className="h-4" />
      <HeroSection />
      <div className="mt-5 flex-1">
        <NavGrid />
      </div>
      <div className="text-center mt-8 mb-3">
        <p className="text-[10px] text-stardim/30 tracking-[3px]">
          ✦ 每一天 都是新的故事 ✦
        </p>
      </div>
      <div className="mt-auto pt-4">
        <MusicBar title={config.music.title} artist={config.music.artist} />
      </div>
    </div>
  );
}
