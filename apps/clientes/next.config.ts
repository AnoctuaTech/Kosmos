import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  transpilePackages: ["@kosmos/ui", "@kosmos/types", "@kosmos/mock-data"],
  ...(isGithubPages && {
    output: "export",
    basePath: "/Kosmos/clientes",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
