import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/**`)],
  },
  headers: async () => {
    return [
      {
        source: "/login",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
};

export default nextConfig;
