# Hummelhof 50K

Deutschsprachige Website für die **50 Loop Hummelhof Challenge** am **5. Dezember 2026**.
Vier eigene Seiten, kein Backend, keine Datenbank, kein eigenes Tracking. Das
bereitgestellte Eventlogo ist als Logo **und** als Favicon eingebunden. Das
Anmeldeformular von Brevo ist eingebunden und wird erst nach ausdrücklicher Zustimmung geladen.

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
| `/faq` | Häufige Fragen zu Ablauf, Anreise, Strecke und Versorgung |
| `/anmeldung` | Eventinfos und eingebettetes Anmeldeformular (erst nach Zustimmung) |
| `/does-not-exist` | Eigene 404-Seite |

**Technik:** Next.js 16 (App Router), React 19, TypeScript, responsives CSS ohne
Framework. Manrope und DM Sans werden lokal über npm ausgeliefert, also ohne
Google-Fonts-Anfrage im Browser. Alle vier Seiten werden beim Build statisch
vorgerendert. JavaScript im Browser brauchen die mobile Navigation, der
Zustimmungshinweis und das Laden des Formulars. `next/image` sorgt für
responsive, optimierte Bilder. Es sind keinerlei API-Schlüssel oder
Umgebungsvariablen nötig.

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
│   │   ├── faq/page.tsx       FAQ
│   │   ├── anmeldung/page.tsx Anmeldung
│   │   ├── not-found.tsx      404-Seite
│   │   ├── globals.css        Alle Styles, Farben und Breakpoints
│   │   ├── icon.png           Favicon (aus dem Eventlogo, optimiert)
│   │   ├── apple-icon.png     Apple-Touch-Icon
│   │   ├── robots.ts          Erzeugt /robots.txt
│   │   └── sitemap.ts         Erzeugt /sitemap.xml
│   ├── components/
│   │   ├── Header.tsx         Navigation inkl. mobiler Menülogik
│   │   ├── CookieConsent.tsx  Zustimmungshinweis (Akzeptieren / Ablehnen)
│   │   ├── ConsentSettingsButton.tsx  Footer: Auswahl jederzeit ändern
│   │   ├── RegistrationEmbed.tsx  Formular erst nach Zustimmung laden
│   │   └── shared.tsx         Buttons, Fotos, Fakten, Footer, Runden-Grafik
│   ├── config/
│   │   ├── consent.ts         ALLE Texte des Zustimmungshinweises
│   │   ├── event.ts           Datum, Zeiten, Orte, Anreise, Versorgung und Eventfakten
│   │   ├── images.ts          ALLE Bildpfade, Alt-Texte, Ausschnitte
│   │   ├── registration.ts    Anmelde-URL, Modus, Anbieter, iframe-Höhe
│   │   ├── site.ts            Domain für Metadaten/Sitemap (auf Vercel automatisch)
│   │   └── seo.ts             Einheitliche Seitentitel und Social-Metadaten
│   └── lib/
│       └── consent.ts         Gemeinsame Auswahl (localStorage, kein Cookie)
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

- **Eventname und Fakten (Datum, Zeiten, Standorte, Anreise, Versorgung, Distanzen und Bestzeit):**
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
- **Seitentitel und Beschreibungen:** in den vier Seitendateien bei
  `pageMetadata({ ... })`. Der gemeinsame Aufbau steht in `src/config/seo.ts`.

---

## 5. Anmeldeformular anpassen

**Das Formular ist eingebunden.** Es liegt als iframe auf `/anmeldung` und stammt von **Brevo (Sendinblue)**. Alle Einstellungen stehen ausschließlich in
`src/config/registration.ts`:

| Feld | Aktueller Wert / Wirkung |
| --- | --- |
| `enabled: true` | Die vorhandene Anmeldung ist aktiv. Mit `false` wird sie bei Bedarf deaktiviert. |
| `registrationUrl` | Die gelieferte `https://…sibforms.com/serve/…`-Adresse. Nur hier ändern, wenn ein neues Formular kommt. |
| `mode: "embed"` | Formular erscheint auf `/anmeldung` – **erst nach Zustimmung** im Hinweis (siehe Kapitel 6). Alle Anmelde-Buttons führen zur Anmeldeseite. |
| `mode: "link"` | Stattdessen öffnen **alle** Anmelde-Buttons das Formular direkt beim Anbieter. Ein Wort ändern, sonst nichts. |
| `registrationUrl: ""` | Formular deaktivieren: alle Buttons zeigen wieder die Informationsseite mit dem Hinweis „Die Anmeldung wird in Kürze freigeschaltet." |
| `provider` / `embedTitle` | Anbietername im Text und Beschriftung des iframe für Screenreader. |
| `embedHeight` | Höhe des iframe in Pixeln. Wirkt das Formular unten abgeschnitten, diesen Wert erhöhen – mehr ist nicht nötig. |

Brevo empfiehlt für seine Formulare genau diese iframe-Einbettung; der Anbieter
muss sie erlauben. Das Formular selbst wird nicht von dieser Website betrieben:
Eingaben gehen direkt an Brevo, hier gibt es keine Datenbank und keine
Anmeldedaten. Die Formularhöhe lässt sich in Brevo und über `embedHeight`
abstimmen.

> **Bitte im Brevo-Formular selbst prüfen:** Die gelieferte Version enthält noch
> die Standard-Hilfetexte („Passe diesen optionalen Hilfetext an …") und einen
> Tippfehler („angemdelten"). Außerdem sollte dort ein eigener
> Datenschutzhinweis bzw. eine Einwilligung für die Datenverarbeitung stehen.
> Das lässt sich nur in Brevo ändern, nicht im Code dieser Website.

---

## 6. Zustimmungshinweis (Cookies & externe Inhalte)

Die Website selbst setzt **keine Cookies, kein Tracking und keine Analyse**.
Erst durch das externe Formular kommt ein Drittanbieter ins Spiel. Deshalb
erscheint beim ersten Besuch auf jeder Seite ein dezenter Hinweis am unteren
Rand – ohne Overlay, ohne Animation, mit zwei gleich großen Buttons:

- **„Akzeptieren"** → das Brevo-Formular wird geladen; sonst nichts.
- **„Ablehnen"** → es wird keine Verbindung zu Brevo aufgebaut; auf
  `/anmeldung` bleibt das Formular ausgeblendet. Stattdessen gibt es einen
  selbst ausgelösten Link „Anmeldung extern öffnen".
- **„Alle Hinweise im Detail"** aufklappen: welche Daten das Formular abfragt,
  dass Verbindungsdaten an Brevo übertragen werden und dort Cookies gesetzt
  werden können, dass Vercel als Host technisch notwendige Verbindungsdaten
  verarbeitet, dass wir keine Werbung/Profilbildung/Weitergabe machen, und dass
  nur die Auswahl lokal gespeichert wird.
- **„Datenschutz-Einstellungen"** im Footer öffnet den Hinweis auf jeder Seite
  erneut. Ein Widerruf entfernt ein bereits geladenes Formular sofort.
- **Escape** entspricht „Ablehnen" (die datensparsamere Auswahl). Sichtbare
  Fokuszustände, `prefers-reduced-motion` und Tastaturbedienung sind
  berücksichtigt. Ohne JavaScript wird gar kein externes Formular geladen; der
  direkte Link bleibt nutzbar.

**Was gespeichert wird:** ausschließlich `accepted` oder `rejected` unter dem
Schlüssel `hummelhof-externe-inhalte-v1` im `localStorage` des Browsers – kein
Cookie, kein Server, kein Profil. Damit der Hinweis nicht bei jedem Besuch
kommt. Löschen der Browserdaten setzt die Auswahl zurück.

**Alles ohne Programmierung ändern:** Die kompletten Texte, die Buttonnamen und
der Speicherschlüssel stehen in `src/config/consent.ts`. Bei einer
inhaltlichen Änderung den Schlüssel auf `-v2` erhöhen – dann wird die
Auswahl für alle Besucherinnen und Besucher neu abgefragt. Die technische Logik
(`src/lib/consent.ts`) und die drei Komponenten müssen dafür nicht angefasst
werden.

---

## 7. Mit Vercel veröffentlichen

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
> `robots.txt` und `sitemap.xml` wurden live geprüft. Das aktuelle Deployment
> enthält den korrigierten Eventnamen, die acht echten Fotos, das eingebettete
> Anmeldeformular und den Zustimmungshinweis. Vorher lieferte diese
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

## 8. Lokal entwickeln und prüfen

Voraussetzung: Node.js 22 LTS und npm.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
npm start            # Produktionsserver
npm test             # gegen laufenden Server, TEST_URL überschreibbar
```

`npm test` prüft alle vier Seiten, genau ein H1 pro Seite, deutsche Sprache,
Meta-Beschreibung, Canonical, Open Graph, interne Links, alle Bild-/Icon- und
Skriptressourcen, den konfigurierten Anmeldestatus aus `registration.ts`, dass ohne
Zustimmung **kein** iframe ausgeliefert wird, den Footer-Link zum Ändern der
Auswahl, `robots.txt`, `sitemap.xml` und die 404-Seite.

---

## 9. Was aktuell Platzhalter bzw. offen ist

- **Impressum, Datenschutzerklärung, Veranstalter- und Kontaktangaben** sowie
  wurden für diese Website nicht geliefert und nicht erfunden. Vor dem öffentlichen Start prüfen, welche rechtlichen Angaben
  erforderlich sind – ein Zustimmungshinweis ersetzt sie nicht.
- **Das Brevo-Formular** wird von einem Drittanbieter betrieben; dessen eigene
  Datenschutzhinweise, Einwilligung im Formular und die Standard-Hilfetexte
  liegen außerhalb dieses Projekts (siehe Kapitel 5).
- Die Eventinformationen stehen in `src/config/event.ts`.
- Die Social-Media-Vorschau verwendet derzeit das Eventlogo als Bild.

---

## 10. Qualitätsstand

Produktionsbuild, TypeScript und HTTP-Tests sind erfolgreich; alle acht Fotos
werden auf Einbindung und Erreichbarkeit geprüft. Vor der Erweiterung wurden drei
Seiten im echten Browser bei **375, 768, 1440 und 1920 px** geprüft: keine
horizontalen Scrollbalken, keine überstehenden Elemente, alle Bilder geladen,
keine Konsolenfehler. Separat getestet: Hinweis erscheint nur ohne Auswahl,
„Ablehnen" und „Akzeptieren" speichern korrekt und bleiben nach einem Reload
erhalten, der iframe wird erst nach Zustimmung erzeugt und beim Widerruf
sofort entfernt, der externe Link ist mit `noopener` abgesichert, Escape
entspricht „Ablehnen", beide Buttons sind gleich groß. Die mobile Navigation
öffnet, navigiert korrekt, schließt nach Klick und reagiert auf Escape.
Details: [docs/quality.md](docs/quality.md).

Gestaltungsrecherche und eigenständiges Designkonzept:
[docs/design-research.md](docs/design-research.md).
