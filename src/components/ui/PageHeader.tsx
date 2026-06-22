"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 bg-night-base/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-starlight" />
        </button>
        <div>
          <h1 className="text-base font-bold text-starlight font-serif tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[10px] text-stardim tracking-wider uppercase">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
