import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/love-story",
  images: { unoptimized: true },
};

export default nextConfig;
