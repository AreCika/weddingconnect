import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Gallery photo URLs come from wedding-supplied content (arbitrary
    // hosts — Supabase storage, any CDN a couple used), so the allowed
    // host set can't be pinned down in advance.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
