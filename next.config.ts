import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.convex.cloud", // Menjangkau SEMUA subdomain Convex secara otomatis
      },
      {
        protocol: "https",
        hostname: "*.convex.site", // Mendukung file HTTP actions dari Convex jika ada
      },
    ],
  },
};

export default nextConfig;