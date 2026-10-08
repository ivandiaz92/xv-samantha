import type { NextConfig } from "next";

/**
 * For rendevu.mx/xv-samantha set:
 *   NEXT_PUBLIC_BASE_PATH=/xv-samantha
 * Leave empty for local dev or a dedicated subdomain later.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
