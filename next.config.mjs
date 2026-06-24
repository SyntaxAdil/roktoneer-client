/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["@better-auth/kysely-adapter"],
  // },
};

export default nextConfig;
