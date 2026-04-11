import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@heroui/react", "lucide-react"],
  },
  // Headers de seguridad, redirects, etc.
};

export default nextConfig;
