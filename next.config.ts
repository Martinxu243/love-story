import type { NextConfig } from "next";

const isStatic = process.env.NEXT_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {}),
  basePath: isStatic ? "/love-story" : "",
};

export default nextConfig;
