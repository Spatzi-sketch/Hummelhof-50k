import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/shared";
import { event } from "@/config/event";
import { siteUrl } from "@/config/site";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${event.name} | ${event.shortName}`,
    template: `%s | ${event.shortName}`,
  },
  description: `50 Kilometer, 50 Runden, ein gemeinsamer Lauftag. Am ${event.dateLong} am Hummelhof. Entdecke die Community-Challenge.`,
  openGraph: {
    title: `${event.name} | ${event.shortName}`,
    description: `Am ${event.dateLong}: 50 Kilometer gemeinsam am Hummelhof.`,
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 500,
        height: 500,
        alt: event.shortName,
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
