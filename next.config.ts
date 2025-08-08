import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [new URL("http://localhost:4000/**")],
  },
};

export default nextConfig;
