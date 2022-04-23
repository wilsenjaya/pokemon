/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  script-src 'self' 'unsafe-eval';
  object-src 'none';
  base-uri 'none';
`;

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
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
};

module.exports = nextConfig;
