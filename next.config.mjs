/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_KEY_DADATA: process.env.API_KEY_DADATA,
  }
};

export default nextConfig;
