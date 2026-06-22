# Love Story — 恋爱记录小屋 设计规范

> 为女朋友打造的手机优先、温馨治愈风格的恋爱记录 Web 应用。
> 创建日期: 2026-06-22

---

## 1. 项目概述

### 1.1 目标

一个移动端优先的网页应用，由男方维护内容（回忆、照片、语录等），女方通过手机浏览器随时访问浏览。像一份持续更新的数字情书。

### 1.2 核心原则

- **手机优先** — 所有设计和交互以 375-414px 宽度的移动端为基准
- **温暖治愈** — 深蓝夜空为基调，注入天蓝渐变光晕和暖白点缀
- **高级精致** — 毛玻璃、微动画、精致排版，不幼稚不廉价
- **内容驱动** — 改 Markdown/JSON 即可更新，无需 CMS

---

## 2. 视觉设计

### 2.1 色彩系统

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景主色 | `#0d1a2e` → `#1e3250` | 深蓝夜空渐变 |
| Hero 光晕 | `rgba(120,170,210,0.25)` | 天蓝渐变过渡 |
| 卡片底色 | `rgba(255,255,255,0.04-0.08)` | 半透明毛玻璃 |
| 卡片边框 | `rgba(255,255,255,0.08-0.12)` | 微弱白边 |
| 主文字 | `#c8d8f0` / `#b0c0d8` | 浅蓝白 |
| 辅助文字 | `#8090b0` / `#7080a0` | 中蓝灰 |
| 暖色点缀 | `#f5f2ec` / `#e8e0d5` | 暖白/米色（列表页内容区） |
| 强调色 | `#7aa8c8` / `#b0c8e0` | 柔和蓝（节点、按钮） |
| 渐变文字 | `#f0f4fa` → `#8098b8` | 大号数字专用 |

**日间模式：** 在 Hero 区域保留天蓝过渡，下方内容区切换为暖白底（`#faf8f6`），卡片变为白色 `#fff` 配浅色边框。

### 2.2 字体

| 用途 | 字体 | 备选 |
|------|------|------|
| 英文装饰 / 数字 | Georgia, 'Times New Roman', serif | |
| 中文正文 | 系统默认中文字体 | 'PingFang SC', 'Microsoft YaHei', sans-serif |
| 英文标签 | 系统默认 | -apple-system, sans-serif |

### 2.3 圆角与间距

- 大卡片: `border-radius: 18-22px`
- 中等卡片: `border-radius: 14-16px`
- 小元素: `border-radius: 10-12px`
- 页面内边距: `16-20px`
- 卡片间距: `8-14px`

### 2.4 氛围元素

- **星空** — 页面散落随机位置的半透明星星（`✦`），`opacity: 0.15-0.3`
- **云朵** — Hero 区域漂浮 2-3 朵 `☁️`，`opacity: 0.35-0.6`
- **心跳曲线** — 天数下方 SVG 波形线，`stroke: rgba(180,200,225,0.3)`
- **毛玻璃** — `backdrop-filter: blur(8-12px)` 用于导航卡片和音乐条

---

## 3. 页面结构

### 3.1 首页 (Home)

**布局顺序（从上到下）：**
1. 状态栏区域
2. Hero 区域 — 天蓝光晕 + 英文标签 "Since YYYY.MM.DD" + 标题"蔚蓝时光"
3. 天数展示 — 毛玻璃悬浮卡片，大号渐变数字 + "天" + 心跳曲线
4. 每日情话 — 圆角 chip，如 "💙 每一天都是心动"
5. 主入口（2个大卡片横排）— 📖 时光日记 + 🖼️ 回忆相册
6. 辅助入口（4个小格）— 💬 语录 / 🎯 愿望 / 💌 情书 / 🗺️ 足迹
7. 音乐播放条 — 常驻底部

**交互：** 天数入场时数字滚动动画（count-up），各卡片点击进入对应页面，页面切换有 fade+slide 过渡。

### 3.2 时光日记 (Timeline)

- 垂直时间轴布局，左侧竖线（渐变色），节点为彩色圆点
- 每条包含：日期 → 标题 → 简短描述
- 不同事件类型用不同节点颜色：
  - 粉色 `#e8a0b0` = 甜蜜时刻
  - 蓝色 `#7aa8c8` = 旅行/出行
  - 金色 `#d8c898` = 纪念日
  - 绿色 `#98b8a0` = 日常小确幸
- 底部"加载更多"按钮
- 支持年份分组标题

### 3.3 回忆相册 (Gallery)

- 3列瀑布流网格（`grid-template-columns: 1fr 1fr 1fr`）
- 图片圆角 `border-radius: 10px`
- 点击图片 → 全屏查看（带遮罩层，可左右滑动）
- 全屏模式下底部显示日期和简短描述
- 支持"按年份筛选"标签栏

### 3.4 甜蜜语录 (Quotes)

- 卡片式列表，每张卡片有：
  - 大号左引号装饰（`"`）
  - 语录正文（斜体）
  - 右下角来源 + 日期
- 卡片背景有微妙色彩变化（轮流使用3-4种暖色调）
- 支持随机显示一条（摇一摇/点击按钮）

### 3.5 愿望清单 (Wishlist)

- 已完成：✅ 绿色勾 + 删除线文字
- 待实现：⭐ 星标 + 虚线边框
- 背景区分：已完成用暖灰，待实现用淡紫/淡蓝
- 底部"添加愿望"按钮

### 3.6 情书抽屉 (Letters)

- 信封式列表，每封显示：
  - 💌 图标
  - 标题（如"第一封信"）
  - 日期
  - 🔒 点击开启 — 展开后显示完整信件内容（信封打开动画）
- 内容区有信纸质感背景（淡米色 + 细线格）

### 3.7 足迹地图 (Footprints)

- 简化版地图示意（非真实地图，用 CSS 绘制）
- 已去过的城市标记为彩色圆点
- 圆点之间用虚线连接，形成路线
- 底部统计卡片：已探索 N 座城市 + 累计里程
- "下一站"预告卡片

---

## 4. 技术架构

### 4.1 技术栈

| 层 | 选择 | 版本 |
|----|------|------|
| 框架 | Next.js | 14+ (App Router) |
| 样式 | Tailwind CSS | 3.x |
| 动画 | Framer Motion | 10+ |
| 图标 | Emoji + Lucide React | — |
| 内容存储 | JSON/Markdown 文件 | — |
| 部署 | Vercel | 免费版 |
| 包管理 | pnpm | — |

### 4.2 项目结构

```
love-story/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局（metadata, 全局样式）
│   │   ├── page.tsx            # 首页
│   │   ├── timeline/page.tsx   # 时光日记
│   │   ├── gallery/page.tsx    # 回忆相册
│   │   ├── quotes/page.tsx     # 甜蜜语录
│   │   ├── wishlist/page.tsx   # 愿望清单
│   │   ├── letters/page.tsx    # 情书抽屉
│   │   └── map/page.tsx        # 足迹地图
│   ├── components/
│   │   ├── ui/                 # 通用 UI 组件
│   │   │   ├── GlassCard.tsx
│   │   │   ├── DayCounter.tsx
│   │   │   ├── MusicBar.tsx
│   │   │   ├── HeartbeatLine.tsx
│   │   │   ├── StarField.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── BackButton.tsx
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       └── NavGrid.tsx
│   ├── data/                   # 内容数据
│   │   ├── timeline.json
│   │   ├── gallery.json
│   │   ├── quotes.json
│   │   ├── wishlist.json
│   │   ├── letters.json
│   │   ├── footprints.json
│   │   └── config.json         # 全局配置（纪念日、歌曲等）
│   └── lib/
│       └── utils.ts
├── public/
│   └── photos/                 # 照片存放
├── tailwind.config.ts
└── package.json
```

### 4.3 数据模型

**config.json:**
```json
{
  "title": "蔚蓝时光",
  "startDate": "2023-06-15",
  "dailyQuote": "每一天都是心动",
  "music": {
    "title": "Perfect",
    "artist": "Ed Sheeran",
    "url": "/music/song.mp3"
  }
}
```

**timeline.json:**
```json
[
  {
    "id": "1",
    "date": "2023-06-15",
    "title": "初次相遇",
    "description": "在那个阳光正好的午后...",
    "type": "love",
    "photo": "/photos/first-meet.jpg"
  }
]
```

### 4.4 路由与导航

- 使用 Next.js App Router 的文件系统路由
- 页面切换: Framer Motion `AnimatePresence` 实现 fade+slide
- 每个内页顶部有统一的 `<PageHeader>` 组件（返回按钮 + 标题）
- 音乐播放条在首页常驻，内页可选显示

---

## 5. 动画规范

| 场景 | 动画 | 时长 |
|------|------|------|
| 天数入场 | count-up 数字滚动 | 1.5s |
| 页面切换 | fade(0→1) + slideUp(20px→0) | 0.4s |
| 卡片 hover | scale(1.02) + shadow increase | 0.2s |
| 时间轴节点 | 顺序 fadeIn，stagger 0.1s | 0.3s each |
| 情书开启 | 信封翻转 + 内容展开 | 0.5s |
| 照片全屏 | scale + fade 进入 | 0.3s |
| 语录随机 | card flip | 0.4s |
| 星空背景 | 缓慢闪烁（CSS animation） | 3-6s loop |
| 心跳曲线 | 线条 pulse + 心形缩放 | 2s loop |

---

## 6. 部署方案

- **平台:** Vercel (Hobby 免费版)
- **域名:** `our-blue-moments.vercel.app`（可绑定自定义域名）
- **更新流程:** 
  1. 修改 `src/data/` 下的 JSON 文件
  2. 添加照片到 `public/photos/`
  3. `git commit && git push`
  4. Vercel 自动构建部署

---

## 7. 不做的事 (Non-Goals)

- 不需要用户登录/注册系统
- 不需要数据库或后端 API
- 不需要评论/互动功能
- 不需要 PWA 离线能力（V1 阶段）
- 不需要管理后台 — 直接改文件即可

---

## 8. 设计检查清单

- [x] 手机优先（375px 基准）
- [x] 深蓝夜幕 + 天蓝渐变 + 暖白点缀三色融合
- [x] 毛玻璃卡片 + 星空 + 云朵 + 心跳 + 音乐五大氛围元素
- [x] 首页：Hero + 天数 + 大卡片 + 小网格 + 音乐条
- [x] 时光日记：时间轴 + 彩色节点
- [x] 回忆相册：3列网格 + 全屏查看
- [x] 甜蜜语录：卡片列表 + 随机展示
- [x] 愿望清单：已完成/待实现区分
- [x] 情书抽屉：信封列表 + 开启动画
- [x] 足迹地图：简化地图 + 标记路线
- [x] 内容纯 JSON/Markdown，无 CMS
- [x] Next.js + Vercel 免费部署
