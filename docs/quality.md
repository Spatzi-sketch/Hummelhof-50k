# Prüfprotokoll

Stand: 6. November 2026, nach Korrektur des Eventnamens und Einbau der acht
gelieferten Fotos.

## Rahmenbedingungen

- `npm ci`: 38 Pakete, keine bekannten Schwachstellen gemeldet.
- `npm run typecheck`: erfolgreich, keine TypeScript-Fehler.
- `npm run build`: Next.js 16.4.5, 9 statisch generierte Routen, keine Fehler.
  Erzeugt: `/`, `/about-us`, `/anmeldung`, `/_not-found`, `/icon.png`,
  `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`.
- Zusätzlicher Testbuild mit `NEXT_PUBLIC_SITE_URL=hummmelhof.vercel.app`
  (ohne Protokoll): Build läuft, Sitemap enthält korrekte `https://`-Adressen.

## Bilder

Acht Fotos (Original je 4032 × 3024 px, 3–7 MB) wurden nach `public/images/`
als WebP mit 1800 px Breite konvertiert: zusammen **4,4 MB**, Einzelgrößen
239–789 KB. EXIF-Daten wurden entfernt. `next/image` liefert zusätzlich
optimierte Varianten aus; ein Hero-Abruf mit `w=1200` ergab z. B. 284 KB.

Die fünf früheren SVG-Platzhalter und die zugehörige Beschriftungslogik wurden
entfernt. Alle Bildpfade, Alt-Texte und Ausschnitte liegen zentral in
`src/config/images.ts`. `tests/check.mjs` prüft, dass alle acht Dateien auf den
Seiten vorkommen, als Ressource HTTP 200 liefern, kein Platzhalter-Label mehr
sichtbar ist und der alte Eventname nirgends mehr auftaucht.

## Produktionsserver (`next start`)

`npm test`: alle drei Seiten HTTP 200, je ein H1, `lang="de"`, Meta-Beschreibung,
Canonical, Open Graph, Logo vorhanden, **34** interne Seiten-/Link-/Assetziele
alle HTTP 200, `robots.txt` mit Sitemap-Verweis, `sitemap.xml` mit allen drei
Seiten, unbekannte URL → 404, Anmeldeseite ohne `<form>` und mit dem Hinweis
auf die noch nicht freigeschaltete Anmeldung.

Zusätzlich direkt geprüft: `/icon.png` (16 KB), `/apple-icon.png` (44 KB),
`/favicon.ico` (16 KB), `/images/logo.png`, alle acht `/images/*.webp`,
`/robots.txt`, `/sitemap.xml`.

## Echte Browserprüfung

Ein über npm bereitgestellter Headless-Chromium wurde mit den mitgelieferten
Systembibliotheken gestartet. Geprüft wurden alle drei Seiten bei **375, 768,
1440 und 1920 px** Breite:

- kein horizontales Scrollen, keine über den Rand ragenden Elemente,
- alle Bilder geladen (`naturalWidth > 0`), keine fehlenden Ressourcen,
- keine Platzhalter-Labels, kein alter Eventname im sichtbaren Text,
- keine JavaScript-Fehler und keine Fehler in der Browserkonsole,
- Seitentitel und H1 auf allen Seiten korrekt,
- mobile Navigation: öffnet mit `aria-expanded="true"`, Link führt zu
  `/about-us`, Menü schließt nach der Navigation und auf Escape.

Screenshots aller Ansichten wurden während der Prüfung erzeugt und danach
wieder aus dem Repository entfernt (keine generierten Artefakte in Git).

**Gefunden und behoben:** Bei 701–900 px Breite erzeugte die Kombination aus
`aspect-ratio` und `min-height: 260px` am Hero-Bild eine Mindestbreite von
793 px und damit einen horizontalen Scrollbalken. Die `min-height` wurde
entfernt und für Tablet-Hochformat ein angepasster Bildzuschnitt ergänzt. Nach
dem Einbau der echten Fotos wurde außerdem `align-items: end` der Hero-Zeile
für 701–900 px auf `start` gesetzt, damit Überschrift und Einstiegstext auf
einer Linie beginnen. Alle vier Breiten danach erneut fehlerfrei geprüft.

**Geprüft, aber nicht als Fehler gewertet:** Lazy geladene Bilder außerhalb des
sichtbaren Bereichs haben vor dem Scrollen noch keine Abmessungen. Nach dem
Scrollen bzw. nach explizitem Laden sind alle Bilder vollständig vorhanden.

## Implementierte, aber nicht automatisiert gemessene Punkte

- Breakpoints bei 700, 900 (Hero und Galerie) und 1100 px, dazu Breitbild ab 1600 px.
- Sichtbare Fokuszustände, Skip-Link, semantische Navigation, deutscher
  Dokumenttitel, beschreibende Alt-Texte, `prefers-reduced-motion`.
- Feste Bildformate gegen Layoutverschiebungen, `object-fit: cover` mit
  zentral einstellbarer `position`.
- Kontraste und Lesbarkeit wurden visuell anhand der Screenshots beurteilt,
  nicht mit einem automatisierten WCAG-Audit gemessen.

## Vercel

Vor der Behebung meldeten die Vercel-Deployments zwar „Deployment has completed",
die Produktionsdomain `hummmelhof.vercel.app` lieferte aber `404 NOT_FOUND` und
die Preview-Adresse eine Vercel-Anmeldeseite. Nach Übernahme der Änderungen auf
`main` wurde ein neues Produktionsdeployment erzeugt und live geprüft: Startseite,
`/about-us`, `/anmeldung`, `/robots.txt` und `/sitemap.xml` sind erreichbar, die
Sitemap enthält korrekte `https://hummmelhof.vercel.app/…`-Adressen. Ursache und
die dauerhaft nötigen Dashboard-Einstellungen sind in [vercel.md](vercel.md)
dokumentiert. Auch die hier beschriebenen Änderungen wurden am 6. November 2026
über PR #4 auf `main` übernommen: Vercel meldete „Deployment has completed", und
Startseite, About Us und Anmeldung wurden live mit dem korrigierten Eventnamen
und den acht Fotos geprüft.

## Vor öffentlicher Freigabe

- Beim Austausch von Fotos Bildunterschriften und Alt-Texte mitpflegen.
- Anmelde-URL ergänzen oder bewusst inaktiv lassen.
- Veranstalter-/Kontaktangaben sowie Impressum und Datenschutzhinweise prüfen;
  hier wurden keine Fantasiedaten eingesetzt.
- Bei einem späteren externen Formularanbieter Datenschutz, Cookies,
  Barrierefreiheit und iframe-Höhe gesondert kontrollieren.
