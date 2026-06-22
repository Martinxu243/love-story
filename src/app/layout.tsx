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
