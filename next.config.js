const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

