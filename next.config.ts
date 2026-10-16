import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote photography is served through the Unsplash CDN (auto AVIF/WebP + responsive widths).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
