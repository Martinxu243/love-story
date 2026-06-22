import PageHeader from "@/components/ui/PageHeader";
import { formatDate } from "@/lib/utils";
import wishlist from "@/data/wishlist.json";

const completed = wishlist.filter((w) => w.completed);
const pending = wishlist.filter((w) => !w.completed);

export default function WishlistPage() {
  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="愿望清单" subtitle="Bucket List" />

      <div className="px-4 py-6 flex flex-col gap-3">
        {pending.map((item) => (
          <div
            key={item.id}
            className="rounded-medium p-4 flex items-center gap-3 border border-dashed border-[#d8c8d8]"
            style={{ background: "linear-gradient(135deg, #f8f4f8, #faf6fa)" }}
          >
            <span className="text-2xl">⭐</span>
            <div className="flex-1">
              <p className="text-sm text-[#6a5a7a] font-bold">{item.title}</p>
              <p className="text-[10px] text-[#a090b0]">待实现 🌟</p>
            </div>
          </div>
        ))}
        {completed.length > 0 && pending.length > 0 && (
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-warm-sand" />
            <span className="text-[10px] text-[#c0b0a0]">已完成</span>
            <div className="flex-1 h-px bg-warm-sand" />
          </div>
        )}
        {completed.map((item) => (
          <div
            key={item.id}
            className="rounded-medium p-4 flex items-center gap-3 bg-[#f5f2ec] border border-warm-sand"
          >
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <p className="text-sm text-[#5a6a78] font-bold line-through decoration-[#c0c0c0]">{item.title}</p>
              <p className="text-[10px] text-[#b0a090]">已完成 · {item.completedDate ? formatDate(item.completedDate) : ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
