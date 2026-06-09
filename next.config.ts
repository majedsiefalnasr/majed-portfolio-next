import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local decorative SVGs (e.g. hero doodles) are first-party + trusted.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
