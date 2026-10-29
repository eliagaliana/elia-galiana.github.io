import type { NextConfig } from "next";

// GitHub Pages sirve el sitio en https://eliagaliana.github.io/elia-galiana.github.io/
// Si algún día se mueve a un dominio propio, deja BASE_PATH vacío.
const basePath = process.env.BASE_PATH ?? "/elia-galiana.github.io";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
