/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats (AVIF then WebP) for better compression
    formats: ["image/avif", "image/webp"],

    // Breakpoints matching Tailwind's responsive scale
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],

    // Remote image hosts
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
    ],

    // Serve images from the built-in Next.js optimiser
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compress responses
  compress: true,

  // Keep bundle IDs stable across builds to improve cache hits
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
