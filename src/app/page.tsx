import { Button, Facts, Photo, Invite, LoopGraphic } from "@/components/shared";
import { images } from "@/config/images";
import { event } from "@/config/event";
import { registrationHref } from "@/config/registration";
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-heading">
          <div>
            <p className="eyebrow">
              <span className="dot" /> COMMUNITY RUN · {event.date} ·{" "}
              {event.location.toUpperCase()}
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
              Eine Runde am Hummelhof. Eine sportliche Herausforderung. Und
              Menschen, die lieber gemeinsam laufen.
            </p>
            <p className="muted">
              Schlag die {event.bestTime} Stunden. Oder komm einfach wegen der
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
            caption="01 / Platz für deinen Blick auf den Hummelhof"
            priority
          />
          <div className="event-tag">
            <span>
              {new Date(event.dateISO + "T12:00:00Z")
                .toLocaleDateString("de-AT", {
                  weekday: "long",
                  timeZone: "UTC",
                })
                .toUpperCase()}
            </span>
            <strong>{event.date.split(".").slice(0, 2).join(" / ")}</strong>
            <span>
              {event.dateISO.slice(0, 4)} · {event.location.toUpperCase()}
            </span>
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
        <LoopGraphic />
      </section>
      <section className="community-section">
        <div className="wrap split">
          <Photo
            image={images.location}
            caption="02 / Hier bekommt die Runde ihr Gesicht"
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
            <p className="eyebrow">03 / PLATZ FÜR ECHTE MOMENTE</p>
            <h2>
              Draußen. In Bewegung.
              <br />
              <em>Am liebsten zusammen.</em>
            </h2>
          </div>
          <p>
            Hier ist Platz für unsere Strecke, kleine Laufmomente und die
            Menschen dahinter. Bald mit echten Fotos.
          </p>
        </div>
        <div className="gallery">
          <Photo image={images.community} caption="03 / Für die Community" />
          <Photo
            image={images.detail}
            caption="04 / Für jeden einzelnen Schritt"
          />
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
