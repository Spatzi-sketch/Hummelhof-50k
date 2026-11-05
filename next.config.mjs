/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  // Alle Bilder liegen lokal in public/images/. Next.js optimiert sie aus.
  // Es werden keine externen Bild-Hosts, API-Schlüssel oder Server benötigt.
};

export default nextConfig;
