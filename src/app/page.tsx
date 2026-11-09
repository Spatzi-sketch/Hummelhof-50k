import { Button, Facts, Photo, Invite, MapLink } from "@/components/shared";
import AnimatedLoopGraphic from "@/components/AnimatedLoopGraphic";
import { images } from "@/config/images";
import { event, schedule, location, eventInfo } from "@/config/event";
import { registrationHref } from "@/config/registration";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata({
  title: event.name,
  description: `50 Kilometer, 50 Runden, ein gemeinsamer Lauftag. Am ${event.dateLong} am Hummelhof. Entdecke die Community-Challenge.`,
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-heading">
          <div>
            <p className="eyebrow">
              <span className="dot" /> COMMUNITY RUN · {event.date} ·{" "}
              {event.location.toUpperCase()} · START {schedule.start.toUpperCase()}
            </p>
            <h1>
              {event.distance} Kilometer.
              <br />
              {event.loops} Runden.
              <br />
              <em>Ein gemeinsamer Lauftag.</em>
            </h1>
          </div>
          <div className="hero-copy">
            <p>
              Ich bin {event.distance} Kilometer im Hummelhofwald in {event.bestTime} Stunden gelaufen. Am {event.dateLong.replace(/\s+\d{4}$/, "")} machen wir daraus eine gemeinsame Challenge für die Laufcommunity.
            </p>
            <p className="muted">
              Laufe 50 Runden in unter {event.bestTime} Stunden. Oder komm einfach wegen der
              Community.
            </p>
            <div className="hero-actions">
              <Button href={registrationHref}>Zur Anmeldung</Button>
              <a className="text-link" href="/about-us">
                Mehr über den Lauf <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <Photo
            image={images.hero}
            caption="01 / Ein Weg durch den Wald"
            priority
          />
          <div className="event-tag">
            <span>{event.weekdayLong.toUpperCase()}</span>
            <strong>{event.date.split(".").slice(0, 2).join(" / ")}</strong>
          </div>
        </div>
        <div className="image-foot">
          <span>{event.name.toUpperCase()}</span>
          <span>
            RAUSGEHEN. LOSLAUFEN. ZUSAMMENKOMMEN.{" "}
            <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>
      <Facts />
      <section className="section wrap event-details">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DER LAUFTAG / ALLE ECKDATEN</p>
            <h2>Gut ankommen.<br /><em>Gemeinsam loslaufen.</em></h2>
          </div>
          <p>{event.weekdayLong}, {event.dateLong} · {event.location}</p>
        </div>
        <div className="event-details-grid">
          <div>
            <dl className="event-list">
              <div><dt>Ab {schedule.arrival}</dt><dd>Eintreffen und Startnummernausgabe</dd></div>
              <div><dt>{schedule.start}</dt><dd>Gemeinsamer Start der Challenge</dd></div>
              <div><dt>Die Challenge</dt><dd>{event.distance} Kilometer · {event.loops} Runden zu je {event.loopKm} Kilometer</dd></div>
            </dl>
            <p>{eventInfo.participation}</p>
            <p>{eventInfo.medal}</p>
          </div>
          <div className="location-panel">
            <p className="eyebrow">STARTPUNKT / HUMMELHOFWALD</p>
            <h3>{location.start.address}</h3>
            <p>{location.start.orientation}. Bitte findet euch hier zur Startnummernausgabe und zum gemeinsamen Start ein.</p>
            <MapLink href={location.start.mapsUrl}>Startpunkt in Google Maps öffnen</MapLink>
          </div>
        </div>
      </section>
      <section className="community-section">
        <div className="wrap event-details-grid">
          <div>
            <p className="eyebrow">ANREISE / GUT UNTERWEGS</p>
            <h2>Dein Weg<br /><em>zum Start.</em></h2>
            <p>Wir empfehlen, wenn möglich, öffentlich anzureisen. Die Haltestelle {location.transit.stop} wird von den Buslinien {location.transit.lines.join(" und ")} angefahren und liegt {location.transit.distance} vom Startpunkt entfernt.</p>
            <MapLink href={location.transit.mapsUrl}>Haltestelle in Google Maps öffnen</MapLink>
          </div>
          <div>
            <p className="eyebrow">MIT DEM AUTO</p>
            <p>{location.parking}</p>
            <p className="eyebrow">STRECKE &amp; VERPFLEGUNG</p>
            <p>{eventInfo.markings}</p>
            <p>{eventInfo.refreshments} {eventInfo.supplyReminder}</p>
            <Button href="/faq">Alle FAQs ansehen</Button>
          </div>
        </div>
      </section>
      <section className="section wrap split">
        <div>
          <p className="eyebrow">01 / DIE HERAUSFORDERUNG</p>
          <h2>
            Eine Runde nach
            <br />
            der anderen.
            <br />
            <em>Gemeinsam weiter.</em>
          </h2>
          <p>
            Ein Kilometer pro Runde. {event.loops} Runden für die ganze
            Challenge. Die Idee ist einfach – die {event.distance} Kilometer
            haben es in sich.
          </p>
          <p>
            Meine bisherige persönliche Bestzeit: {event.bestTimeLong}. Jetzt
            bist du dran. Wenn du magst, versuchst du, diese Zeit zu
            unterbieten. Wenn nicht, zählt das gemeinsame Lauferlebnis genauso.
          </p>
          <a className="text-link" href="/about-us">
            Die Geschichte hinter den 50K <span aria-hidden="true">↗</span>
          </a>
        </div>
        <AnimatedLoopGraphic />
      </section>
      <section className="community-section">
        <div className="wrap split">
          <Photo
            image={images.location}
            caption="02 / Licht auf dem Weg"
            className="portrait"
          />
          <div>
            <p className="eyebrow">02 / MEHR ALS EINE BESTZEIT</p>
            <h2>
              Nicht nur eine Zeit.
              <br />
              <em>Ein gemeinsamer Tag.</em>
            </h2>
            <p>
              Im Winter fehlt manchmal nur ein guter Anlass, um gemeinsam
              rauszugehen. Genau den möchten wir schaffen.
            </p>
            <p>
              Kein steifer Wettkampf und kein Leistungsdruck. Sondern ein
              Lauftag, an dem wir uns treffen, gegenseitig motivieren und die
              Freude am Laufen teilen. Sportlicher Ehrgeiz? Gerne. Das
              Miteinander? Auf jeden Fall.
            </p>
            <span className="small-note">
              Offen für Laufbegeisterte. Nicht nur für Bestzeiten.
            </span>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / WEGE, BÄUME, LICHT</p>
            <h2>
              Draußen. In Bewegung.
              <br />
              <em>Am liebsten zusammen.</em>
            </h2>
          </div>
          <p>
            Wege, Bäume und das Licht zwischen ihren Kronen. Eindrücke für
            unseren gemeinsamen Lauftag im Winter.
          </p>
        </div>
        <div className="gallery">
          <Photo
            image={images.community}
            caption="03 / Sonne zwischen den Bäumen"
          />
          <Photo image={images.sky} caption="04 / Blick nach oben" />
          <Photo
            image={images.trail}
            caption="05 / Der Weg im Gegenlicht"
          />
          <Photo image={images.grove} caption="06 / Schatten und Licht" />
          <Photo image={images.canopy} caption="07 / Der Weg voraus" />
        </div>
      </section>
      <section className="story-teaser wrap">
        <p className="eyebrow">
          VON EINER PERSÖNLICHEN RUNDE ZU UNSERER CHALLENGE
        </p>
        <div>
          <h2>
            Alles begann mit 50 Kilometern.
            <br />
            <em>Jetzt machen wir etwas Gemeinsames daraus.</em>
          </h2>
          <Button href="/about-us">Unsere Geschichte</Button>
        </div>
      </section>
      <Invite />
    </>
  );
}
