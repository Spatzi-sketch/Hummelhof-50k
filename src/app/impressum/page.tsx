import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum der Hummelhof 50K: Veranstalter und Betreiber dieser Website.",
  path: "/impressum",
});

export default function Impressum() {
  return (
    <>
      <section className="page-intro wrap legal-intro">
        <h1>Impressum</h1>
      </section>
      <section className="wrap legal-content">
        <h2>Veranstalter und Betreiber dieser Website</h2>
        <div className="prose">
          <p>Trailabenteuer für Outdoor und Natursport</p>
          <p>Bahrgasse 13<br />4020 Linz<br />Österreich</p>
          <p>Trailabenteuer für Outdoor und Natursport ist Veranstalter der Hummelhof 50K und verantwortlich für die Bereitstellung der Informationen auf dieser Website.</p>
        </div>
      </section>
    </>
  );
}
