import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image throws for any external host that isn't explicitly
    // allow-listed. Mentor avatars aren't hosted on a fixed domain yet
    // (mock data ships empty avatar strings), so allow any HTTPS host for
    // now. Once mentor photos have a settled home (e.g. Supabase Storage,
    // a specific CDN), narrow this to that hostname.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
