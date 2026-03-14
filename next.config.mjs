/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ipfs.io' },
      { protocol: 'https', hostname: '*.ipfs.nftstorage.link' },
      { protocol: 'https', hostname: 'gateway.pinata.cloud' },
      { protocol: 'https', hostname: '*.ipfs.io' },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, net: false, tls: false, crypto: false,
      stream: false, url: false, zlib: false, http: false,
      https: false, assert: false, os: false, path: false,
    };
    return config;
  },
};

export default nextConfig;
