import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'https://drive.google.com',
      },
      {
        hostname: "hclqaacbuwpekuiruzzl.supabase.co"
      },
      {
        hostname: "cryptoicons.org"
      }
    ],
  },
};

export default nextConfig;
