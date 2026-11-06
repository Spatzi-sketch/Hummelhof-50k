import { Photo, Facts, Invite, LoopGraphic } from "@/components/shared";
import { images } from "@/config/images";
import { event } from "@/config/event";
import { pageMetadata } from "@/config/seo";
export const metadata = pageMetadata({
  title: "About Us – Unsere Geschichte",
  description:
    "Wie aus einem persönlichen 50-Kilometer-Lauf am Hummelhof eine offene Community-Challenge wurde. Unsere Geschichte und die Idee dahinter.",
  path: "/about-us",
});
export default function About() {
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">ABOUT US / DIE GESCHICHTE DAHINTER</p>
        <h1>
          Ein persönlicher Lauf.
          <br />
          <em>Eine gemeinsame Idee.</em>
        </h1>
        <p className="lead">
          Wie aus 50 Kilometern eine Community-Challenge wurde. Und warum wir
          uns am {event.dateLong} am Hummelhof treffen.
        </p>
      </section>
      <div className="wrap">
        <Photo
          image={images.about}
          caption="01 / Der geschwungene Weg"
          className="wide-photo"
          priority
        />
      </div>
      <section className="section wrap story-layout">
        <div>
          <p className="eyebrow">01 / WIE ALLES BEGANN</p>
          <h2>
            50-mal dieselbe Runde.
            <br />
            <em>Und dann diese Idee.</em>
          </h2>
        </div>
        <div className="prose">
          <p>
            Ich bin selbst {event.distance} Kilometer am Hummelhof gelaufen.
            Eine Runde ist genau {event.loopKm} Kilometer lang. Also hieß es:{" "}
            {event.loops}-mal dieselbe Runde, bis die gesamte Distanz geschafft
            war. Meine Zeit am Ende: {event.bestTimeLong}.
          </p>
          <p>
            Der Aufbau ist bewusst einfach. Es braucht keine komplizierte
            Strecke, um sich einer sportlichen Herausforderung zu stellen. Ein
            Kilometer, immer wieder. Bis aus einer einzelnen Runde fünfzig
            geworden sind.
          </p>
          <p>
            Aus diesem persönlichen Lauf entstand die Frage: Wer möchte das auch
            versuchen? Vielleicht die Distanz schaffen, vielleicht sogar
            schneller sein? Warum die Herausforderung für mich behalten, wenn
            daraus auch ein gemeinsamer Lauftag werden kann?
          </p>
          <p>
            So wurde aus meinem Lauf die {event.name}. Die persönliche Zeit
            bleibt eine Einladung an alle, die sich daran messen möchten. Aber
            sie ist nicht der einzige Grund, dabei zu sein.
          </p>
          <p>
            Der {event.dateLong} ist gleichzeitig mein Geburtstag. Ein passender
            Anlass, die Laufcommunity zusammenzubringen und den Tag mit etwas zu
            verbringen, das uns verbindet: gemeinsam draußen unterwegs zu sein.
          </p>
        </div>
      </section>
      <section className="quote-section">
        <div className="wrap">
          <p className="eyebrow">DAS IST UNS WICHTIG</p>
          <h2>
            Die Uhr läuft.
            <br />
            <em>Aber das Miteinander zählt.</em>
          </h2>
          <p>
            Eine Zeit kann motivieren. Ein gemeinsamer Lauftag bleibt mehr als
            die Zahl auf der Uhr.
          </p>
        </div>
      </section>
      <section className="section wrap split">
        <div>
          <p className="eyebrow">02 / WARUM WIR LAUFEN</p>
          <h2>Laufen verbindet.</h2>
          <p>
            Gemeinsam Sport zu machen, heißt auch, ein Erlebnis zu teilen. Man
            hat ein Ziel vor Augen, motiviert sich gegenseitig und lernt andere
            Menschen kennen, die genauso gerne laufen.
          </p>
          <p>
            Gerade im Winter ist ein fester Anlass schön: ein Tag, an dem wir
            uns treffen, statt allein unsere Runden zu drehen. Nicht als große,
            steife Laufveranstaltung, sondern offen, freundlich und entspannt.
          </p>
          <p>
            Du musst keine Bestzeit im Kopf haben, um willkommen zu sein. Ob du
            die Challenge angehst oder die Community unterstützt: Dein
            Leistungsniveau entscheidet nicht darüber, ob du dazugehörst.
          </p>
        </div>
        <Photo
          image={images.community}
          caption="02 / Sonnenlicht auf der Wiese"
          className="portrait"
        />
      </section>
      <section className="section wrap split border-top">
        <LoopGraphic />
        <div>
          <p className="eyebrow">03 / DIE CHALLENGE, GANZ EINFACH</p>
          <h2>
            Eine kleine Runde.
            <br />
            <em>Ein großes Vorhaben.</em>
          </h2>
          <p>
            {event.loops} Runden, jeweils {event.loopKm} Kilometer. Zusammen
            ergibt das {event.distance} Kilometer. Die bisherige persönliche
            Bestzeit liegt bei {event.bestTimeLong}.
          </p>
          <p>
            Wer diese Zeit unterbieten möchte, findet hier seine
            Herausforderung. Wer wegen des gemeinsamen Lauferlebnisses kommt,
            ist genauso richtig.
          </p>
        </div>
      </section>
      <Facts />
      <section className="closing wrap">
        <p className="eyebrow">EINE EINLADUNG AN DICH</p>
        <h2>
          Wir sehen uns
          <br />
          <em>am Hummelhof.</em>
        </h2>
        <p>
          Am {event.dateLong} machen wir aus einer persönlichen Challenge einen
          gemeinsamen Tag. Mit Bewegung, gegenseitiger Motivation und Freude am
          Laufen.
        </p>
      </section>
      <Invite />
    </>
  );
}
