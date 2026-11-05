import { Button } from "@/components/shared";
import { registration } from "@/config/registration";
import { event } from "@/config/event";
import { pageMetadata } from "@/config/seo";
export const metadata = pageMetadata({
  title: "Anmeldung – Sei dabei",
  description: `Alle Informationen zur Anmeldung für die ${event.name} am ${event.dateLong}. Die Anmeldung wird in Kürze freigeschaltet.`,
  path: "/anmeldung",
});
export default function Registration() {
  const ready = Boolean(registration.registrationUrl);
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">ANMELDUNG / DEIN PLATZ IN DER COMMUNITY</p>
        <h1>
          {event.loops} Runden.
          <br />
          <em>Und du mittendrin.</em>
        </h1>
        <p className="lead">
          Du möchtest am {event.dateLong} am Hummelhof {event.distance}{" "}
          Kilometer laufen oder die Community bei ihrer Challenge unterstützen?
          Wir freuen uns, dich dabei zu haben.
        </p>
      </section>
      <section className="wrap registration-layout">
        <aside>
          <p className="eyebrow">DER LAUFTAG AUF EINEN BLICK</p>
          <dl className="event-list">
            <div>
              <dt>Wann</dt>
              <dd>{event.dateLong}</dd>
            </div>
            <div>
              <dt>Wo</dt>
              <dd>{event.location}</dd>
            </div>
            <div>
              <dt>Die Challenge</dt>
              <dd>
                {event.distance} Kilometer · {event.loops} Runden
              </dd>
            </div>
            <div>
              <dt>Eine Runde</dt>
              <dd>{event.loopKm} Kilometer</dd>
            </div>
            <div>
              <dt>Die persönliche Bestzeit</dt>
              <dd>{event.bestTime} Stunden</dd>
            </div>
          </dl>
          <p className="muted">
            Die genaue Startzeit und weitere organisatorische Informationen
            folgen. Hier findest du vorerst alle bereits bestätigten Eckdaten.
          </p>
        </aside>
        <div className="registration-panel" id="anmeldebereich">
          <span className="status">
            <span className="dot" />
            {ready ? "DIE ANMELDUNG IST GEÖFFNET" : "NOCH EIN WENIG GEDULD"}
          </span>
          <span className="registration-symbol" aria-hidden="true">
            ↗
          </span>
          <h2>
            {ready
              ? "Sei dabei."
              : "Die Anmeldung wird in Kürze freigeschaltet."}
          </h2>
          <p>
            {ready
              ? "Hier kannst du dich für den gemeinsamen Lauftag anmelden."
              : "Hier entsteht die Anmeldung für die 50 Loop Sulmlof Challenge. Sobald das Formular bereit ist, findest du es an dieser Stelle."}
          </p>
          {ready ? (
            registration.mode === "embed" ? (
              <iframe
                className="registration-frame"
                src={registration.registrationUrl}
                title="Anmeldeformular für den Hummelhof 50K"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <Button href={registration.registrationUrl}>
                Zum Anmeldeformular
              </Button>
            )
          ) : (
            <div className="registration-note">
              Noch keine Anmeldung möglich.
              <br />
              Es werden derzeit keine Anmeldedaten erfasst.
            </div>
          )}
        </div>
      </section>
      <section className="wrap registration-outro">
        <p>Eine sportliche Herausforderung. Ohne steife Wettkampfatmosphäre.</p>
        <a className="text-link" href="/about-us">
          Lerne die Geschichte kennen ↗
        </a>
      </section>
    </>
  );
}
