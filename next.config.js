/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://nid.naver.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
