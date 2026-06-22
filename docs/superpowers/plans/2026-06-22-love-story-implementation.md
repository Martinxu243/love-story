# Love Story 恋爱记录小屋 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个手机优先、深蓝夜空风格的恋爱记录 Web 应用，包含首页+6个内页，JSON驱动内容，部署到Vercel。

**Architecture:** Next.js 14 App Router + Tailwind CSS + Framer Motion。页面组件以 Server Component 为主，读取本地 JSON 数据；动画交互组件（DayCounter, StarField, HeartbeatLine 等）标记 `"use client"`。数据通过 `src/data/` 下 JSON 文件管理，props 从 Server Component 传入 Client Component。

**Tech Stack:** Next.js 14, Tailwind CSS 3, Framer Motion 11, TypeScript, pnpm, Vercel

---

## File Structure Map

```
love-story/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 根布局：全局样式 + metadata + StarField背景
│   │   ├── globals.css             # Tailwind指令 + 自定义@layer + 星空动画
│   │   ├── page.tsx                # 首页（Server Component）
│   │   ├── timeline/page.tsx       # 时光日记
│   │   ├── gallery/page.tsx        # 回忆相册
│   │   ├── quotes/page.tsx         # 甜蜜语录
│   │   ├── wishlist/page.tsx       # 愿望清单
│   │   ├── letters/page.tsx        # 情书抽屉
│   │   └── map/page.tsx            # 足迹地图
│   ├── components/
│   │   ├── ui/
│   │   │   ├── StarField.tsx       # "use client" — 星空背景（随机闪烁星星）
│   │   │   ├── GlassCard.tsx       # 毛玻璃卡片容器
│   │   │   ├── DayCounter.tsx      # "use client" — 天数count-up动画
│   │   │   ├── HeartbeatLine.tsx   # SVG心跳波形线
│   │   │   ├── MusicBar.tsx        # "use client" — 常驻音乐播放条
│   │   │   ├── PageHeader.tsx      # 内页统一顶栏（返回+标题）
│   │   │   └── Lightbox.tsx        # "use client" — 照片全屏查看
│   │   └── home/
│   │       ├── HeroSection.tsx     # Hero区域：光晕+标题+天数+心跳
│   │       └── NavGrid.tsx         # 导航入口：2大卡片+4小格
│   ├── data/
│   │   ├── config.json             # 全局配置
│   │   ├── timeline.json           # 时光日记条目
│   │   ├── gallery.json            # 相册图片列表
│   │   ├── quotes.json             # 甜蜜语录
│   │   ├── wishlist.json           # 愿望清单
│   │   ├── letters.json            # 情书
│   │   └── footprints.json         # 足迹数据
│   └── lib/
│       └── utils.ts                # daysBetween, formatDate等工具函数
├── public/
│   ├── photos/                     # 照片目录
│   │   └── .gitkeep
│   └── music/                      # 背景音乐
│       └── .gitkeep
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Phase 1: 项目脚手架

### Task 1: 创建 Next.js 项目

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`

- [ ] **Step 1: 用 create-next-app 初始化项目**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-pnpm
```

- [ ] **Step 2: 安装额外依赖**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
pnpm add framer-motion lucide-react
```

- [ ] **Step 3: 配置 tailwind.config.ts 自定义颜色**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          base: "#0d1a2e",
          mid: "#152238",
          deep: "#1a2a44",
          light: "#1e3250",
        },
        skyglow: "rgba(120,170,210,0.25)",
        starlight: "#c8d8f0",
        starmid: "#8090b0",
        stardim: "#7080a0",
        warm: {
          cream: "#f5f2ec",
          sand: "#e8e0d5",
          base: "#faf8f6",
        },
        accent: {
          blue: "#7aa8c8",
          soft: "#b0c8e0",
        },
        gradient: {
          from: "#f0f4fa",
          to: "#8098b8",
        },
        // Timeline node colors
        node: {
          love: "#e8a0b0",
          travel: "#7aa8c8",
          anniversary: "#d8c898",
          daily: "#98b8a0",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
        sans: ["-apple-system", "'PingFang SC'", "'Microsoft YaHei'", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        medium: "14px",
        small: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: 验证项目能启动**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
pnpm dev
# 打开 http://localhost:3000，应看到 Next.js 默认页面
```

- [ ] **Step 5: 创建目录结构**

```bash
mkdir -p src/components/ui src/components/home src/data src/lib public/photos public/music
```

---

### Task 2: 创建全局样式和工具函数

**Files:**
- Rewrite: `src/app/globals.css`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: 写入 globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    -webkit-tap-highlight-color: transparent;
  }
  body {
    @apply bg-night-base text-starlight font-sans;
    overflow-x: hidden;
    min-height: 100dvh;
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .glass-strong {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .warm-card {
    @apply bg-warm-cream border border-warm-sand rounded-card;
  }
  .text-gradient {
    background: linear-gradient(180deg, #f0f4fa 0%, #b0c8e0 60%, #8098b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.4; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse-heart {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
}

@keyframes heartbeat-line {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 5; }
}

.animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-pulse-heart { animation: pulse-heart 2s ease-in-out infinite; }
```

- [ ] **Step 2: 写入 utils.ts**

```ts
export function daysBetween(start: string, end?: string): number {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYear(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}
```

---

## Phase 2: 全局数据文件

### Task 3: 创建示例数据

**Files:**
- Create: `src/data/config.json`, `src/data/timeline.json`, `src/data/gallery.json`, `src/data/quotes.json`, `src/data/wishlist.json`, `src/data/letters.json`, `src/data/footprints.json`

- [ ] **Step 1: 写入 config.json**

```json
{
  "title": "蔚蓝时光",
  "startDate": "2023-06-15",
  "dailyQuote": "每一天都是心动 💙",
  "music": {
    "title": "Perfect",
    "artist": "Ed Sheeran"
  }
}
```

- [ ] **Step 2: 写入 timeline.json（3条示例）**

```json
[
  { "id": "1", "date": "2023-06-15", "title": "初次相遇", "description": "在那个阳光正好的午后，命运让我们相遇。你穿着白色的裙子，笑起来眼睛弯弯的，那一刻我就知道，你不一样。", "type": "love", "photo": null },
  { "id": "2", "date": "2023-07-20", "title": "第一次约会", "description": "我们一起去了那家你一直想去的咖啡馆。你点了草莓蛋糕，说这是你吃过最好吃的。其实我想说，和你在一起的每一刻，都是最好吃的。", "type": "love", "photo": null },
  { "id": "3", "date": "2023-08-14", "title": "第一次旅行 · 海边", "description": "带你去看海，你在沙滩上奔跑的样子，比海浪还美。我们约定以后每年都要一起看海。", "type": "travel", "photo": null },
  { "id": "4", "date": "2023-12-25", "title": "第一个圣诞节", "description": "我们窝在家里看《真爱至上》，你靠在我肩上睡着了。给你准备的礼物是一条星星项链，你说这是你收到过最用心的礼物。", "type": "anniversary", "photo": null },
  { "id": "5", "date": "2024-01-01", "title": "跨年之夜", "description": "烟花在零点绽放的那一刻，我在你耳边说'新年快乐，我爱你'。你转过头那一刻，眼睛里全是星星。", "type": "anniversary", "photo": null },
  { "id": "6", "date": "2024-03-20", "title": "春天里的野餐", "description": "我们在公园铺了格子布，晒太阳、吃三明治。你说这就是幸福的样子。我也这么觉得。", "type": "daily", "photo": null },
  { "id": "7", "date": "2024-06-15", "title": "一周年纪念日", "description": "365天，不长不短，刚好够我确定——你就是我想共度余生的人。带你去吃了第一次约会的那家餐厅，你感动得哭了。", "type": "anniversary", "photo": null },
  { "id": "8", "date": "2024-10-01", "title": "一起去爬山", "description": "你说你从来不爱运动，但为了陪我，居然爬完了全程。山顶的风很大，我们抱在一起看日落，你说这是你见过最美的黄昏。", "type": "travel", "photo": null },
  { "id": "9", "date": "2025-02-14", "title": "情人节", "description": "我亲手做了一桌菜（虽然卖相一般），你却说这是米其林三星。收到你送的围巾，你说'这样冬天你就能一直暖暖的了'。", "type": "love", "photo": null },
  { "id": "10", "date": "2025-06-15", "title": "两周年纪念日", "description": "730天，我们的故事还在继续。给你写了一封信，你没有看就已经哭了。你笑着说'都怪你'，我觉得你可爱得不得了。", "type": "anniversary", "photo": null }
]
```

- [ ] **Step 3: 写入 gallery.json**

```json
[
  { "id": "1", "date": "2023-06-15", "title": "初次相遇的那天", "description": "你穿着白色裙子的样子", "src": "/photos/placeholder-1.jpg", "year": 2023 },
  { "id": "2", "date": "2023-07-20", "title": "第一次约会", "description": "在咖啡馆拍的合照", "src": "/photos/placeholder-2.jpg", "year": 2023 },
  { "id": "3", "date": "2023-08-14", "title": "海边的日落", "description": "你站在夕阳下的剪影", "src": "/photos/placeholder-3.jpg", "year": 2023 },
  { "id": "4", "date": "2024-01-01", "title": "跨年烟花", "description": "零点时分的自拍", "src": "/photos/placeholder-4.jpg", "year": 2024 },
  { "id": "5", "date": "2024-03-20", "title": "春日野餐", "description": "阳光洒在你脸上", "src": "/photos/placeholder-5.jpg", "year": 2024 },
  { "id": "6", "date": "2024-06-15", "title": "一周年", "description": "那家餐厅的烛光", "src": "/photos/placeholder-6.jpg", "year": 2024 },
  { "id": "7", "date": "2024-10-01", "title": "山顶日落", "description": "我们和夕阳的合照", "src": "/photos/placeholder-7.jpg", "year": 2024 },
  { "id": "8", "date": "2025-02-14", "title": "情人节晚餐", "description": "我亲手做的菜和你送的围巾", "src": "/photos/placeholder-8.jpg", "year": 2025 },
  { "id": "9", "date": "2025-06-15", "title": "两周年", "description": "你拿着信的样子", "src": "/photos/placeholder-9.jpg", "year": 2025 }
]
```

- [ ] **Step 4: 写入 quotes.json**

```json
[
  { "id": "1", "text": "笨蛋，你都不知道我有多喜欢你", "author": "她说", "date": "2024-03-12" },
  { "id": "2", "text": "和你在一起，连发呆都是甜的", "author": "她说", "date": "2024-06-08" },
  { "id": "3", "text": "下辈子还要和你在一起", "author": "她说", "date": "2024-09-20" },
  { "id": "4", "text": "遇到你，是我这辈子最幸运的事", "author": "她说", "date": "2024-12-25" },
  { "id": "5", "text": "你笑起来的时候，我的世界就亮了", "author": "他说", "date": "2023-07-20" },
  { "id": "6", "text": "你不用多好，我喜欢就好", "author": "她说", "date": "2024-05-15" }
]
```

- [ ] **Step 5: 写入 wishlist.json**

```json
[
  { "id": "1", "title": "一起看日出", "completed": true, "completedDate": "2024-05-20" },
  { "id": "2", "title": "一起养一只猫", "completed": true, "completedDate": "2024-08-12" },
  { "id": "3", "title": "一起去冰岛看极光", "completed": false, "completedDate": null },
  { "id": "4", "title": "学做一道她的拿手菜", "completed": false, "completedDate": null },
  { "id": "5", "title": "一起看一场演唱会", "completed": true, "completedDate": "2024-11-15" },
  { "id": "6", "title": "去迪士尼看烟花", "completed": false, "completedDate": null },
  { "id": "7", "title": "一起学跳舞", "completed": false, "completedDate": null },
  { "id": "8", "title": "给她做一顿烛光晚餐", "completed": true, "completedDate": "2025-02-14" }
]
```

- [ ] **Step 6: 写入 letters.json**

```json
[
  {
    "id": "1",
    "title": "第一封信",
    "date": "2023-06-16",
    "content": "Dear,\n\n遇见你的第二天，我依然觉得像在做梦。昨天你说\"你好\"的时候，我的心跳漏了一拍。\n\n我不知道未来会怎样，但我知道，我想和你有未来。\n\n你让我想要成为一个更好的人。不是因为配不上你，而是因为想给你最好的。\n\n晚安，希望明天也能见到你。"
  },
  {
    "id": "2",
    "title": "一周年快乐",
    "date": "2024-06-15",
    "content": "Dear,\n\n365天。\n\n365个想你的早晨，365个有你的夜晚。\n\n谢谢你这一年来所有的笑、所有的拥抱、所有的\"我爱你\"。\n\n你让我的世界从黑白变成了彩色。\n\n一周年快乐。还有好多好多年在等着我们。\n\n永远爱你。"
  },
  {
    "id": "3",
    "title": "写给未来的你",
    "date": "2025-03-08",
    "content": "Dear,\n\n写这封信的时候，窗外下着小雨。我想到多年以后，我们可能已经有了自己的小家，养了一只猫，院子里种了花。\n\n不管未来怎样，我希望你还是那个笑起来眼睛弯弯的女孩。我希望我们还像现在一样，牵着手去超市买菜，窝在沙发上看电影，为谁洗碗而拌嘴。\n\n只要是你，怎样的未来都值得期待。\n\n爱你的每一天。"
  }
]
```

- [ ] **Step 7: 写入 footprints.json**

```json
{
  "cities": [
    { "id": "1", "name": "北京", "date": "2023-06-15", "x": 62, "y": 30, "color": "#e91e63" },
    { "id": "2", "name": "上海", "date": "2023-09-10", "x": 72, "y": 52, "color": "#4caf50" },
    { "id": "3", "name": "杭州", "date": "2024-03-15", "x": 68, "y": 58, "color": "#2196f3" },
    { "id": "4", "name": "青岛", "date": "2024-07-20", "x": 70, "y": 42, "color": "#ff9800" },
    { "id": "5", "name": "厦门", "date": "2025-01-10", "x": 66, "y": 68, "color": "#9c27b0" }
  ],
  "totalKm": 5280,
  "nextDestination": "大理"
}
```

---

## Phase 3: 共享 UI 组件

### Task 4: StarField 星空背景

**Files:**
- Create: `src/components/ui/StarField.tsx`

- [ ] **Step 1: 写入 StarField.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = [];
    for (let i = 0; i < 30; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute text-white/30 select-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
```

---

### Task 5: GlassCard 毛玻璃卡片

**Files:**
- Create: `src/components/ui/GlassCard.tsx`

- [ ] **Step 1: 写入 GlassCard.tsx**

```tsx
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button";
}

export default function GlassCard({
  children,
  className = "",
  onClick,
  as = "div",
}: GlassCardProps) {
  const Component = as;
  return (
    <Component
      onClick={onClick}
      className={`glass rounded-card transition-all duration-200 ${
        onClick ? "cursor-pointer active:scale-[0.98] hover:brightness-110" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
```

---

### Task 6: DayCounter 天数计数器

**Files:**
- Create: `src/components/ui/DayCounter.tsx`

- [ ] **Step 1: 写入 DayCounter.tsx**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface DayCounterProps {
  days: number;
}

export default function DayCounter({ days }: DayCounterProps) {
  const [displayDays, setDisplayDays] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = days / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= days) {
        setDisplayDays(days);
        clearInterval(timer);
      } else {
        setDisplayDays(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [days]);

  return (
    <span className="font-serif text-5xl font-bold text-gradient tabular-nums">
      {displayDays.toLocaleString()}
    </span>
  );
}
```

---

### Task 7: HeartbeatLine 心跳曲线

**Files:**
- Create: `src/components/ui/HeartbeatLine.tsx`

- [ ] **Step 1: 写入 HeartbeatLine.tsx**

```tsx
export default function HeartbeatLine() {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <svg
        width="100"
        height="20"
        viewBox="0 0 100 20"
        className="overflow-visible"
      >
        <path
          d="M0 10 Q8 10 12 7 Q16 4 20 10 Q24 16 28 10 Q32 4 36 7 Q40 10 48 10 Q56 10 60 7 Q64 4 68 10 Q72 16 76 10 Q80 4 84 7 Q88 10 100 10"
          fill="none"
          stroke="rgba(180,200,225,0.3)"
          strokeWidth="1.2"
          strokeDasharray="100"
          className="animate-[heartbeat-line_3s_ease-in-out_infinite]"
        />
      </svg>
      <span className="text-base animate-pulse-heart select-none">💗</span>
    </div>
  );
}
```

---

### Task 8: MusicBar 音乐播放条

**Files:**
- Create: `src/components/ui/MusicBar.tsx`

- [ ] **Step 1: 写入 MusicBar.tsx**

```tsx
"use client";

import { useState } from "react";
import { Music, Pause } from "lucide-react";

interface MusicBarProps {
  title: string;
  artist: string;
}

export default function MusicBar({ title, artist }: MusicBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-strong rounded-full px-4 py-3 flex items-center gap-3 mx-4">
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-starlight" />
        ) : (
          <Music className="w-4 h-4 text-starlight" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-starlight truncate">{title}</div>
        <div className="text-[10px] text-stardim truncate">{artist}</div>
      </div>
      {isPlaying && (
        <div className="flex gap-[2px] items-end h-4">
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "8px", animationDelay: "0ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "14px", animationDelay: "200ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "10px", animationDelay: "400ms" }} />
          <span className="w-[2px] bg-accent-blue rounded-full animate-bounce" style={{ height: "12px", animationDelay: "600ms" }} />
        </div>
      )}
    </div>
  );
}
```

---

### Task 9: PageHeader 内页顶栏

**Files:**
- Create: `src/components/ui/PageHeader.tsx`

- [ ] **Step 1: 写入 PageHeader.tsx**

```tsx
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
```

---

<!-- Phase 3 ends, continue to Phase 4 -->


---

## Phase 4: 首页

### Task 10: HeroSection 组件

**Files:**
- Create: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: 写入 HeroSection.tsx**

```tsx
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
```

---

### Task 11: NavGrid 导航入口

**Files:**
- Create: `src/components/home/NavGrid.tsx`

- [ ] **Step 1: 写入 NavGrid.tsx**

```tsx
"use client";

import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const featured = [
  { emoji: "📖", title: "时光日记", desc: "我们的故事", href: "/timeline" },
  { emoji: "🖼️", title: "回忆相册", desc: "定格美好", href: "/gallery" },
];

const others = [
  { emoji: "💬", title: "语录", href: "/quotes" },
  { emoji: "🎯", title: "愿望", href: "/wishlist" },
  { emoji: "💌", title: "情书", href: "/letters" },
  { emoji: "🗺️", title: "足迹", href: "/map" },
];

export default function NavGrid() {
  return (
    <div className="px-4 relative z-[1]">
      {/* 2 Featured Cards */}
      <div className="flex gap-3 mb-3">
        {featured.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1">
            <GlassCard className="p-5 text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-sm text-starlight font-semibold">{item.title}</div>
              <div className="text-[9px] text-stardim mt-1">{item.desc}</div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* 4 Small Grid */}
      <div className="grid grid-cols-4 gap-3">
        {others.map((item) => (
          <Link key={item.href} href={item.href}>
            <GlassCard className="p-3 text-center">
              <div className="text-xl">{item.emoji}</div>
              <div className="text-[9px] text-stardim mt-1">{item.title}</div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

---

### Task 12: 首页 page.tsx

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```tsx
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
```

## Phase 5: 内页

### Task 13: 时光日记页面

**Files:**
- Create: `src/app/timeline/page.tsx`

- [ ] **Step 1: 写入 timeline/page.tsx**

```tsx
import PageHeader from "@/components/ui/PageHeader";
import { formatDate, getYear } from "@/lib/utils";
import timeline from "@/data/timeline.json";

const nodeColors: Record<string, string> = {
  love: "#e8a0b0",
  travel: "#7aa8c8",
  anniversary: "#d8c898",
  daily: "#98b8a0",
};

function groupByYear(items: typeof timeline) {
  const groups: Record<number, typeof timeline> = {};
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
```

Need to add fadeIn keyframe to globals.css:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

### Task 14: 回忆相册页面

**Files:**
- Create: `src/app/gallery/page.tsx`
- Create: `src/components/ui/Lightbox.tsx`

- [ ] **Step 1: 写入 Lightbox.tsx**

```tsx
"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const photo = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center z-10"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center z-10"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Image placeholder */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-[90vw] max-h-[70vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-64 h-64 rounded-2xl flex items-center justify-center text-6xl mx-auto"
            style={{
              background: "linear-gradient(135deg, #f0e8d8, #e8d8c8)",
            }}
          >
            {photo.title.slice(0, 2)}
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-sm font-bold">{photo.title}</p>
            <p className="text-white/50 text-xs mt-1">{photo.description}</p>
            <p className="text-white/30 text-[10px] mt-1">{photo.date}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: 写入 gallery/page.tsx**

```tsx
"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Lightbox from "@/components/ui/Lightbox";
import gallery from "@/data/gallery.json";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const years = [...new Set(gallery.map((p) => p.year))].sort((a, b) => b - a);
  const [filterYear, setFilterYear] = useState<number | null>(null);

  const filtered = filterYear
    ? gallery.filter((p) => p.year === filterYear)
    : gallery;

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="回忆相册" subtitle="Gallery" />

      {/* Year Filter */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilterYear(null)}
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
            filterYear === null
              ? "bg-[#5a7a98] text-white"
              : "bg-warm-cream text-[#8a98a8] border border-warm-sand"
          }`}
        >
          全部
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setFilterYear(year)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
              filterYear === year
                ? "bg-[#5a7a98] text-white"
                : "bg-warm-cream text-[#8a98a8] border border-warm-sand"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() =>
                setLightboxIndex(gallery.findIndex((p) => p.id === photo.id))
              }
              className="rounded-small overflow-hidden cursor-pointer active:scale-95 transition-transform aspect-square flex items-center justify-center text-3xl"
              style={{
                background: `linear-gradient(135deg, hsl(${idx * 40 + 30}, 30%, 85%), hsl(${idx * 40 + 30}, 25%, 78%))`,
              }}
            >
              {photo.title.slice(0, 2)}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + gallery.length) % gallery.length
            )
          }
          onNext={() =>
            setLightboxIndex((lightboxIndex + 1) % gallery.length)
          }
        />
      )}
    </div>
  );
}
```

---

### Task 15: 甜蜜语录页面

**Files:**
- Create: `src/app/quotes/page.tsx`

- [ ] **Step 1: 写入 quotes/page.tsx**

```tsx
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
```

---

### Task 16: 愿望清单页面

**Files:**
- Create: `src/app/wishlist/page.tsx`

- [ ] **Step 1: 写入 wishlist/page.tsx**

```tsx
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
        {/* Pending */}
        {pending.map((item) => (
          <div
            key={item.id}
            className="rounded-medium p-4 flex items-center gap-3 border border-dashed border-[#d8c8d8]"
            style={{
              background: "linear-gradient(135deg, #f8f4f8, #faf6fa)",
            }}
          >
            <span className="text-2xl">⭐</span>
            <div className="flex-1">
              <p className="text-sm text-[#6a5a7a] font-bold">{item.title}</p>
              <p className="text-[10px] text-[#a090b0]">待实现 🌟</p>
            </div>
          </div>
        ))}

        {/* Separator */}
        {completed.length > 0 && pending.length > 0 && (
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-warm-sand" />
            <span className="text-[10px] text-[#c0b0a0]">已完成</span>
            <div className="flex-1 h-px bg-warm-sand" />
          </div>
        )}

        {/* Completed */}
        {completed.map((item) => (
          <div
            key={item.id}
            className="rounded-medium p-4 flex items-center gap-3 bg-[#f5f2ec] border border-warm-sand"
          >
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <p className="text-sm text-[#5a6a78] font-bold line-through decoration-[#c0c0c0]">
                {item.title}
              </p>
              <p className="text-[10px] text-[#b0a090]">
                已完成 · {item.completedDate ? formatDate(item.completedDate) : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Task 17: 情书抽屉页面

**Files:**
- Create: `src/app/letters/page.tsx`

- [ ] **Step 1: 写入 letters/page.tsx**

```tsx
"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import letters from "@/data/letters.json";

export default function LettersPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="情书抽屉" subtitle="Letters" />

      <div className="px-4 py-6 flex flex-col gap-3">
        {letters.map((letter) => {
          const isOpen = openId === letter.id;

          return (
            <div key={letter.id}>
              {/* Envelope Button */}
              <button
                onClick={() => setOpenId(isOpen ? null : letter.id)}
                className="w-full bg-white rounded-card p-4 flex items-center gap-3 border border-[#eee] shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="text-3xl">💌</span>
                <div className="flex-1 text-left">
                  <p className="text-sm text-[#5a6a78] font-bold">{letter.title}</p>
                  <p className="text-[10px] text-[#b0a090]">
                    {formatDate(letter.date)}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-[#c0c0c0]" />
                </motion.div>
              </button>

              {/* Letter Content */}
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
                        background:
                          "linear-gradient(180deg, #fdfaf5 0%, #faf6f0 100%)",
                        backgroundImage:
                          "repeating-linear-gradient(transparent, transparent 23px, rgba(180,160,140,0.15) 23px, rgba(180,160,140,0.15) 24px)",
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
```

---

### Task 18: 足迹地图页面

**Files:**
- Create: `src/app/map/page.tsx`

- [ ] **Step 1: 写入 map/page.tsx**

```tsx
"use client";

import PageHeader from "@/components/ui/PageHeader";
import { formatDate } from "@/lib/utils";
import footprints from "@/data/footprints.json";

export default function MapPage() {
  const { cities, totalKm, nextDestination } = footprints;

  return (
    <div className="min-h-[100dvh] bg-warm-base">
      <PageHeader title="足迹地图" subtitle="Footprints" />

      {/* Mini Map */}
      <div className="px-4 pt-6">
        <div
          className="relative rounded-card overflow-hidden border border-[#e8e0d5]"
          style={{
            background:
              "linear-gradient(135deg, #e8ecf0 0%, #dce4ec 30%, #e0e8f0 60%, #d8e0e8 100%)",
            height: "240px",
          }}
        >
          {/* Route lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M62 30 Q70 35 72 52 Q68 55 68 58 Q66 60 70 42 Q68 50 66 68"
              fill="none"
              stroke="rgba(150,150,150,0.25)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          </svg>

          {/* City markers */}
          {cities.map((city) => (
            <div
              key={city.id}
              className="absolute flex flex-col items-center"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: city.color,
                  boxShadow: `0 0 8px ${city.color}60`,
                }}
              />
              <span className="text-[8px] text-[#5a6a78] mt-0.5 whitespace-nowrap font-medium">
                {city.name}
              </span>
            </div>
          ))}

          {/* Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] text-[#8a98a8]">
              已探索 {cities.length} 座城市
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4 flex gap-3">
        <div className="flex-1 warm-card p-4 text-center">
          <p className="text-[10px] text-[#b0a090] mb-1">下一站</p>
          <p className="text-lg text-[#5a7a98] font-bold font-serif">
            🏔️ {nextDestination}
          </p>
        </div>
        <div className="flex-1 warm-card p-4 text-center">
          <p className="text-[10px] text-[#b0a090] mb-1">累计里程</p>
          <p className="text-lg text-[#5a7a98] font-bold font-serif">
            {totalKm.toLocaleString()}km
          </p>
        </div>
      </div>

      {/* City List */}
      <div className="px-4 py-6">
        <h3 className="text-xs text-[#b0a090] font-bold tracking-wider uppercase mb-3">
          探索记录
        </h3>
        <div className="flex flex-col gap-2">
          {cities.map((city) => (
            <div
              key={city.id}
              className="flex items-center gap-3 bg-white rounded-medium p-3 border border-[#eee]"
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: city.color,
                  boxShadow: `0 0 6px ${city.color}60`,
                }}
              />
              <span className="text-sm text-[#5a6a78] font-medium">
                {city.name}
              </span>
              <span className="text-[10px] text-[#b0a090] ml-auto">
                {formatDate(city.date)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 6: 根布局

### Task 19: 根布局 layout.tsx

**Files:**
- Rewrite: `src/app/layout.tsx`
- Modify: `src/app/globals.css` — add fadeIn keyframe

- [ ] **Step 1: Rewrite layout.tsx**

```tsx
import type { Metadata, Viewport } from "next";
import StarField from "@/components/ui/StarField";
import "./globals.css";

export const metadata: Metadata = {
  title: "蔚蓝时光",
  description: "记录我们的美好恋爱时光",
  icons: { icon: "💙" },
  openGraph: {
    title: "蔚蓝时光",
    description: "记录我们的美好恋爱时光",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d1a2e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-night-base text-starlight font-sans overflow-x-hidden min-h-[100dvh]">
        <StarField />
        {/* Max-width container for mobile-first, centered on desktop */}
        <div className="relative z-[1] max-w-md mx-auto min-h-[100dvh]">
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Append fadeIn keyframe to globals.css**

Append to end of `src/app/globals.css`:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Phase 7: 验证与部署

### Task 20: 开发验证

- [ ] **Step 1: 启动开发服务器**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
pnpm dev
```

- [ ] **Step 2: 验证所有页面**

在浏览器中打开以下地址，逐页检查：
- http://localhost:3000 — 首页（天数动画、导航卡片、音乐条）
- http://localhost:3000/timeline — 时光日记时间轴
- http://localhost:3000/gallery — 相册网格 + Lightbox
- http://localhost:3000/quotes — 语录卡片 + 随机功能
- http://localhost:3000/wishlist — 愿望清单
- http://localhost:3000/letters — 情书展开/收起
- http://localhost:3000/map — 足迹地图

使用 Chrome DevTools 切换到移动端视图（iPhone 14 Pro, 390x844）确认布局正确。

- [ ] **Step 3: 生产构建验证**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
pnpm build
```

Expected: Build 成功，无 TypeScript 错误，所有页面静态生成。

---

### Task 21: Git 与 GitHub

- [ ] **Step 1: 创建 .gitignore**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
cat > .gitignore << 'EOF'
node_modules/
.next/
out/
.env*
EOF
```

- [ ] **Step 2: Git init 并首次提交**

```bash
cd C:/Users/Administrator/.claude/projects/love-story
git init
git add .
git commit -m "feat: love story app - initial version"
```

- [ ] **Step 3: 推送到 GitHub**

在 GitHub 上创建新仓库 `love-story`，然后：
```bash
git remote add origin https://github.com/<your-username>/love-story.git
git branch -M main
git push -u origin main
```

---

### Task 22: Vercel 部署

- [ ] **Step 1: 在 vercel.com 导入项目**

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "New Project" → Import `love-story` 仓库
4. 框架自动检测为 Next.js
5. 点击 "Deploy"

- [ ] **Step 2: 确认部署**

部署完成后获得 URL（如 `love-story.vercel.app`），在手机浏览器打开验证。

**后续更新流程：**
1. 修改 `src/data/` 下的 JSON 或添加照片
2. `git add . && git commit -m "update: xxx" && git push`
3. Vercel 自动重新部署，无需手动操作

---

## 总结

| 阶段 | 任务 | 内容 |
|------|------|------|
| Phase 1 | Task 1-2 | Next.js 脚手架 + Tailwind 配置 + 全局样式 |
| Phase 2 | Task 3 | 7 个 JSON 数据文件（示例内容） |
| Phase 3 | Task 4-9 | 6 个共享 UI 组件 |
| Phase 4 | Task 10-12 | 首页（Hero + NavGrid + MusicBar） |
| Phase 5 | Task 13-18 | 6 个内页 |
| Phase 6 | Task 19 | 根布局 + metadata |
| Phase 7 | Task 20-22 | 验证 + Git + Vercel 部署 |

**总计 22 个任务，预计 2-3 小时完成。**
