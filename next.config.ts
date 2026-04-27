import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SWR and optimizations
  swcMinify: true,
  
  // Enable production source maps (disable in production for smaller bundles)
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    optimization: 'auto',
    remotePatterns: [],
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    // Tree shaking optimizations
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
    };

    return config;
  },

  // Enable Middleware caching
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
