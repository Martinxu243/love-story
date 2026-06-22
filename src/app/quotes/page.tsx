"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Shuffle } from "lucide-react";
import quotes from "@/data/quotes.json";
import { formatDate } from "@/lib/utils";

const cardColors = [
  "linear-gradient(135deg, #f5f2ec, #faf6f2)",
  "linear-gradient(135deg, #f0f2f8, #f5f5fa)",
  "linear-gradient(135deg, #f2f0f0, #f8f4f4)",
  "linear-gradient(135deg, #f3f5f0, #f7f9f4)",
];

export default function QuotesPage() {
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const handleRandom = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    setRandomIndex(idx);
  };

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="甜蜜语录" subtitle="Quotes" />

      {/* Random Quote Button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={handleRandom}
          className="w-full glass rounded-medium py-3 flex items-center justify-center gap-2 text-starlight text-sm active:scale-[0.98] transition-transform"
        >
          <Shuffle className="w-4 h-4" />
          随机播放一条语录
        </button>
      </div>

      {/* Random Quote Result */}
      {randomIndex !== null && (
        <div className="px-4 pb-4">
          <div
            className="rounded-card p-6 border border-warm-sand text-center relative"
            style={{ background: cardColors[randomIndex % cardColors.length] }}
          >
            <span className="absolute top-1 left-4 text-3xl text-[#d0c8b8] select-none">
              &ldquo;
            </span>
            <p className="text-[#5a6a78] text-sm italic leading-relaxed pt-3">
              {quotes[randomIndex].text}
            </p>
            <p className="text-[#b0a090] text-[10px] mt-3 text-right">
              — {quotes[randomIndex].author} · {formatDate(quotes[randomIndex].date)}
            </p>
          </div>
        </div>
      )}

      {/* All Quotes */}
      <div className="px-4 pb-8 flex flex-col gap-3">
        {quotes.map((quote, idx) => (
          <div
            key={quote.id}
            className="rounded-card p-5 border border-warm-sand relative"
            style={{ background: cardColors[idx % cardColors.length] }}
          >
            <span className="absolute top-0 left-3 text-2xl text-[#d0c8b8] select-none">
              &ldquo;
            </span>
            <p className="text-[#5a6a78] text-xs italic leading-relaxed pt-2">
              {quote.text}
            </p>
            <p className="text-[#b0a090] text-[10px] mt-2 text-right">
              — {quote.author} · {formatDate(quote.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
