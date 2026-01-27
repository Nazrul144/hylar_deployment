

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.12.95',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    dangerouslyAllowLocalIP: true
  },
};

export default nextConfig;
