/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/endpoints',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/endpoints',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/moxy/:rest*',
        destination: '/api/moxy/:rest*',
      },
    ];
  },
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = (phase, { defaultConfig }) => {
  return nextConfig;
};
