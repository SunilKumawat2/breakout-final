/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "localhost",
    //   "127.0.0.1",
    //   "192.168.1.100",
    //   "breakout.b-cdn.net",
    //   "breakout.in",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "breakout.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "breakout.in",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  compress: true,
  formats: ["image/avif", "image/webp"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
}
 
export default nextConfig;