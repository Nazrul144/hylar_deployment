// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//     domains: ['13.61.254.207'], // backend domain
//   },
  
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.61.254.207',
        port: '',
        pathname: '/media/**',
      },
    ],
    // Fallback for older Next.js versions
    domains: ['13.61.254.207'],
  },
};

export default nextConfig;