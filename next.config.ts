import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // All event images are local; no remote image hosts are required.
};

export default nextConfig;
