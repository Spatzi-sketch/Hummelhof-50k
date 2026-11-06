// Zentrale Bildverwaltung: Pfade, Alt-Texte und Bildausschnitte.
// Komponenten verwenden AUSSCHLIESSLICH diese Einträge.
// "position" steuert object-fit: cover (z. B. "center 60%" oder "40% center").

export type EventImage = {
  src: string;
  alt: string;
  position: string;
};

export const images = {
  logo: {
    src: "/images/logo.png",
    alt: "Hummelhof 50K – laufende Hummel",
    position: "center",
  },
  hero: {
    src: "/images/hero.webp",
    alt: "Geschwungener Waldweg mit einer Bank, Bäumen und Sonnenlicht auf dem Boden",
    position: "center 58%",
  },
  about: {
    src: "/images/about.webp",
    alt: "Geschwungener Weg zwischen Bäumen und einer Wiese im Sonnenlicht",
    position: "center 55%",
  },
  location: {
    src: "/images/location.webp",
    alt: "Weg durch eine Grünanlage mit Bäumen, einer Böschung und einer Spielanlage im Hintergrund",
    position: "center 55%",
  },
  community: {
    src: "/images/community.webp",
    alt: "Sonnenlicht fällt durch Bäume auf eine Wiese und einen geschwungenen Weg",
    position: "center 50%",
  },
  sky: {
    src: "/images/sky.webp",
    alt: "Blauer Himmel mit Wolken und Kondensstreifen über dunklen Baumkronen",
    position: "center 38%",
  },
  trail: {
    src: "/images/trail.webp",
    alt: "Schmaler Waldweg im Gegenlicht, umgeben von dichten Bäumen",
    position: "center 62%",
  },
  grove: {
    src: "/images/grove.webp",
    alt: "Tiefstehende Sonne zwischen Laub- und Nadelbäumen über einem Waldweg",
    position: "40% center",
  },
  canopy: {
    src: "/images/canopy.webp",
    alt: "Nebliger Waldweg zwischen Bäumen mit Sonnenstrahlen im Geäst",
    position: "center 58%",
  },
} satisfies Record<string, EventImage>;
