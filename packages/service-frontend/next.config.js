/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
  },
  transpilePackages: ['@ppoba/ui', '@ppoba/tailwind-config']
};

module.exports = nextConfig;
