// Basis-URL für absolute Adressen in Metadaten, Sitemap und robots.txt.
// Auf Vercel wird die Produktionsdomain automatisch erkannt. Eine eigene
// Domain kann über NEXT_PUBLIC_SITE_URL gesetzt werden (mit oder ohne https://).

const configured = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "")
).replace(/\/+$/, "");

function toSiteUrl(value: string): URL {
  if (!value) return new URL("http://localhost:3000");
  try {
    return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    // Eine fehlerhaft gesetzte Umgebungsvariable darf den Build nicht abbrechen.
    return new URL("http://localhost:3000");
  }
}

export const siteUrl = toSiteUrl(configured);
