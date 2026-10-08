import type { NextConfig } from "next";

/**
 * Local: no basePath.
 * GitHub Pages / rendevu path deploy:
 *   NEXT_PUBLIC_BASE_PATH=/xv-samantha
 *   GITHUB_PAGES=true  → static `out/` export
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const isStaticExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  ...(isStaticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
