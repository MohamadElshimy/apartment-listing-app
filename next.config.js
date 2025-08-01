/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    optimizeFonts: false,
  },
};

module.exports = nextConfig;