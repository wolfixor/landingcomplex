import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['randomuser.me'],
  },
};

export default nextConfig;
