# Prüfprotokoll

Stand: 6. November 2026, nach Einbindung des Brevo-Anmeldeformulars und des
Zustimmungshinweises.

## Rahmenbedingungen

- `npm ci`: 38 Pakete, keine bekannten Schwachstellen gemeldet.
- `npm run typecheck`: erfolgreich, keine TypeScript-Fehler.
- `npm run build`: Next.js 16.4.5, 9 statisch generierte Routen, keine Fehler.
  Erzeugt: `/`, `/about-us`, `/anmeldung`, `/_not-found`, `/icon.png`,
  `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`.
- `npm audit --audit-level=high`: 0 Schwachstellen.
- Zusätzlicher Testbuild mit `NEXT_PUBLIC_SITE_URL=hummmelhof.vercel.app`
  (ohne Protokoll): Build läuft, Sitemap enthält korrekte `https://`-Adressen.

## Bilder

Acht Fotos (Original je 4032 × 3024 px, 3–7 MB) liegen in `public/images/` als
WebP mit 1800 px Breite: zusammen **4,4 MB**, Einzelgrößen 239–789 KB, EXIF
entfernt. `next/image` liefert zusätzlich optimierte Varianten aus.

Die fünf früheren SVG-Platzhalter und die Beschriftungslogik sind entfernt.
Alle Bildpfade, Alt-Texte und Ausschnitte liegen zentral in
`src/config/images.ts`. `tests/check.mjs` prüft Vorkommen und Erreichbarkeit
aller acht Dateien, Platzhalterfreiheit und den korrigierten Eventnamen.

## Anmeldung und Zustimmung

Das Formular von Brevo (Sendinblue) ist als iframe auf `/anmeldung` eingebunden.
Es wird **nur nach Zustimmung erzeugt**; ohne Zustimmung – und ohne JavaScript –
enthält die Seite ausschließlich einen Hinweis und einen selbst ausgelösten
Link zum Formular beim Anbieter. Der iframe nutzt
`referrerPolicy="strict-origin-when-cross-origin"`, einen beschreibenden
`title`, `loading="lazy"` und eine zentral einstellbare Höhe.

Der Zustimmungshinweis erscheint beim ersten Besuch auf allen drei Seiten am
unteren Rand. „Akzeptieren" und „Ablehnen" sind gleich groß; die Auswahl liegt
nur als `accepted`/`rejected` in `localStorage` (kein Cookie, kein Server).
„Datenschutz-Einstellungen" im Footer öffnet den Hinweis erneut, Escape gilt
als „Ablehnen". Alle Texte stehen in `src/config/consent.ts`.

## Produktionsserver (`next start`)

`npm test`: alle drei Seiten HTTP 200, je ein H1, `lang="de"`, Meta-Beschreibung,
Canonical, Open Graph, Logo vorhanden, **35** interne Seiten-/Link-/Assetziele
alle HTTP 200, `robots.txt` mit Sitemap-Verweis, `sitemap.xml` mit allen drei
Seiten, unbekannte URL → 404.

Zusätzlich geprüft: die Anmelde-URL wird aus `src/config/registration.ts`
gelesen und muss auf der Seite vorkommen; im ausgelieferten HTML steht **kein**
`<iframe>` und **kein** `<form>`; der alte Platzhaltertext ist verschwunden; der
Footer-Link zum Ändern der Auswahl ist auf jeder Seite vorhanden.

## Echte Browserprüfung

Ein über npm bereitgestellter Headless-Chromium wurde mit den mitgelieferten
Systembibliotheken gestartet. Da die Sandbox `sibforms.com` nicht erreichen
darf, wurde der iframe für den Test mit einer lokalen HTML-Antwort erfüllt. So
lässt sich die Einbindung (src, Laden, Entfernen) prüfen, ohne dass ein
Netzwerkfehler das Ergebnis verfälscht. Geprüft wurden alle drei Seiten bei
**375, 768, 1440 und 1920 px** Breite:

- kein horizontales Scrollen, keine über den Rand ragenden Elemente,
- alle Bilder geladen (`naturalWidth > 0`), keine fehlenden Ressourcen,
- keine JavaScript-Fehler und keine Fehler in der Browserkonsole,
- Seitentitel und H1 auf allen Seiten korrekt,
- mobile Navigation: öffnet mit `aria-expanded="true"`, Link führt zu
  `/about-us`, Menü schließt nach der Navigation und auf Escape,
- Hinweis auf 375 px: 261 px hoch, kein horizontales Scrollen, Buttons nebeneinander.

**Zustimmungspfade im Browser getestet:**

| Prüfung | Ergebnis |
| --- | --- |
| Erster Besuch | Hinweis sichtbar, sechs Detailpunkte aufklappbar, kein iframe im DOM |
| Buttons | beide 210 × 46 px, gleich groß |
| „Ablehnen" | speichert `rejected`, iframe bleibt aus, Sperrhinweis und externer Link mit `noopener noreferrer` sichtbar |
| Reload nach Ablehnen | Hinweis bleibt aus, iframe bleibt aus |
| Footer-Einstellungen | öffnet den Hinweis erneut |
| „Akzeptieren" | speichert `accepted`, iframe mit korrekter `sibforms.com/serve/…`-Adresse wird geladen |
| Reload nach Akzeptieren | Formular bleibt vorhanden |
| Widerruf auf „Ablehnen" | iframe wird sofort aus dem DOM entfernt |
| Escape | speichert `rejected` |

Screenshots wurden während der Prüfung erzeugt und danach wieder aus dem
Repository entfernt (keine generierten Artefakte in Git).

**Früher gefunden und behoben:** Bei 701–900 px erzeugte `min-height: 260px`
am Hero-Bild einen horizontalen Scrollbalken; behoben. Nach Einbau der echten
Fotos wurde `align-items` der Hero-Zeile für diesen Bereich auf `start`
gesetzt. Beides in späteren Läufen erneut fehlerfrei.

**Geprüft, aber nicht als Fehler gewertet:** Lazy geladene Bilder außerhalb des
sichtbaren Bereichs haben vor dem Scrollen noch keine Abmessungen. Nach dem
Scrollen sind alle Bilder vollständig vorhanden. Die tatsächliche Darstellung
des Brevo-Formulars konnte in der Sandbox nicht geladen werden (Netzwerk
gesperrt); Höhe und Inhalt sollten einmal im echten Browser auf der Live-Domain
gesichtet werden.

## Implementierte, aber nicht automatisiert gemessene Punkte

- Breakpoints bei 700, 900 (Hero und Galerie) und 1100 px, dazu Breitbild ab 1600 px.
- Sichtbare Fokuszustände, Skip-Link, semantische Navigation, deutscher
  Dokumenttitel, beschreibende Alt-Texte, `prefers-reduced-motion`.
- Feste Bildformate gegen Layoutverschiebungen, `object-fit: cover` mit
  zentral einstellbarer `position`.
- Kontraste und Lesbarkeit wurden visuell anhand der Screenshots beurteilt,
  nicht mit einem automatisierten WCAG-Audit gemessen.

## Vercel

Vor der ersten Behebung meldeten die Deployments zwar „Deployment has completed",
die Produktionsdomain lieferte aber `404 NOT_FOUND`. Nach frischen Deployments
auf `main` sind Startseite, `/about-us`, `/anmeldung`, `/robots.txt` und
`/sitemap.xml` erreichbar. Ursache und dauerhaft nötige Dashboard-Einstellungen
stehen in [vercel.md](vercel.md).

## Vor öffentlicher Freigabe

- **Impressum, Datenschutzerklärung, Veranstalter-/Kontaktangaben** ergänzen.
  Der Zustimmungshinweis ersetzt diese Angaben nicht.
- **Im Brevo-Formular** die Standard-Hilfetexte, den Tippfehler und einen
  eigenen Datenschutzhinweis bzw. eine Einwilligung prüfen.
- Die tatsächliche Formularhöhe und -darstellung auf der Live-Domain sichten;
  bei Bedarf `embedHeight` in `src/config/registration.ts` anpassen.
- Bei künftigen weiteren externen Diensten (Analytics, Karten, Videos) die
  Zustimmung als echte Ladeschranke erweitern.
