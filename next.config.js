/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const ContentSecurityPolicy = `
  script-src 'self' 'unsafe-eval';
  object-src 'none';
  base-uri 'none';
`;

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in application
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  formats: ['image/avif', 'image/webp'],
  images: {
    domains: ['raw.githubusercontent.com'],
  },
});

module.exports = nextConfig;
