import Link from "next/link";
import Image from "next/image";
import ConsentSettingsButton from "@/components/ConsentSettingsButton";
import { images, type EventImage } from "@/config/images";
import { event } from "@/config/event";
import { registrationHref } from "@/config/registration";
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button${light ? " button-light" : ""}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Photo({
  image,
  caption,
  className = "",
  priority = false,
}: {
  image: EventImage;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`photo ${className}`}>
      <div className="photo-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 80vw, 1200px"
          style={{ objectFit: "cover", objectPosition: image.position }}
          priority={priority}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
export function Facts() {
  const facts = [
    [event.date, "Der gemeinsame Lauftag"],
    [
      `${event.distance} Kilometer`,
      `${event.loops} Runden · je ${event.loopKm} Kilometer`,
    ],
    [event.location, "Unser Treffpunkt"],
    [`${event.bestTime} Stunden`, "Die persönliche Zeit zu schlagen"],
  ];
  return (
    <div className="facts wrap">
      {facts.map(([title, sub], i) => (
        <div key={title}>
          <span className="fact-number">0{i + 1}</span>
          <strong>{title}</strong>
          <span>{sub}</span>
        </div>
      ))}
    </div>
  );
}
export function Invite() {
  return (
    <section className="invite">
      <div className="wrap invite-inner">
        <div>
          <p className="eyebrow">DEIN WINTER. UNSER LAUFTAG.</p>
          <h2>Du bist dabei?</h2>
          <p>
            Ob du die 50 Kilometer in Angriff nimmst oder die Community
            unterstützt: Wir freuen uns auf dich.
          </p>
        </div>
        <Button href={registrationHref} light>
          Zur Anmeldung
        </Button>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <Link href="/" className="footer-brand">
          <Image
            src={images.logo.src}
            alt={images.logo.alt}
            width={90}
            height={90}
          />
          <div>
            <strong>{event.shortName}</strong>
            <p>Eine Runde. Viele gemeinsame Schritte.</p>
          </div>
        </Link>
        <nav aria-label="Footernavigation">
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href={registrationHref}>Anmeldung ↗</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {event.name}
        </span>
        <ConsentSettingsButton />
        <span>Mit Laufbegeisterung am Hummelhof.</span>
      </div>
    </footer>
  );
}
export function LoopGraphic() {
  return (
    <div
      className="loop-graphic"
      role="img"
      aria-label="50 Runden mit je einem Kilometer ergeben 50 Kilometer. Schematische Grafik, keine Streckenkarte."
    >
      <span className="loop-top">DIE IDEE IST EINFACH.</span>
      <svg viewBox="0 0 460 310" aria-hidden="true">
        <path
          d="M118 79C189 14 351 30 363 122S329 275 208 262 44 149 118 79Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M118 79C189 14 351 30 363 122S329 275 208 262 44 149 118 79Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          opacity=".07"
        />
        <circle cx="112" cy="86" r="7" fill="#dfb655" />
        <text
          x="230"
          y="150"
          textAnchor="middle"
          fill="currentColor"
          fontSize="60"
          fontWeight="500"
        >
          1 km
        </text>
        <text
          x="230"
          y="181"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          letterSpacing="3"
        >
          EINE RUNDE
        </text>
      </svg>
      <div className="loop-bottom">
        <span>× {event.loops} RUNDEN</span>
        <span>{event.distance} KM GEMEINSAM ↗</span>
      </div>
      <small>Schematische Darstellung · keine Streckenkarte</small>
    </div>
  );
}
