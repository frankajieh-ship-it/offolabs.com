/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Suppress build warnings that don't affect functionality
  typescript: {
    // Dangerously allow production builds to complete even if there are type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow production builds to complete even if there are lint errors
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
