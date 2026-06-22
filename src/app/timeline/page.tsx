import PageHeader from "@/components/ui/PageHeader";
import { formatDate, getYear } from "@/lib/utils";
import { getTimeline } from "@/lib/data";
import type { TimelineItem } from "@/lib/data";

export const dynamic = "force-dynamic";

const nodeColors: Record<string, string> = {
  love: "#e8a0b0",
  travel: "#7aa8c8",
  anniversary: "#d8c898",
  daily: "#98b8a0",
};

function groupByYear(items: TimelineItem[]) {
  const groups: Record<number, TimelineItem[]> = {};
  for (const item of items) {
    const year = getYear(item.date);
    if (!groups[year]) groups[year] = [];
    groups[year].push(item);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year: Number(year), items }));
}

export default function TimelinePage() {
  const timeline = getTimeline();
  const groups = groupByYear(timeline);

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="时光日记" subtitle="Timeline" />

      <div className="px-5 py-6">
        {groups.map((group) => (
          <div key={group.year} className="mb-8">
            <h2 className="font-serif text-xl text-[#6a7a8a] font-bold mb-4 tracking-wider">
              {group.year}
            </h2>

            <div className="relative pl-8">
              {/* Timeline line */}
              <div
                className="absolute left-[11px] top-0 bottom-0 w-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #a8c8e0 0%, #d8c8b8 50%, #a8c8e0 100%)",
                }}
              />

              <div className="flex flex-col gap-5">
                {group.items.map((item, idx) => (
                  <div key={item.id} className="relative"
                    style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}>
                    {/* Node */}
                    <div
                      className="absolute -left-[23px] top-1 w-[10px] h-[10px] rounded-full border-2 border-white shadow-md"
                      style={{
                        backgroundColor:
                          nodeColors[item.type] || nodeColors.daily,
                        boxShadow: `0 1px 6px ${nodeColors[item.type] || nodeColors.daily}40`,
                      }}
                    />

                    <div className="warm-card p-4">
                      <p className="text-[10px] text-[#b0a090] mb-1">
                        {formatDate(item.date)}
                      </p>
                      <h3 className="text-sm text-[#4a6070] font-bold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#8a98a8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
