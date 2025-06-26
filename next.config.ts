import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'https://testing-api.ru-rating.ru/*',
      },
      {
        hostname: 'https://ru-msk-dr3-1.store.cloud.mts.ru/*'
      },
      {
        hostname: 'ru-msk-dr3-1.store.cloud.mts.ru'
      }
    ],
  },
};

export default nextConfig;
