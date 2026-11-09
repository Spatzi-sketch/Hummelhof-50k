import Link from "next/link";
import { Button, MapLink } from "@/components/shared";
import RegistrationEmbed from "@/components/RegistrationEmbed";
import { registration } from "@/config/registration";
import { event, schedule, location, eventInfo } from "@/config/event";
import { pageMetadata } from "@/config/seo";
export const metadata = pageMetadata({
  title: "Anmeldung – Sei dabei",
  description: `Jetzt für die ${event.name} am ${event.dateLong} anmelden. Das Anmeldeformular und alle Eckdaten findest du hier.`,
  path: "/anmeldung",
});
export default function Registration() {
  const ready = registration.enabled && Boolean(registration.registrationUrl);
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
              <dt>Start</dt>
              <dd>{schedule.start}</dd>
            </div>
            <div>
              <dt>Eintreffen und Startnummernausgabe</dt>
              <dd>Ab {schedule.arrival}</dd>
            </div>
            <div>
              <dt>Wo</dt>
              <dd>{location.start.address}<br />{location.start.orientation}.<br />
                <MapLink href={location.start.mapsUrl}>Startpunkt in Google Maps öffnen</MapLink>
              </dd>
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
          <p className="muted">{eventInfo.participation}</p>
          <Button href="/faq">Alle FAQs ansehen</Button>
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
              ? `Melde dich hier für den gemeinsamen Lauftag an. Das Formular wird von ${registration.provider} bereitgestellt und erst nach deiner Zustimmung geladen.`
              : `Hier entsteht die Anmeldung für die ${event.name}. Sobald das Formular bereit ist, findest du es an dieser Stelle.`}
          </p>
          <p>
            Bitte lies vor deiner Teilnahme unsere{" "}
            <Link className="inline-link" href="/teilnahmebedingungen">Teilnahmebedingungen und Haftungshinweise</Link>.
          </p>
          {ready ? (
            registration.mode === "embed" ? (
              <>
                <RegistrationEmbed />
                <div className="registration-note">
                  Das Formular wird von {registration.provider} betrieben. Deine
                  Auswahl kannst du jederzeit über „Datenschutz-Einstellungen“
                  im Footer ändern.
                </div>
              </>
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
