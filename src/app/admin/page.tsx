"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ───
type TabKey = "config" | "timeline" | "gallery" | "quotes" | "wishlist" | "letters" | "footprints";

interface ConfigData {
  title: string; startDate: string; dailyQuote: string;
  music: { title: string; artist: string };
}
interface TimelineItem {
  id: string; date: string; title: string; description: string;
  type: string; photo: string | null;
}
interface GalleryItem {
  id: string; date: string; title: string; description: string;
  src: string; year: number;
}
interface QuoteItem { id: string; text: string; author: string; date: string; }
interface WishItem { id: string; title: string; completed: boolean; completedDate: string | null; }
interface LetterItem { id: string; title: string; date: string; content: string; }
interface FootCity { id: string; name: string; date: string; x: number; y: number; color: string; }
interface FootprintsData { cities: FootCity[]; totalKm: number; nextDestination: string; }

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "config", label: "配置", icon: "⚙️" },
  { key: "timeline", label: "时光日记", icon: "📖" },
  { key: "gallery", label: "回忆相册", icon: "🖼️" },
  { key: "quotes", label: "甜蜜语录", icon: "💬" },
  { key: "wishlist", label: "愿望清单", icon: "🎯" },
  { key: "letters", label: "情书", icon: "💌" },
  { key: "footprints", label: "足迹", icon: "🗺️" },
];

const TYPE_LABELS: Record<string, string> = {
  love: "💕 甜蜜", travel: "✈️ 旅行", anniversary: "🎉 纪念日", daily: "🌿 日常",
};

export default function AdminPage() {
  const [tab, setTab] = useState<TabKey>("config");
  const [data, setData] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState<any>(null);
  const [msg, setMsg] = useState("");

  // Load
  const load = useCallback(async () => {
    const res = await fetch("/api/data");
    setData(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  // Save
  const save = async (key: TabKey, payload: any) => {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: key, data: payload }),
    });
    const r = await res.json();
    if (res.ok) {
      setData((prev: any) => ({ ...prev, [key]: payload }));
      setMsg(`✅ ${r.message}`);
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg(`❌ ${r.error}`);
    }
  };

  // Generate ID
  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // ─── Render helpers ───
  // ─── Form Modal ───
  const closeModal = () => setEditing(null);

  const renderForm = () => {
    if (!editing) return null;
    const { key, item, isNew } = editing;

    if (key === "config") return <ConfigForm data={item} onSave={(d: ConfigData) => { save("config", d); closeModal(); }} onCancel={closeModal} />;
    if (key === "timeline") return <TimelineForm item={item} onSave={(d: TimelineItem) => {
      const list = [...(data.timeline || [])];
      if (isNew) { d.id = genId(); list.unshift(d); }
      else { const idx = list.findIndex((x: any) => x.id === d.id); if (idx >= 0) list[idx] = d; }
      save("timeline", list); closeModal();
    }} onCancel={closeModal} />;
    if (key === "gallery") return <GalleryForm item={item} onSave={(d: GalleryItem) => {
      const list = [...(data.gallery || [])];
      if (isNew) { d.id = genId(); list.unshift(d); }
      else { const idx = list.findIndex((x: any) => x.id === d.id); if (idx >= 0) list[idx] = d; }
      save("gallery", list); closeModal();
    }} onCancel={closeModal} />;
    if (key === "quotes") return <QuoteForm item={item} onSave={(d: QuoteItem) => {
      const list = [...(data.quotes || [])];
      if (isNew) { d.id = genId(); list.unshift(d); }
      else { const idx = list.findIndex((x: any) => x.id === d.id); if (idx >= 0) list[idx] = d; }
      save("quotes", list); closeModal();
    }} onCancel={closeModal} />;
    if (key === "wishlist") return <WishForm item={item} onSave={(d: WishItem) => {
      const list = [...(data.wishlist || [])];
      if (isNew) { d.id = genId(); list.unshift(d); }
      else { const idx = list.findIndex((x: any) => x.id === d.id); if (idx >= 0) list[idx] = d; }
      save("wishlist", list); closeModal();
    }} onCancel={closeModal} />;
    if (key === "letters") return <LetterForm item={item} onSave={(d: LetterItem) => {
      const list = [...(data.letters || [])];
      if (isNew) { d.id = genId(); list.unshift(d); }
      else { const idx = list.findIndex((x: any) => x.id === d.id); if (idx >= 0) list[idx] = d; }
      save("letters", list); closeModal();
    }} onCancel={closeModal} />;
    if (key === "footprints") return <FootForm data={item} onSave={(d: FootprintsData) => { save("footprints", d); closeModal(); }} onCancel={closeModal} />;
    return null;
  };

  // ─── Content per tab ───
  const renderContent = () => {
    const list = data[tab];
    if (!list) return <p className="text-sm text-[#b0a090] text-center py-10">加载中...</p>;

    switch (tab) {
      case "config":
        return (
          <div className="p-4">
            <ConfigCard data={list as ConfigData} onEdit={() => setEditing({ key: "config", item: list, isNew: false })} />
          </div>
        );
      case "timeline":
        return <ListPanel items={list as TimelineItem[]} label="事件" onAdd={() => setEditing({ key: "timeline", item: { date: "", title: "", description: "", type: "love", photo: null }, isNew: true })} onEdit={(i: any) => setEditing({ key: "timeline", item: { ...i }, isNew: false })} onDel={(i: any) => { if (confirm("删除这条回忆？")) save("timeline", list.filter((x: any) => x.id !== i.id)); }}
          renderItem={(i: TimelineItem) => (
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{TYPE_LABELS[i.type]?.split(" ")[0] || "📌"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><span className="text-sm text-[#4a6070] font-bold">{i.title}</span><span className="text-[10px] text-[#b0a090]">{i.date}</span></div>
                <p className="text-xs text-[#8a98a8] mt-0.5 line-clamp-2">{i.description}</p>
              </div>
            </div>
          )} />;
      case "gallery":
        return <ListPanel items={list as GalleryItem[]} label="照片" onAdd={() => setEditing({ key: "gallery", item: { date: "", title: "", description: "", src: "", year: new Date().getFullYear() }, isNew: true })} onEdit={(i: any) => setEditing({ key: "gallery", item: { ...i }, isNew: false })} onDel={(i: any) => { if (confirm("删除这张照片？")) save("gallery", list.filter((x: any) => x.id !== i.id)); }}
          renderItem={(i: GalleryItem) => (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #f0e8d8, #e8d8c8)" }}>🖼️</div>
              <div className="flex-1 min-w-0"><p className="text-sm text-[#4a6070] font-bold">{i.title}</p><p className="text-[10px] text-[#b0a090]">{i.date} · {i.src}</p></div>
            </div>
          )} />;
      case "quotes":
        return <ListPanel items={list as QuoteItem[]} label="语录" onAdd={() => setEditing({ key: "quotes", item: { text: "", author: "她说", date: "" }, isNew: true })} onEdit={(i: any) => setEditing({ key: "quotes", item: { ...i }, isNew: false })} onDel={(i: any) => { if (confirm("删除这条语录？")) save("quotes", list.filter((x: any) => x.id !== i.id)); }}
          renderItem={(i: QuoteItem) => (
            <div><p className="text-sm text-[#5a6a78] italic">"{i.text}"</p><p className="text-[10px] text-[#b0a090] mt-1">— {i.author} · {i.date}</p></div>
          )} />;
      case "wishlist":
        return <ListPanel items={list as WishItem[]} label="愿望" onAdd={() => setEditing({ key: "wishlist", item: { title: "", completed: false, completedDate: null }, isNew: true })} onEdit={(i: any) => setEditing({ key: "wishlist", item: { ...i }, isNew: false })} onDel={(i: any) => { if (confirm("删除这个愿望？")) save("wishlist", list.filter((x: any) => x.id !== i.id)); }}
          renderItem={(i: WishItem) => (
            <div className="flex items-center gap-2">
              <span>{i.completed ? "✅" : "⭐"}</span>
              <span className={`text-sm font-bold ${i.completed ? "text-[#5a6a78] line-through decoration-[#c0c0c0]" : "text-[#6a5a7a]"}`}>{i.title}</span>
            </div>
          )} />;
      case "letters":
        return <ListPanel items={list as LetterItem[]} label="情书" onAdd={() => setEditing({ key: "letters", item: { title: "", date: "", content: "" }, isNew: true })} onEdit={(i: any) => setEditing({ key: "letters", item: { ...i }, isNew: false })} onDel={(i: any) => { if (confirm("删除这封信？")) save("letters", list.filter((x: any) => x.id !== i.id)); }}
          renderItem={(i: LetterItem) => (
            <div className="flex items-center gap-3"><span className="text-2xl">💌</span><div className="flex-1 min-w-0"><p className="text-sm text-[#4a6070] font-bold">{i.title}</p><p className="text-[10px] text-[#b0a090]">{i.date}</p></div></div>
          )} />;
      case "footprints":
        const fp = list as FootprintsData;
        return (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-[#eee]">
              <div className="flex gap-4 mb-3">
                <div className="flex-1"><p className="text-[10px] text-[#b0a090]">累计里程</p><p className="text-lg text-[#5a7a98] font-bold font-serif">{fp.totalKm.toLocaleString()}km</p></div>
                <div className="flex-1"><p className="text-[10px] text-[#b0a090]">下一站</p><p className="text-lg text-[#5a7a98] font-bold font-serif">{fp.nextDestination}</p></div>
              </div>
              <button onClick={() => setEditing({ key: "footprints", item: { ...fp }, isNew: false })} className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue/20 text-accent-blue border border-accent-blue/30">编辑信息</button>
            </div>
            <div className="flex items-center justify-between"><h3 className="text-sm text-[#4a6070] font-bold">🗺️ 城市列表</h3><button onClick={() => {
              const newCity = { id: genId(), name: "", date: "", x: 50, y: 50, color: "#7aa8c8" };
              const updated = { ...fp, cities: [newCity, ...fp.cities] };
              save("footprints", updated);
              setEditing({ key: "footprints", item: updated, isNew: false });
            }} className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue text-white">+ 添加城市</button></div>
            {fp.cities.map((c: FootCity) => (
              <div key={c.id} className="bg-white rounded-xl p-3 border border-[#eee] flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <div className="flex-1"><p className="text-sm text-[#5a6a78] font-bold">{c.name || "新城市"}</p><p className="text-[10px] text-[#b0a090]">{c.date}</p></div>
                <button onClick={() => {
                  const updated = { ...fp, cities: fp.cities.filter((x: FootCity) => x.id !== c.id) };
                  save("footprints", updated);
                }} className="text-[10px] text-red-400">删除</button>
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#faf8f6]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#eee] px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base text-[#4a6070] font-bold font-serif">📝 内容管理</h1>
          {msg && <p className={`text-[11px] mt-0.5 ${msg.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
        </div>
        <a href="/" className="text-xs px-3 py-1.5 rounded-full bg-[#5a7a98] text-white font-medium">← 回首页</a>
      </div>

      {/* Tabs */}
      <div className="px-3 py-3 flex gap-2 overflow-x-auto bg-white border-b border-[#f0ece4]">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
              tab === t.key ? "bg-[#4a6070] text-white shadow-md" : "bg-[#f5f2ec] text-[#8a98a8]"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal Overlay */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={closeModal}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared Components ───
function Empty({ label }: { label: string }) {
  return <p className="text-sm text-[#b0a090] text-center py-8">还没有{label}，点下方按钮添加</p>;
}
function EditBtn({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="text-xs px-2.5 py-1 rounded-lg bg-accent-blue/20 text-accent-blue border border-accent-blue/30">编辑</button>;
}
function DelBtn({ onDel }: { onDel: () => void }) {
  return <button onClick={onDel} className="text-xs px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">删除</button>;
}

function ListPanel({ items, label, onAdd, onEdit, onDel, renderItem }: {
  items: any[]; label: string; onAdd: () => void; onEdit: (item: any) => void; onDel: (item: any) => void;
  renderItem: (item: any) => React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#b0a090] font-medium">{items.length} 条{label}</span>
        <button onClick={onAdd} className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue text-white font-medium">+ 添加{label}</button>
      </div>
      {items.length === 0 ? <Empty label={label} /> : (
        <div className="flex flex-col gap-2">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-[#eee] flex items-center gap-3">
              <div className="flex-1 min-w-0">{renderItem(item)}</div>
              <div className="flex gap-1.5 flex-shrink-0">
                <EditBtn onClick={() => onEdit(item)} />
                <DelBtn onDel={() => onDel(item)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Form Components ───
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-3"><p className="text-[10px] text-[#b0a090] mb-1 font-medium">{label}</p>{children}</div>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-3 py-2 rounded-xl border border-[#e0d8cc] text-sm text-[#4a6070] bg-[#faf8f6] focus:outline-none focus:border-accent-blue" />
);
const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full px-3 py-2 rounded-xl border border-[#e0d8cc] text-sm text-[#4a6070] bg-[#faf8f6] focus:outline-none focus:border-accent-blue resize-none" rows={3} />
);
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...props} className="w-full px-3 py-2 rounded-xl border border-[#e0d8cc] text-sm text-[#4a6070] bg-[#faf8f6] focus:outline-none focus:border-accent-blue">{props.children}</select>
);

function ConfigForm({ data, onSave, onCancel }: { data: ConfigData; onSave: (d: ConfigData) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...data, music: { ...data.music } });
  return <FormShell title="编辑配置" onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="网站标题"><Input value={d.title} onChange={e => setD({ ...d, title: e.target.value })} /></Field>
    <Field label="纪念日"><Input type="date" value={d.startDate} onChange={e => setD({ ...d, startDate: e.target.value })} /></Field>
    <Field label="每日情话"><Input value={d.dailyQuote} onChange={e => setD({ ...d, dailyQuote: e.target.value })} /></Field>
    <Field label="歌曲名"><Input value={d.music.title} onChange={e => setD({ ...d, music: { ...d.music, title: e.target.value } })} /></Field>
    <Field label="歌手"><Input value={d.music.artist} onChange={e => setD({ ...d, music: { ...d.music, artist: e.target.value } })} /></Field>
  </FormShell>;
}

function TimelineForm({ item, onSave, onCancel }: { item: TimelineItem; onSave: (d: TimelineItem) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...item });
  return <FormShell title={item.id ? "编辑回忆" : "添加回忆"} onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="标题"><Input value={d.title} onChange={e => setD({ ...d, title: e.target.value })} placeholder="比如：第一次约会" /></Field>
    <Field label="日期"><Input type="date" value={d.date} onChange={e => setD({ ...d, date: e.target.value })} /></Field>
    <Field label="类型"><Select value={d.type} onChange={e => setD({ ...d, type: e.target.value })}>
      <option value="love">💕 甜蜜时刻</option><option value="travel">✈️ 旅行</option><option value="anniversary">🎉 纪念日</option><option value="daily">🌿 日常</option>
    </Select></Field>
    <Field label="描述"><TextArea value={d.description} onChange={e => setD({ ...d, description: e.target.value })} placeholder="写下当时的美好..." /></Field>
  </FormShell>;
}

function GalleryForm({ item, onSave, onCancel }: { item: GalleryItem; onSave: (d: GalleryItem) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...item });
  return <FormShell title={item.id ? "编辑照片" : "添加照片"} onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="标题"><Input value={d.title} onChange={e => setD({ ...d, title: e.target.value })} /></Field>
    <Field label="日期"><Input type="date" value={d.date} onChange={e => setD({ ...d, date: e.target.value })} /></Field>
    <Field label="描述"><Input value={d.description} onChange={e => setD({ ...d, description: e.target.value })} /></Field>
    <Field label="图片路径"><Input value={d.src} onChange={e => setD({ ...d, src: e.target.value })} placeholder="/photos/my-photo.jpg" /></Field>
    <Field label="年份"><Input type="number" value={String(d.year)} onChange={e => setD({ ...d, year: Number(e.target.value) })} /></Field>
  </FormShell>;
}

function QuoteForm({ item, onSave, onCancel }: { item: QuoteItem; onSave: (d: QuoteItem) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...item });
  return <FormShell title={item.id ? "编辑语录" : "添加语录"} onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="语录内容"><TextArea value={d.text} onChange={e => setD({ ...d, text: e.target.value })} placeholder="她说过的可爱的话..." /></Field>
    <Field label="谁说的"><Select value={d.author} onChange={e => setD({ ...d, author: e.target.value })}><option value="她说">她说</option><option value="他说">他说</option></Select></Field>
    <Field label="日期"><Input type="date" value={d.date} onChange={e => setD({ ...d, date: e.target.value })} /></Field>
  </FormShell>;
}

function WishForm({ item, onSave, onCancel }: { item: WishItem; onSave: (d: WishItem) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...item });
  return <FormShell title={item.id ? "编辑愿望" : "添加愿望"} onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="愿望"><Input value={d.title} onChange={e => setD({ ...d, title: e.target.value })} placeholder="一起想做的事..." /></Field>
    <label className="flex items-center gap-2 mb-3 cursor-pointer">
      <input type="checkbox" checked={d.completed} onChange={e => setD({ ...d, completed: e.target.checked, completedDate: e.target.checked ? (d.completedDate || new Date().toISOString().slice(0, 10)) : null })} className="w-4 h-4 rounded accent-accent-blue" />
      <span className="text-sm text-[#5a6a78]">已完成 ✅</span>
    </label>
  </FormShell>;
}

function LetterForm({ item, onSave, onCancel }: { item: LetterItem; onSave: (d: LetterItem) => void; onCancel: () => void }) {
  const [d, setD] = useState({ ...item });
  return <FormShell title={item.id ? "编辑情书" : "写新情书"} onSave={() => onSave(d)} onCancel={onCancel}>
    <Field label="标题"><Input value={d.title} onChange={e => setD({ ...d, title: e.target.value })} placeholder="比如：第一封信" /></Field>
    <Field label="日期"><Input type="date" value={d.date} onChange={e => setD({ ...d, date: e.target.value })} /></Field>
    <Field label="内容"><TextArea value={d.content} onChange={e => setD({ ...d, content: e.target.value })} placeholder="写给她的话..." rows={6} /></Field>
  </FormShell>;
}

function FootForm({ data, onSave, onCancel }: { data: FootprintsData; onSave: (d: FootprintsData) => void; onCancel: () => void }) {
  const [d, setD] = useState(data.cities.map((c: FootCity) => ({ ...c })));
  const [km, setKm] = useState(data.totalKm);
  const [next, setNext] = useState(data.nextDestination);
  const handleSave = () => {
    onSave({ cities: d, totalKm: km, nextDestination: next });
  };
  return <FormShell title="编辑足迹" onSave={handleSave} onCancel={onCancel}>
    <Field label="累计里程 (km)"><Input type="number" value={String(km)} onChange={e => setKm(Number(e.target.value))} /></Field>
    <Field label="下一站"><Input value={next} onChange={e => setNext(e.target.value)} /></Field>
    <div className="border-t border-[#eee] pt-3 mt-2">
      <p className="text-xs text-[#b0a090] font-bold mb-2">城市列表</p>
      {d.map((c: FootCity, i: number) => (
        <div key={c.id || i} className="bg-[#faf8f6] rounded-xl p-3 mb-2 border border-[#e8e0d5]">
          <div className="flex gap-2 mb-2">
            <Input value={c.name} onChange={e => { const nv = [...d]; nv[i] = { ...nv[i], name: e.target.value }; setD(nv); }} placeholder="城市名" />
            <Input type="date" value={c.date} onChange={e => { const nv = [...d]; nv[i] = { ...nv[i], date: e.target.value }; setD(nv); }} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] text-[#b0a090]">颜色</span>
            <input type="color" value={c.color} onChange={e => { const nv = [...d]; nv[i] = { ...nv[i], color: e.target.value }; setD(nv); }} className="w-8 h-6 rounded" />
            <span className="text-[10px] text-[#b0a090] ml-2">X</span>
            <input type="number" value={c.x} onChange={e => { const nv = [...d]; nv[i] = { ...nv[i], x: Number(e.target.value) }; setD(nv); }} className="w-14 px-2 py-1 rounded-lg border border-[#e0d8cc] text-xs" />
            <span className="text-[10px] text-[#b0a090]">Y</span>
            <input type="number" value={c.y} onChange={e => { const nv = [...d]; nv[i] = { ...nv[i], y: Number(e.target.value) }; setD(nv); }} className="w-14 px-2 py-1 rounded-lg border border-[#e0d8cc] text-xs" />
          </div>
        </div>
      ))}
    </div>
  </FormShell>;
}

function FormShell({ title, onSave, onCancel, children }: { title: string; onSave: () => void; onCancel: () => void; children: React.ReactNode }) {
  return (
    <div className="p-5">
      <h2 className="text-base text-[#4a6070] font-bold font-serif mb-4">{title}</h2>
      {children}
      <div className="flex gap-3 mt-5">
        <button onClick={onSave} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-accent-blue active:scale-95 transition-transform">💾 保存</button>
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm text-[#8a98a8] bg-[#f5f2ec] border border-[#e0d8cc] active:scale-95 transition-transform">取消</button>
      </div>
    </div>
  );
}

function ConfigCard({ data, onEdit }: { data: ConfigData; onEdit: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#eee]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg text-[#4a6070] font-bold font-serif">{data.title}</h2>
          <p className="text-xs text-[#b0a090] mt-1">纪念日: {data.startDate}</p>
        </div>
        <EditBtn onClick={onEdit} />
      </div>
      <div className="space-y-2 text-sm text-[#5a6a78]">
        <div className="flex gap-2"><span className="text-[#b0a090]">每日情话:</span><span className="italic">{data.dailyQuote}</span></div>
        <div className="flex gap-2"><span className="text-[#b0a090]">歌曲:</span><span>{data.music.title} — {data.music.artist}</span></div>
      </div>
    </div>
  );
}
