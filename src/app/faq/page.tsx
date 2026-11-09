import { Button, Invite, MapLink } from "@/components/shared";
import { event, eventInfo, location, schedule } from "@/config/event";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata({
  title: "FAQ – Gut zu wissen",
  description: `Alle wichtigen Informationen zur ${event.name}: Start, Anreise, Strecke und Verpflegung.`,
  path: "/faq",
});

export default function FAQ() {
  const categories = [
    {
      title: "Allgemeine Informationen",
      questions: [
        { question: "Wann findet die Challenge statt?", answer: <p>Die {event.name} findet am {event.weekdayLong}, dem {event.dateLong}, statt.</p> },
        { question: "Wann ist der Start?", answer: <p>Der gemeinsame Start erfolgt um {schedule.start}. Bitte seid bereits ab {schedule.arrival} vor Ort. Die Startnummernausgabe beginnt ab {schedule.bibPickup}.</p> },
        { question: "Wie viele Kilometer werden gelaufen?", answer: <p>Die gesamte Challenge umfasst {event.distance} Kilometer: {event.loops} Runden zu jeweils {event.loopKm} Kilometer.</p> },
        { question: `Muss ich alle ${event.distance} Kilometer laufen?`, answer: <p>Die Challenge ist auf {event.distance} Kilometer ausgelegt. Im Mittelpunkt steht aber ein gemeinsamer Lauftag: Niemand muss die gesamte Distanz absolvieren, um teilzunehmen, und niemand soll sich unter Leistungsdruck gesetzt fühlen.</p> },
        { question: "Ist die Teilnahme kostenlos?", answer: <p>{eventInfo.participation}</p> },
      ],
    },
    {
      title: "Startort und Anreise",
      questions: [
        { question: "Wo befindet sich der Startpunkt?", answer: <><p>Der Start befindet sich beim {location.start.address}, {location.start.orientation.charAt(0).toLowerCase() + location.start.orientation.slice(1)}. Bitte findet euch dort zur Startnummernausgabe und zum gemeinsamen Start ein.</p><MapLink href={location.start.mapsUrl}>Startpunkt in Google Maps öffnen</MapLink></> },
        { question: "Wann soll ich vor Ort sein?", answer: <p>Bitte kommt ab {schedule.arrival} zum Startpunkt. Dort beginnt ab {schedule.bibPickup} die Startnummernausgabe. Der gemeinsame Start erfolgt um {schedule.start}.</p> },
        { question: "Wie komme ich mit öffentlichen Verkehrsmitteln zum Start?", answer: <><p>Die nächstgelegene Haltestelle ist {location.transit.stop}. Dort halten die Buslinien {location.transit.lines.join(" und ")}. Die Haltestelle liegt {location.transit.distance} vom Startpunkt entfernt. Wir empfehlen ausdrücklich, wenn möglich öffentlich anzureisen.</p><MapLink href={location.transit.mapsUrl}>Haltestelle in Google Maps öffnen</MapLink></> },
        { question: "Gibt es Parkmöglichkeiten?", answer: <p>{location.parking}</p> },
      ],
    },
    {
      title: "Strecke und Orientierung",
      questions: [
        { question: "Wie sieht die Strecke aus?", answer: <p>Eine Runde ist genau {event.loopKm} Kilometer lang. Insgesamt ergeben {event.loops} Runden eine Gesamtdistanz von {event.distance} Kilometern.</p> },
        { question: "Wie finde ich den richtigen Streckenverlauf?", answer: <p>{eventInfo.markings}</p> },
        { question: "Gibt es öffentliche Toiletten?", answer: <p>{eventInfo.toilets}</p> },
      ],
    },
    {
      title: "Verpflegung und Versorgung",
      questions: [
        { question: "Welche Verpflegung wird vor Ort angeboten?", answer: <p>{eventInfo.refreshments}</p> },
        { question: "Soll ich eigene Verpflegung mitbringen?", answer: <><p>Ja, das empfehlen wir ausdrücklich.</p><p>{eventInfo.selfCatering}</p></> },
      ],
    },
    {
      title: "Medaillen und Teilnahme",
      questions: [
        { question: `Bekomme ich eine Medaille, auch wenn ich nicht alle ${event.distance} Kilometer schaffe?`, answer: <p>{eventInfo.medal}</p> },
        { question: "Kostet die Teilnahme etwas?", answer: <p>{eventInfo.participation}</p> },
      ],
    },
  ];

  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">FAQ / ALLES FÜR DEINEN LAUFTAG</p>
        <h1>Gut zu wissen,<br /><em>bevor es losgeht.</em></h1>
        <p className="lead">Hier findet ihr die wichtigsten Informationen rund um die {event.name}. Von Startzeit und Anreise über die Strecke bis hin zur Verpflegung haben wir die häufigsten Fragen für euch gesammelt.</p>
      </section>
      <div className="wrap faq-list">
        {categories.map((category, i) => (
          <section className="faq-category" key={category.title}>
            <div>
              <p className="eyebrow">0{i + 1} / GUT ZU WISSEN</p>
              <h2>{category.title}</h2>
            </div>
            <div>
              {category.questions.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>{question}<span aria-hidden="true" /></summary>
                  <div className="faq-answer">{answer}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="wrap faq-outro">
        <p>Noch nicht angemeldet? Alle Eckdaten zum Lauftag findest du auch auf der Anmeldungsseite.</p>
        <Button href="/anmeldung">Zur Anmeldung</Button>
      </section>
      <Invite />
    </>
  );
}
