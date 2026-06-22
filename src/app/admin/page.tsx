"use client";

import { useState, useEffect, useCallback } from "react";

const FILES = [
  { key: "config", label: "⚙️ 配置", desc: "标题、纪念日、情话、音乐" },
  { key: "timeline", label: "📖 时光日记", desc: "恋爱时间轴事件" },
  { key: "gallery", label: "🖼️ 回忆相册", desc: "照片列表" },
  { key: "quotes", label: "💬 甜蜜语录", desc: "她说过的可爱的话" },
  { key: "wishlist", label: "🎯 愿望清单", desc: "一起想做的事" },
  { key: "letters", label: "💌 情书抽屉", desc: "写给她的信" },
  { key: "footprints", label: "🗺️ 足迹地图", desc: "一起去过的地方" },
];

export default function AdminPage() {
  const [allData, setAllData] = useState<Record<string, unknown>>({});
  const [activeFile, setActiveFile] = useState("config");
  const [editText, setEditText] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all data on mount
  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/data");
      const data = await res.json();
      setAllData(data);
      setEditText(JSON.stringify(data[activeFile], null, 2));
    } catch {
      setMessage({ type: "error", text: "加载失败，请检查服务器" });
    }
  }, [activeFile]);

  useEffect(() => {
    loadData();
  }, []);

  // Switch active file
  const switchFile = (key: string) => {
    if (allData[key]) {
      setEditText(JSON.stringify(allData[key], null, 2));
    }
    setActiveFile(key);
    setMessage(null);
  };

  // Save current file
  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Validate JSON
      const parsed = JSON.parse(editText);
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: activeFile, data: parsed }),
      });
      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        // Update local state
        setAllData((prev) => ({ ...prev, [activeFile]: parsed }));
      } else {
        setMessage({ type: "error", text: result.error || "保存失败" });
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        setMessage({ type: "error", text: `JSON 格式错误: ${e.message}` });
      } else {
        setMessage({ type: "error", text: String(e) });
      }
    } finally {
      setLoading(false);
    }
  };

  // Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(editText);
      setEditText(JSON.stringify(parsed, null, 2));
      setMessage({ type: "success", text: "✓ 已格式化" });
    } catch {
      setMessage({ type: "error", text: "JSON 格式错误，无法格式化" });
    }
  };

  // Reload
  const handleReload = () => {
    loadData();
    setMessage({ type: "success", text: "✓ 已重新加载" });
  };

  const currentLabel = FILES.find((f) => f.key === activeFile);

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-warm-cream border-b border-warm-sand">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base text-[#4a6070] font-bold font-serif">📝 内容管理</h1>
            <p className="text-[10px] text-[#b0a090]">编辑你的恋爱记录</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReload}
              className="px-3 py-1.5 text-[10px] rounded-full bg-white border border-[#e0d8cc] text-[#8a98a8]"
            >
              🔄 刷新
            </button>
            <a
              href="/"
              className="px-3 py-1.5 text-[10px] rounded-full bg-accent-blue text-white font-medium"
            >
              ← 回首页
            </a>
          </div>
        </div>
      </div>

      {/* File Tabs */}
      <div className="px-3 py-3 flex gap-2 overflow-x-auto">
        {FILES.map((f) => (
          <button
            key={f.key}
            onClick={() => switchFile(f.key)}
            className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
              activeFile === f.key
                ? "bg-[#4a6070] text-white shadow-md"
                : "bg-white text-[#8a98a8] border border-[#e8e0d8]"
            }`}
            title={f.desc}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div className="px-3 pb-6">
        {currentLabel && (
          <div className="mb-3 px-1">
            <p className="text-[11px] text-[#b0a090]">{currentLabel.desc}</p>
          </div>
        )}

        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full h-[60vh] bg-[#1a2535] text-[#c8d8e0] font-mono text-xs p-4 rounded-xl border border-[#2a3545] resize-none focus:outline-none focus:border-accent-blue"
          spellCheck={false}
        />

        {/* Action Bar */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: loading
                ? "#8a9aaa"
                : "linear-gradient(135deg, #5a7a98, #7aa8c8)",
            }}
          >
            {loading ? "保存中..." : "💾 保存修改"}
          </button>

          <button
            onClick={handleFormat}
            className="px-4 py-2.5 rounded-xl text-xs text-[#8a98a8] bg-white border border-[#e0d8cc]"
          >
            格式化 JSON
          </button>

          <div className="flex-1" />

          {message && (
            <div
              className={`text-xs font-medium px-3 py-2 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        {/* Quick Help */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-[10px] text-blue-700 font-bold mb-1">💡 提示</p>
          <ul className="text-[10px] text-blue-600 space-y-0.5">
            <li>• 编辑 JSON 后点"保存修改"，会自动备份旧文件</li>
            <li>• 保存后刷新首页即可看到更新（开发模式下自动热更新）</li>
            <li>• 如果 JSON 格式有误，点"格式化 JSON"会自动对齐</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
