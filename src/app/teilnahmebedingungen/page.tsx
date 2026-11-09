import { event } from "@/config/event";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata({
  title: "Teilnahmebedingungen & Haftungshinweise",
  description: `Teilnahmebedingungen und Hinweise zu Haftung und Eigenverantwortung bei der ${event.name}.`,
  path: "/teilnahmebedingungen",
});

export default function Teilnahmebedingungen() {
  return (
    <>
      <section className="page-intro wrap legal-intro">
        <p className="eyebrow">RECHTLICHES / INFORMATIONEN ZUR TEILNAHME</p>
        <h1>Teilnahmebedingungen &amp;<br /><em>Haftungshinweise</em></h1>
      </section>
      <section className="wrap legal-content">
        <h2>05 · Haftung und Eigenverantwortung</h2>
        <div className="prose">
          <p>Die Teilnahme an der {event.name} erfolgt auf eigene Verantwortung und eigenes Risiko. Jeder Teilnehmer ist selbst dafür verantwortlich, seine körperliche und gesundheitliche Eignung für die Teilnahme und die gewählte Belastung realistisch einzuschätzen. Mit der Teilnahme bestätigt jeder Teilnehmer, sich gesundheitlich dazu in der Lage zu fühlen, am Lauf teilzunehmen.</p>
          <p>Der Veranstalter übernimmt, soweit gesetzlich zulässig, keine Haftung für Personen-, Sach- oder Vermögensschäden, die im Zusammenhang mit der Teilnahme an der Veranstaltung entstehen. Dies gilt auch für Schäden, die durch die individuellen körperlichen Belastungen, Stürze, Zusammenstöße, äußere Einflüsse oder das Verhalten anderer Personen entstehen, soweit diese nicht vom Veranstalter zu vertreten sind.</p>
          <p>Jeder Teilnehmer trägt selbst die Verantwortung für sein Verhalten, seine persönliche Sicherheit sowie seine Ausrüstung und Verpflegung. Die Teilnehmer sind verpflichtet, auf ihre eigene Gesundheit zu achten, ihre persönlichen Leistungsgrenzen zu berücksichtigen und die Veranstaltung bei gesundheitlichen Beschwerden oder Überlastungserscheinungen gegebenenfalls abzubrechen.</p>
          <p>Da die Strecke während der Veranstaltung nicht gesperrt ist und weiterhin von anderen Parkbesuchern und Fußgängern genutzt wird, ist besondere Rücksichtnahme und Aufmerksamkeit erforderlich. Die geltenden Regeln und Hinweise sind von allen Teilnehmern einzuhalten.</p>
          <p>Mit der Anmeldung und Teilnahme erkennen die Teilnehmer diese Hinweise zur Eigenverantwortung an. Eine Haftung des Veranstalters wird im gesetzlich zulässigen Umfang ausgeschlossen beziehungsweise beschränkt. Gesetzlich zwingende Haftungsansprüche, insbesondere bei vorsätzlicher oder grob fahrlässiger Schadensverursachung sowie bei Personenschäden, bleiben davon unberührt.</p>
        </div>
      </section>
    </>
  );
}
