/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Mark optional email dependencies as external to prevent bundling errors
    // These are only loaded dynamically when EMAIL_PROVIDER is configured
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('resend', '@sendgrid/mail', 'nodemailer')
    }
    return config
  }
}

module.exports = nextConfig
