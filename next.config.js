/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/kigox",
  assetPrefix: process.env.NODE_ENV === "production" ? "/kigox" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
