/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/782dssjt/**",
      },
      {
        protocol: "https",
        hostname: "cdn.brijesh.dev",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
