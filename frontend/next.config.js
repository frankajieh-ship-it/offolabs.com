/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use static export to avoid serverless functions entirely
  output: 'export',
}

module.exports = nextConfig