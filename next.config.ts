import type { NextConfig } from "next";

const isDevelopmentMode = process.env.NEXT_PUBLIC_APP_ENV === "develop";

const nextConfig: NextConfig = {
  // Quitamos los logs en PRODUCTION para que quede mas limpio
  // pero si estamos en local los dejamos para debugear
  compiler: {
    removeConsole: isDevelopmentMode ? false : { exclude: ["error"] },
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
