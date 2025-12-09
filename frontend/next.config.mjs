

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maximumsavings.co.uk',
        port: '',
        pathname: '/media/**',
      },
    ],

    domains: ['maximumsavings.co.uk'],
  },
};

export default nextConfig;
