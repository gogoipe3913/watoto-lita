// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // basePath / assetPrefix / trailingSlash はホスティング都合で必要なら設定
};

export default nextConfig;
