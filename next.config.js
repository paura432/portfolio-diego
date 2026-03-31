/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    /** Visitas repetidas: el servidor cachea variantes optimizadas más tiempo */
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1280, 1536],
  },
  // Permitir importar JSON directamente
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
}

module.exports = nextConfig
