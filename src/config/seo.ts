import type { Metadata } from "next";
import { event } from "./event";
import { siteUrl } from "./site";

// Einheitliche Seitentitel, Beschreibungen und Social-Metadaten.
// Die Texte werden in den jeweiligen Seiten übergeben.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // Bewusst ein absoluter Titel: Auf der Startseite wird die title.template
  // des Root-Layouts nicht angewandt, auf Unterseiten schon. So sind alle
  // Seitentitel identisch aufgebaut.
  const fullTitle = `${title} | ${event.shortName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: new URL(path, siteUrl).toString(),
      siteName: `${event.name} | ${event.shortName}`,
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
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}
