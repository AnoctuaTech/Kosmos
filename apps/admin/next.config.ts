import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kosmos/ui", "@kosmos/types", "@kosmos/mock-data"],
};

export default nextConfig;
