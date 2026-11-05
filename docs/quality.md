# Prüfprotokoll

Stand: 5. November 2026, nach der Vercel-Fehlerbehebung.

## Rahmenbedingungen

- `npm ci`: 38 Pakete, keine Schwachstellen gemeldet.
- `npm run typecheck`: erfolgreich, keine TypeScript-Fehler.
- `npm run build`: Next.js 16.4.5, 9 statisch generierte Routen, keine Fehler.
  Erzeugt: `/`, `/about-us`, `/anmeldung`, `/_not-found`, `/icon.png`,
  `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`.
- Zusätzlicher Testbuild mit `NEXT_PUBLIC_SITE_URL=hummmelhof.vercel.app`
  (ohne Protokoll): Build läuft, Sitemap enthält korrekte `https://`-Adressen.

## Produktionsserver (`next start`)

`npm test` gegen den laufenden Produktionsserver: alle drei Seiten HTTP 200, je
ein H1, `lang="de"`, Meta-Beschreibung, Canonical, Open Graph, Logo vorhanden,
23 interne Seiten-/Link-/Assetziele alle HTTP 200, `robots.txt` mit
Sitemap-Verweis, `sitemap.xml` mit allen drei Seiten, unbekannte URL → 404,
Anmeldeseite ohne `<form>` und mit dem Hinweis auf die noch nicht
freigeschaltete Anmeldung.

Zusätzlich direkt geprüft: `/icon.png` (16 KB), `/apple-icon.png` (44 KB),
`/favicon.ico` (16 KB), `/images/logo.png`, `/images/hero.svg`,
`/robots.txt`, `/sitemap.xml`.

## Echte Browserprüfung

Ein über npm bereitgestellter Headless-Chromium wurde mit den mitgelieferten
Systembibliotheken gestartet. Geprüft wurden alle drei Seiten bei **375, 768,
1440 und 1920 px** Breite:

- kein horizontales Scrollen, keine über den Rand ragenden Elemente,
- alle Bilder geladen (`naturalWidth > 0`), keine fehlenden Ressourcen,
- keine JavaScript-Fehler und keine Fehler in der Browserkonsole,
- Seitentitel und H1 auf allen Seiten korrekt,
- mobile Navigation: öffnet mit `aria-expanded="true"`, Link führt zu
  `/about-us`, Menü schließt nach der Navigation und auf Escape.

Screenshots aller Ansichten wurden während der Prüfung erzeugt und danach
wieder aus dem Repository entfernt (keine generierten Artefakte in Git).

**Gefunden und behoben:** Bei 701–900 px Breite erzeugte die Kombination aus
`aspect-ratio` und `min-height: 260px` am Hero-Bild eine Mindestbreite von
793 px und damit einen horizontalen Scrollbalken. Die `min-height` wurde
entfernt und für Tablet-Hochformat ein angepasster Bildzuschnitt ergänzt.
Danach alle vier Breiten erneut fehlerfrei geprüft.

**Geprüft, aber nicht als Fehler gewertet:** Lazy geladene Bilder außerhalb des
sichtbaren Bereichs haben vor dem Scrollen noch keine Abmessungen. Nach dem
Scrollen bzw. nach explizitem Laden sind alle Bilder vollständig vorhanden.

## Implementierte, aber nicht automatisiert gemessene Punkte

- Breakpoints bei 700, 900 (Hero-Zuschnitt) und 1100 px, dazu Breitbild ab 1600 px.
- Sichtbare Fokuszustände, Skip-Link, semantische Navigation, deutscher
  Dokumenttitel, beschreibende Alt-Texte, `prefers-reduced-motion`.
- Feste Bildformate gegen Layoutverschiebungen, `object-fit: cover` mit
  zentral einstellbarer `position`.
- Kontraste und Lesbarkeit wurden visuell anhand der Screenshots beurteilt,
  nicht mit einem automatisierten WCAG-Audit gemessen.

## Vercel

Die Vercel-Deployments auf `main` melden „Deployment has completed". Die
Produktionsdomain `hummmelhof.vercel.app` liefert dennoch `404 NOT_FOUND`, die
Preview-Adresse des Projekts eine Vercel-Anmeldeseite. Ursache und die nötigen
Dashboard-Einstellungen sind in [vercel.md](vercel.md) dokumentiert. Ein
erneutes Deployment nach Übernahme dieser Änderungen auf `main` ist erforderlich.

## Vor öffentlicher Freigabe

- Echte Fotos, Bildunterschriften und Alt-Texte ersetzen.
- Anmelde-URL ergänzen oder bewusst inaktiv lassen.
- Veranstalter-/Kontaktangaben sowie Impressum und Datenschutzhinweise prüfen;
  hier wurden keine Fantasiedaten eingesetzt.
- Bei einem späteren externen Formularanbieter Datenschutz, Cookies,
  Barrierefreiheit und iframe-Höhe gesondert kontrollieren.
