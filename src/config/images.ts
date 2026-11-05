export type EventImage = {
  src: string;
  alt: string;
  position: string;
  placeholder?: boolean;
};
export const images = {
  logo: {
    src: "/images/logo.png",
    alt: "Hummelhof 50K – laufende Hummel",
    position: "center",
  },
  hero: {
    src: "/images/hero.svg",
    alt: "Illustrativer Fotoplatzhalter: Waldweg in ruhigen Grüntönen, kein Abbild der Strecke",
    position: "center",
    placeholder: true,
  },
  location: {
    src: "/images/event-location.svg",
    alt: "Illustrativer Platzhalter für ein zukünftiges Foto der Runde am Hummelhof",
    position: "center",
    placeholder: true,
  },
  detail: {
    src: "/images/running-detail.svg",
    alt: "Illustrativer Platzhalter für ein Laufdetail",
    position: "center",
    placeholder: true,
  },
  community: {
    src: "/images/community.svg",
    alt: "Illustrativer Platzhalter für ein zukünftiges Community-Foto",
    position: "center",
    placeholder: true,
  },
  about: {
    src: "/images/about-event.svg",
    alt: "Illustrativer Platzhalter für ein persönliches Foto vom Lauf",
    position: "center",
    placeholder: true,
  },
} satisfies Record<string, EventImage>;
