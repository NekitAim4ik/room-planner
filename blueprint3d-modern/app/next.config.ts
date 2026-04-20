import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'framer-motion',
      'sonner',
      'zustand'
    ]
  },

  images: {
    unoptimized:true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.archybase.com',
        pathname: '**'
      }
    ]
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@blueprint3d': path.resolve(__dirname, '../src'),
      // Resolve three.js and animejs from app's node_modules
      // (src/ is outside app/ so webpack needs an explicit path)
      'three': path.resolve(__dirname, 'node_modules/three'),
      'animejs': path.resolve(__dirname, 'node_modules/animejs')
    }
    // Let webpack resolve modules from app's node_modules for files outside app/
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false
      }
      config.resolve.alias = {
        ...config.resolve.alias,
        'next-intl': path.resolve(__dirname, 'lib/mock-next-intl'),
        'next-intl/navigation': path.resolve(__dirname, 'lib/mock-next-intl'),
        'next-intl/server': path.resolve(__dirname, 'lib/mock-next-intl'),
        'next-intl/routing': path.resolve(__dirname, 'lib/mock-next-intl'),
      };
    }

    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        'three'
      ]
    }

    return config
  }
}

export default nextConfig
