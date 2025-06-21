/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    inlineCss: true,
  },
  // Generate unique build IDs to prevent caching issues
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Prevent caching of HTML pages (only in production)
          ...(isProduction ? [{
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          }] : []),
        ]
      },
      {
        // Cache static assets (images, fonts, etc.) but allow updates
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$',
        headers: [
          {
            key: 'Cache-Control',
            value: isProduction ? 'public, max-age=31536000, immutable' : 'no-cache',
          },
        ],
      },
      {
        // Cache JS/CSS but allow updates with versioning
        source: '/(.*)\\.(js|css)$',
        headers: [
          {
            key: 'Cache-Control',
            value: isProduction ? 'public, max-age=31536000, immutable' : 'no-cache',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;",
          }
        ]
      },
      {
        // API routes should not be cached
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  }
}

export default nextConfig
