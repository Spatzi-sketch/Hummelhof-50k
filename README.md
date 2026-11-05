# Hummelhof 50K

Deutschsprachige Website für die **50 Loop Sulmlof Challenge** am **5. Dezember 2026**. Drei echte Seiten, keine Datenbank, kein Backend, kein Tracking. Das bereitgestellte Logo wird unverändert verwendet.

## Seiten und Technik

- `/` – Home: Einstieg, Eventdaten, Challenge, Community, Bildbereiche, Geschichte und Anmeldung
- `/about-us` – persönliche Entstehungsgeschichte, Community-Gedanke und Erklärung
- `/anmeldung` – Eventinfos und ehrlicher Platzhalter für die spätere Anmeldung
- Eigene 404-Seite

Next.js 16 App Router, React 19, TypeScript, normales responsives CSS. Manrope und DM Sans werden über npm **lokal** ausgeliefert, keine Google-Fonts-Abfragen im Browser. Statische Seitengenerierung, nur die mobile Navigation benötigt Client-Logik. Fotos werden über Next Image responsiv optimiert. Keine API-Schlüssel erforderlich.

```text
src/app/                 Seiten, Metadaten, globale Styles, Favicon
src/components/          Header, Footer, Buttons, Bilder, Eventdaten, Runden-Grafik
src/config/event.ts      Datum, Ort, Distanzen, persönliche Bestzeit
src/config/images.ts     Alle Bilder mit Alt-Text, Ausschnitt und Platzhalterstatus
src/config/registration.ts  Zentraler Anmeldelink und Darstellungsmodus
src/config/site.ts       Automatische Vercel-Domain für Social-Metadaten
public/images/           Logo und lokale Bildplatzhalter / spätere Fotos
docs/design-research.md  Recherche, Konzept und Grenzen der Analyse
tests/check.mjs          HTTP-, Link-, Metadaten- und Ressourcenprüfung
```

## Eigene Fotos hochladen und austauschen

1. In GitHub `public/images/` öffnen → **Add file → Upload files**.
2. Foto als JPG oder WebP hochladen, z. B. `hero.jpg`. Möglichst unter 500 KB; für große Hero-Fotos maximal etwa 1 MB. Keine Handy-Originale mit 10 MB hochladen.
3. In `src/config/images.ts` beim gewünschten Motiv `src` ändern, einen passenden Alt-Text schreiben und `placeholder: false` setzen.
4. Bei Bedarf `position` ändern: z. B. `'center 35%'` oder `'60% center'`. Damit lässt sich der Zuschnitt verschieben, ohne das Foto zu verzerren.
5. Die Bildunterschrift bei der Verwendung auf der jeweiligen Seite bearbeiten. Sie beschreibt aktuell bewusst einen Platzhalter.

Beispiel für den Eintrag `hero`:

```ts
hero: {
  src: '/images/hero.jpg',
  alt: 'Beschreibe hier knapp, was auf deinem Foto tatsächlich zu sehen ist',
  position: 'center 40%',
  placeholder: false,
},
```

Alle Komponenten beziehen ihre Bildpfade ausschließlich aus dieser Konfiguration. Ein Bild kann auf mehreren Seiten erscheinen. Nutze nur Bilder mit passenden Nutzungsrechten und Einwilligung erkennbarer Personen.

| Konfigurationsschlüssel / aktuelle Datei | Verwendung                | Empfohlenes echtes Motiv                              | Darstellungsformat                | Empfohlene Auflösung                   |
| ---------------------------------------- | ------------------------- | ----------------------------------------------------- | --------------------------------- | -------------------------------------- |
| `hero` / `hero.svg`                      | Home, breiter Einstieg    | Waldweg oder Lauf am Hummelhof mit ruhigem Bildaufbau | Desktop ca. 3:1, mobil ca. 4:3    | 2400 × 1600 px, wichtiges Motiv mittig |
| `location` / `event-location.svg`        | Home, Community-Abschnitt | Tatsächliche Runde / Weg am Hummelhof                 | ca. 1:1                           | 1400 × 1400 px                         |
| `detail` / `running-detail.svg`          | Home, zweites Galeriebild | Schuhe, Schritte oder anderes echtes Laufdetail       | Desktop ca. 5:4, mobil Hochformat | 1200 × 1500 px                         |
| `community` / `community.svg`            | Home, Galerie; About Us   | Echte Community, mit Einverständnis                   | variabel ca. 3:2 bis Hochformat   | 1800 × 1600 px mit Beschnittreserve    |
| `about` / `about-event.svg`              | About Us, Einstieg        | Persönliches Foto vom Lauf                            | Desktop ca. 2,7:1, mobil ca. 4:3  | 2400 × 1600 px                         |
| `logo` / `logo.png`                      | Header und Footer         | Bereits bereitgestelltes Eventlogo                    | 1:1, nicht beschnitten            | Original 500 × 500 px                  |

Die SVGs sind kleine, selbst erstellte **Illustrationen**, keine echten Fotos und keine Darstellung der tatsächlichen Strecke. Für Fotos erscheinen automatisch optimierte Größen; Alt-Texte und Ausschnitt lassen sich zentral einstellen. Das Logo als Favicon liegt zusätzlich in `src/app/icon.png` und `src/app/apple-icon.png`; bei Logoänderung diese beiden Dateien ebenfalls ersetzen.

## Texte und Eventinformationen ändern

- Gemeinsame Fakten in `src/config/event.ts` bearbeiten. Diese werden auf allen Seiten wiederverwendet.
- Erzähltexte direkt in `src/app/page.tsx`, `src/app/about-us/page.tsx` und `src/app/anmeldung/page.tsx` bearbeiten. Nur den sichtbaren deutschen Text zwischen den HTML-Tags ersetzen.
- Header in `src/components/Header.tsx`, Footer und gemeinsame Abschnitte in `src/components/shared.tsx`.
- Farben und Abstände in `src/app/globals.css`, Farbtöne stehen ganz oben unter `:root`.
- Seitentitel und Beschreibungen im jeweiligen `metadata`-Export; Standard-Metadaten in `src/app/layout.tsx`.

## Echtes Anmeldeformular ergänzen

Nur `src/config/registration.ts` öffnen:

```ts
export const registration: { registrationUrl: string; mode: "link" | "embed" } =
  {
    registrationUrl: "", // Hier später die vollständige echte https-URL eintragen
    mode: "link",
  };
```

- **Keine URL:** Alle Anmeldelinks bleiben auf `/anmeldung`, kein Formular und keine Datenerfassung.
- **URL + `mode: 'link'`:** Alle Anmeldebuttons führen direkt zum echten Formular. Auch `/anmeldung` bietet dann den echten Formularlink.
- **URL + `mode: 'embed'`:** Buttons führen zur Anmeldeseite; dort wird ein beschriftetes iframe geladen. Der Anbieter muss Einbettung erlauben. Mit dem späteren Anbieter sind Datenschutz, Cookies, Barrierefreiheit und die nötige iframe-Höhe erneut zu prüfen. Die Höhe steht bei `.registration-frame` im CSS.

Die Beschreibung der Anmeldeseite in ihrem `metadata`-Export bei Freischaltung ebenfalls aktualisieren.

## Lokal entwickeln und prüfen

Voraussetzung: Node.js 22 LTS, npm.

```bash
npm ci
npm run dev
# http://localhost:3000
npm run typecheck
npm run build
# HTTP-Prüfung bei laufendem dev- oder Produktionsserver:
npm test
```

Für eine produktionsnahe Prüfung nach dem Build `npm start` verwenden. `TEST_URL` kann einen anderen Testserver vorgeben. `npm test` prüft alle drei Seiten, H1, deutsche Seitensprache, Beschreibungen, interne Links/Bild-/Skriptressourcen, inaktiven Formularstatus und 404. Der Test des inaktiven Formularstatus muss bei späterer Freischaltung angepasst werden.

## Mit Vercel veröffentlichen

1. Sicherstellen, dass diese Dateien im gewünschten GitHub-Branch gespeichert/gepusht sind. Diese Arbeitsversion befindet sich auf `arena/217f1e98-hummelhof-50k`, nicht auf `main`.
2. In Vercel **Add New → Project**, GitHub verbinden und `Spatzi-sketch/Hummelhof-50k` importieren.
3. Falls `main` noch leer ist: entweder den Arbeitsbranch zuerst per Pull Request übernehmen oder ihn in Vercel als **Production Branch** auswählen.
4. Framework **Next.js**, Root Directory Repository-Wurzel, Build Command `npm run build`; Output Directory automatisch lassen. Node.js **22.x** wählen.
5. **Deploy**. Kein Backend, keine Datenbank und keine geheimen Variablen erforderlich.
6. Optional unter Domains eigene Domain hinzufügen. Für Social-Metadaten wird die Vercel-Produktionsdomain automatisch genutzt. Bei eigener Domain `NEXT_PUBLIC_SITE_URL` auf die vollständige https-Adresse setzen und erneut deployen.
7. Künftige GitHub-Änderungen am Production Branch lösen automatisch ein neues Deployment aus. Preview-Deployments vor Übernahme nutzen.

## Was noch offen ist

- Eigene Fotos und dazu passende Bildunterschriften; aktuell klar markierte Illustrationen.
- Echte Anmelde-URL bzw. Formular, genaue Startzeit und weitere organisatorische Informationen wurden nicht geliefert und nicht erfunden.
- Keine erfundenen Sponsoren, Preise, Social-Accounts oder Kontaktangaben.
- Veranstalter-/Kontaktinformationen fehlen. Vor öffentlicher Veröffentlichung prüfen, ob Impressum/Offenlegung und Datenschutzhinweise benötigt werden, insbesondere für Hosting und spätere Formularanbieter. Dafür keine Fantasiedaten oder scheinbar fertigen Rechtstexte eingesetzt.

## Qualitätsstand

Produktionsbuild und TypeScript geprüft. HTTP-/Ressourcentests siehe `docs/quality.md`. Responsive Layouts, Tastaturfokus, Skip-Link, reduzierte Bewegung und mobile Navigation sind implementiert. Eine vollständige visuelle und interaktive Browserprüfung konnte in der Sandbox **nicht** ausgeführt werden: Browserdownload blockiert, alternativem Chromium fehlen Systembibliotheken. Vor öffentlichem Start deshalb alle drei Seiten in der Live-Vorschau bei 375, 768 und 1440 px prüfen, mobile Navigation mit Tastatur und Escape testen sowie Browserkonsole kontrollieren. Nicht als bereits bestandene visuelle Prüfung verstehen.

Recherche und eigenständiges Designkonzept: [docs/design-research.md](docs/design-research.md).
