// // /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://store.steampowered.com/api/:path*', // Proxy to external API
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
        child_process: false,
        dgram: false,
        dns: false,
        http2: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;

