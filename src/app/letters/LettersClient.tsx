"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Letter } from "@/lib/data";

interface Props {
  letters: Letter[];
}

export default function LettersClient({ letters }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="情书抽屉" subtitle="Letters" />
      <div className="px-4 py-6 flex flex-col gap-3">
        {letters.map((letter) => {
          const isOpen = openId === letter.id;
          return (
            <div key={letter.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : letter.id)}
                className="w-full bg-white rounded-card p-4 flex items-center gap-3 border border-[#eee] shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="text-3xl">💌</span>
                <div className="flex-1 text-left">
                  <p className="text-sm text-[#5a6a78] font-bold">{letter.title}</p>
                  <p className="text-[10px] text-[#b0a090]">{formatDate(letter.date)}</p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-4 h-4 text-[#c0c0c0]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-3 mx-1 rounded-card p-5 border border-[#e8e0d5] relative"
                      style={{
                        background: "linear-gradient(180deg, #fdfaf5 0%, #faf6f0 100%)",
                        backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(180,160,140,0.15) 23px, rgba(180,160,140,0.15) 24px)",
                      }}
                    >
                      <p className="text-[#5a6a78] text-xs leading-[24px] whitespace-pre-line font-serif">
                        {letter.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
