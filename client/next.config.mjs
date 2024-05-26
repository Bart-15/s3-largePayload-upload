/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'largefile-bucket-dev.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
