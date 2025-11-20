import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/storybook',
        destination: '/storybook/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
