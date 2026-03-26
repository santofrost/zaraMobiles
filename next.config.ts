import type { NextConfig } from "next";

const isDevelopmentMode = process.env.NEXT_PUBLIC_APP_ENV === "develop";

const nextConfig: NextConfig = {
  // Explicitly control React Compiler / SWC Minification globally
  // Next.js normally defaults this to true on production builds only,
  // but we mandate it per the environment variable.
  compiler: {
    removeConsole: isDevelopmentMode ? false : { exclude: ["error"] },
  },
  // In development mode, we prefer unminified readable assets
  // In production mode, we want heavily concatenated and minified assets
  webpack: (config) => {
    if (isDevelopmentMode) {
      config.optimization.minimize = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
      },
      {
        protocol: "https",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
      },
    ],
  },
};

export default nextConfig;
