/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Netlify function size limits
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@swc/core-darwin-x64',
        'node_modules/@swc/core-darwin-arm64',
        'node_modules/@swc/core-win32-x64-msvc',
        'node_modules/@esbuild/linux-x64',
        'node_modules/@esbuild/darwin-x64',
        'node_modules/@esbuild/darwin-arm64',
        'node_modules/@esbuild/win32-x64',
        'node_modules/@next/swc-linux-x64-gnu',
        'node_modules/@next/swc-linux-x64-musl',
        'node_modules/@next/swc-darwin-x64',
        'node_modules/@next/swc-darwin-arm64',
        'node_modules/@next/swc-win32-x64-msvc',
        'node_modules/webpack',
        'node_modules/terser',
      ],
    },
  },
  // Use static export to avoid serverless functions entirely
  output: 'export',
}

module.exports = nextConfig
