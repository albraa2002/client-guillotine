import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "framer-motion",
      "@radix-ui/react-icons",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
