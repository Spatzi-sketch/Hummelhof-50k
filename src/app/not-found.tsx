import { Button } from "@/components/shared";
export default function NotFound() {
  return (
    <section className="page-intro wrap">
      <p className="eyebrow">404 / KURZ VON DER RUNDE ABGEKOMMEN</p>
      <h1>
        Hier geht’s
        <br />
        <em>nicht weiter.</em>
      </h1>
      <p className="lead">
        Diese Seite gibt es nicht. Zurück zum gemeinsamen Lauftag?
      </p>
      <Button href="/">Zur Startseite</Button>
    </section>
  );
}
