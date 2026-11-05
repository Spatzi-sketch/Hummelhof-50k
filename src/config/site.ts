// Optional nach Domain-Zuweisung in Vercel: NEXT_PUBLIC_SITE_URL=https://deine-domain.at
const host =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
export const siteUrl = new URL(host);
