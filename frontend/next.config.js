/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Netlify function size limits
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
}

module.exports = nextConfig
