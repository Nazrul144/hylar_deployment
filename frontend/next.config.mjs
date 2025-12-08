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
