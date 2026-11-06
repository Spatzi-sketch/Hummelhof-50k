# Hummelhof 50K

Deutschsprachige Website für die **50 Loop Hummelhof Challenge** am **5. Dezember 2026**.
Drei eigene Seiten, kein Backend, keine Datenbank, kein Tracking. Das
bereitgestellte Eventlogo ist als Logo **und** als Favicon eingebunden.

Das Projekt ist so vorbereitet, dass es direkt mit Vercel verbunden und
veröffentlicht werden kann. Falls die Seite nach dem Deploy nicht erscheint:
[docs/vercel.md](docs/vercel.md) enthält die genaue Ursachenanalyse und eine
Schritt-für-Schritt-Anleitung.

---

## 1. Seiten und Technik

| URL | Inhalt |
| --- | --- |
| `/` | Home: Einstieg, Eventdaten, Challenge, Community, Bildbereiche, Geschichte, Anmeldung |
| `/about-us` | Ausführliche Entstehungsgeschichte, Community-Gedanke, Erklärung der Challenge |
| `/anmeldung` | Eventinfos und klar erkennbarer Platzhalter für das spätere Formular |
| `/does-not-exist` | Eigene 404-Seite |

**Technik:** Next.js 16 (App Router), React 19, TypeScript, responsives CSS ohne
Framework. Manrope und DM Sans werden lokal über npm ausgeliefert, also ohne
Google-Fonts-Anfrage im Browser. Alle drei Seiten werden beim Build statisch
vorgerendert; nur die mobile Navigation benötigt JavaScript im Browser.
`next/image` sorgt für responsive, optimierte Bilder. Es sind keinerlei
API-Schlüssel oder Umgebungsvariablen nötig.

---

## 2. Ordnerstruktur

```text
Hummelhof-50k/
├── vercel.json                 Vercel: Framework, Install- und Build-Befehl (erzwingt Next.js)
├── package.json / package-lock.json   Abhängigkeiten, Skripte, Node.js 22
├── .nvmrc                     Node.js 22 für lokale Entwicklung
├── next.config.mjs            Next.js-Konfiguration (reines JavaScript)
├── public/
│   ├── images/                ALLE Bilder (Logo + 8 komprimierte WebP-Fotos)
│   └── favicon.ico            Favicon für Browser, die /favicon.ico anfragen
├── src/
│   ├── app/
│   │   ├── layout.tsx         Gemeinsames Layout, Standard-Metadaten, Favicons
│   │   ├── page.tsx           Home
│   │   ├── about-us/page.tsx  About Us
│   │   ├── anmeldung/page.tsx Anmeldung
│   │   ├── not-found.tsx      404-Seite
│   │   ├── globals.css        Alle Styles, Farben und Breakpoints
│   │   ├── icon.png           Favicon (aus dem Eventlogo, optimiert)
│   │   ├── apple-icon.png     Apple-Touch-Icon
│   │   ├── robots.ts          Erzeugt /robots.txt
│   │   └── sitemap.ts         Erzeugt /sitemap.xml
│   ├── components/
│   │   ├── Header.tsx         Navigation inkl. mobiler Menülogik
│   │   └── shared.tsx         Buttons, Fotos, Fakten, Footer, Runden-Grafik
│   └── config/
│       ├── event.ts           Datum, Ort, Distanzen, Bestzeit, Wochentag
│       ├── images.ts          ALLE Bildpfade, Alt-Texte, Ausschnitte
│       ├── registration.ts    Zentrale Anmelde-URL (registrationUrl) und Modus
│       ├── site.ts            Domain für Metadaten/Sitemap (auf Vercel automatisch)
│       └── seo.ts             Einheitliche Seitentitel und Social-Metadaten
├── docs/
│   ├── design-research.md     Recherche und Gestaltungskonzept
│   ├── quality.md             Prüfprotokoll
│   └── vercel.md              Vercel-Einstellungen und Fehlersuche
└── tests/check.mjs            HTTP-, Link-, Metadaten- und Ressourcenprüfung
```

---

## 3. Eigene Fotos hochladen und austauschen

**Alle Bildpfade stehen ausschließlich in `src/config/images.ts`.** In keiner
Komponente ist ein Bildpfad fest eingeschrieben. Eingebunden sind aktuell die
acht gelieferten Fotos als komprimierte WebP-Dateien.

1. In GitHub den Ordner **`public/images/`** öffnen → **Add file → Upload files**.
2. Foto als JPG oder WebP hochladen. Die Originale waren 4032 × 3024 px und
   5–7 MB groß; eingebunden sind sie mit 1800 px Breite und ca. 240–790 KB.
   Bitte keine 10-MB-Handy-Originale hochladen – Next.js optimiert die
   Auslieferung zwar zusätzlich, ein moderates Ausgangsformat bleibt aber sinnvoll.
3. In **`src/config/images.ts`** beim gewünschten Motiv `src` (neuer Dateiname)
   und `alt` (echte Bildbeschreibung) ändern.
4. Optional `position` anpassen, z. B. `'center 35%'` oder `'40% center'`.
   Damit verschiebt sich der Zuschnitt, ohne dass das Foto verzerrt wird.
5. Bei Bedarf die Bildunterschrift auf der jeweiligen Seite anpassen.

Beispiel:

```ts
hero: {
  src: '/images/hero.jpg',
  alt: 'Beschreibe knapp, was auf deinem Foto tatsächlich zu sehen ist',
  position: 'center 55%',
},
```

| Schlüssel / Datei | erscheint auf | Motiv | Zuschnitt | Empfohlene Auflösung |
| --- | --- | --- | --- | --- |
| `hero` / `hero.webp` | Home, großes Einstiegsbild | Geschwungener Weg mit Bank und Bäumen | Desktop 3:1, Tablet 2,1:1, mobil 1,35:1 | 1800–2400 × 1350–1800 px |
| `location` / `location.webp` | Home, Community-Abschnitt | Weg mit Böschung und Spielanlage | ca. 1,05:1 | 1800 × 1350 px |
| `community` / `community.webp` | Home, Galerie; About Us | Sonne und Nebel über Wiese und Weg | Galerie 1,6:1 / About 1,05:1 | 1800 × 1350 px |
| `sky` / `sky.webp` | Home, Galerie | Himmel mit Wolken über Baumkronen | ca. 1,05:1 | 1800 × 1350 px |
| `trail` / `trail.webp` | Home, Galerie | Waldweg im Gegenlicht | ca. 1,3:1 | 1800 × 1350 px |
| `grove` / `grove.webp` | Home, Galerie | Sonne zwischen Laub- und Nadelbäumen | ca. 0,9:1 (Hochformat) | 1800 × 1350 px mit Beschnittreserve |
| `canopy` / `canopy.webp` | Home, Galerie, breiter Abschluss | Nebliger Weg mit Sonnenstrahlen | ca. 2,5:1 | 1800 × 1350 px |
| `about` / `about.webp` | About Us, Einstieg | Geschwungener Weg, zweiter Ausschnitt | 2,7:1 | 1800–2400 × 1350–1800 px |
| `logo` / `logo.png` | Header, Footer, Social-Bild | Bereitgestelltes Eventlogo (unverändert) | 1:1 | 500 × 500 px |

Alle Fotos werden über `next/image` responsiv ausgeliefert. `object-fit: cover`
zusammen mit der zentralen `position` verhindert Verzerrungen und hält das
wichtige Motiv im Bild. Alt-Texte beschreiben nur, was tatsächlich zu sehen ist.
Nutze nur Bilder, an denen du die Rechte hast, und hole für erkennbare Personen
eine Einwilligung ein.

**Logo/Favicon austauschen:** `public/images/logo.png` ersetzen (gleicher
Dateiname = kein Code nötig). Für die Favicons `src/app/icon.png`,
`src/app/apple-icon.png` und `public/favicon.ico` ebenfalls neu erzeugen/ersetzen.
Die aktuellen Favicons sind aus dem gelieferten Logo verkleinert und optimiert.

---

## 4. Texte und Eventinformationen ändern

- **Eventname und Fakten (Datum, Ort, 50 km, 50 Runden, 1 km, 5:36 h):**
  `src/config/event.ts`. Diese Werte erscheinen automatisch auf allen Seiten –
  auch in Seitentiteln, Header-Unterzeile, Hero, Footer und Sitemap. Der Name
  lautet aktuell **50 Loop Hummelhof Challenge**, Kurzform **Hummelhof 50K**.
- **Erzähltexte:** `src/app/page.tsx`, `src/app/about-us/page.tsx`,
  `src/app/anmeldung/page.tsx`. Nur den sichtbaren deutschen Text zwischen den
  Tags ändern.
- **Navigation, Footer, Buttons, Bildunterschriften:**
  `src/components/Header.tsx` und `src/components/shared.tsx`.
- **Farben, Abstände, Schriftgrößen:** `src/app/globals.css`; die Farbtöne
  stehen ganz oben unter `:root`.
- **Seitentitel und Beschreibungen:** in den drei Seitendateien bei
  `pageMetadata({ ... })`. Der gemeinsame Aufbau steht in `src/config/seo.ts`.

---

## 5. Echtes Anmeldeformular ergänzen

**Nur eine Datei ändern:** `src/config/registration.ts`

```ts
export const registration: { registrationUrl: string; mode: "link" | "embed" } = {
  registrationUrl: "",   // hier später die vollständige https-URL eintragen
  mode: "link",
};
```

| Einstellung | Wirkung |
| --- | --- |
| `registrationUrl: ""` | Alle Anmelde-Buttons führen zur Informationsseite `/anmeldung`. Kein Formular, keine Datenerfassung. |
| URL + `mode: "link"` | **Alle** Anmelde-Buttons (Header, Home, About Us, Footer, Anmeldeseite) zeigen direkt auf das echte Formular. |
| URL + `mode: "embed"` | Buttons führen auf `/anmeldung`; dort wird das Formular in einem beschrifteten iframe angezeigt. Der Anbieter muss Einbettung erlauben (Datenschutz und Datenerfassung dann separat prüfen). |

Danach die Beschreibung im `metadata`-Block von `src/app/anmeldung/page.tsx`
anpassen und in `tests/check.mjs` die Prüfung auf den inaktiven Zustand
entsprechend ändern. Es ist bewusst **keine** erfundene URL und **kein**
scheinbar funktionierendes Formular eingebaut.

---

## 6. Mit Vercel veröffentlichen

1. Sicherstellen, dass die Dateien auf **`main`** liegen (Produktionsbranch).
2. In Vercel **Add New → Project**, GitHub verbinden,
   `Spatzi-sketch/Hummelhof-50k` importieren.
3. **Root Directory leer / `./`**, Production Branch `main`, Framework
   **Next.js**. Build- und Install-Befehle werden durch `vercel.json`
   automatisch gesetzt. Node.js 22 wird über `package.json` festgelegt.
4. **Deploy** klicken. Keine Umgebungsvariablen, keine Geheimnisse nötig.
5. Die tatsächliche Adresse unter **Settings → Domains** ablesen. Falls eine
   Vercel-Anmeldeseite erscheint: **Settings → Deployment Protection →
   Vercel Authentication deaktivieren**.
6. Künftige Änderungen auf `main` lösen automatisch ein neues Deployment aus.
   Für eine erneute Veröffentlichung ohne Codeänderung: in Vercel
   **Deployments → ⋯ → Redeploy**.

> **Aktueller Stand (6. November 2026):** Nach dem Merge auf `main` ist die
> Website unter **`https://hummmelhof.vercel.app`** online; alle drei Seiten,
> `robots.txt` und `sitemap.xml` wurden live geprüft. Das letzte Deployment
> enthält den korrigierten Eventnamen und die acht echten Fotos. Vorher lieferte diese
> Adresse `404 NOT_FOUND`, weil kein aktuelles Produktionsdeployment auf `main`
> lag – das war eine Vercel-Einstellung, kein Codefehler. Damit das so bleibt:
> Änderungen immer auf `main` übernehmen und den Deployment-Schutz für die
> Produktionsdomain deaktiviert lassen. Die vollständige Analyse, alle nötigen
> Dashboard-Einstellungen und eine Tabelle typischer Fehlerbilder stehen in
> **[docs/vercel.md](docs/vercel.md)**.

Für Social-Metadaten wird die Vercel-Produktionsdomain automatisch erkannt. Bei
eigener Domain `NEXT_PUBLIC_SITE_URL` auf die vollständige `https://`-Adresse
setzen und erneut deployen.

---

## 7. Lokal entwickeln und prüfen

Voraussetzung: Node.js 22 LTS und npm.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
npm start            # Produktionsserver
npm test             # gegen laufenden Server, TEST_URL überschreibbar
```

`npm test` prüft alle drei Seiten, genau ein H1 pro Seite, deutsche Sprache,
Meta-Beschreibung, Canonical, Open Graph, interne Links, alle Bild-/Icon- und
Skriptressourcen, den inaktiven Anmeldestatus, `robots.txt`, `sitemap.xml` und
die 404-Seite.

---

## 8. Was aktuell Platzhalter bzw. offen ist

- **Anmeldung:** noch keine echte URL, daher Informationsseite mit
  „Die Anmeldung wird in Kürze freigeschaltet." Kein Formular.
- **Genaue Startzeit, Veranstalter-/Kontaktangaben, Impressum/Datenschutz**
  wurden nicht geliefert und nicht erfunden. Vor dem öffentlichen Start prüfen,
  welche rechtlichen Angaben erforderlich sind.
- Keine erfundenen Sponsoren, Startgebühren, Preise, Partner, Social-Accounts
  oder Verpflegungsstationen.
- Die Social-Media-Vorschau verwendet derzeit das Eventlogo als Bild.

---

## 9. Qualitätsstand

Produktionsbuild, TypeScript und HTTP-Tests sind erfolgreich; alle acht Fotos
werden dabei auf Einbindung und Erreichbarkeit geprüft. Zusätzlich wurden alle
drei Seiten im echten Browser bei **375, 768, 1440 und 1920 px** geprüft: keine
horizontalen Scrollbalken, keine überstehenden Elemente, alle Bilder geladen,
keine Platzhalter-Labels, keine Konsolenfehler. Die mobile Navigation öffnet,
navigiert korrekt, schließt nach Klick und reagiert auf Escape. Details:
[docs/quality.md](docs/quality.md).

Gestaltungsrecherche und eigenständiges Designkonzept:
[docs/design-research.md](docs/design-research.md).
