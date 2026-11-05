# Vercel: Veröffentlichen und Fehlersuche

Stand: 5. November 2026. Diese Datei erklärt, warum die Website trotz erfolgreichem
Build nicht sichtbar war und welche Einstellungen in Vercel nötig sind.

## Befund der Analyse

| Prüfung | Ergebnis |
| --- | --- |
| `npm ci`, `npm run build`, `npm run typecheck`, `npm test` lokal | alle erfolgreich |
| Vercel-Deployment-Status auf GitHub (`main`, 20:13 UTC) | „Deployment has completed" – der Build lief auch bei Vercel durch |
| Aufruf `https://hummmelhof.vercel.app/` | `404 NOT_FOUND` von der Vercel-Plattform |
| Aufruf `https://hummmelhof-velocity-crash.vercel.app/` | Vercel-Login-Seite („Protected Deployment") |
| Produktionsserver `next start` lokal | alle drei Seiten, Bilder, Icons, `robots.txt`, `sitemap.xml` mit HTTP 200 |

**Daraus folgt:** Die Anwendung selbst ist in Ordnung. Das Problem liegt nicht im
Quellcode, sondern in der Konfiguration des Vercel-Projekts. Ein 404 der
Vercel-Plattform auf der Startseite und eine Login-Aufforderung sind typisch für
eine falsche Domain, einen aktiven Deployment-Schutz oder ein Projekt, das beim
Import mit falschem Framework/Root-Verzeichnis angelegt wurde. Solche
Kontoeinstellungen können nicht aus dem Repository heraus geändert werden.

## Was im Repository dafür geändert wurde

| Datei | Zweck |
| --- | --- |
| `vercel.json` | Erzwingt Framework `nextjs`, `npm ci` und `npm run build`. Diese Werte überschreiben die Build-Einstellungen im Vercel-Dashboard. |
| `package.json` → `engines.node: "22.x"` | Legt Node.js 22 fest. Damit ist das Projekt unabhängig von der im Dashboard eingestellten Node-Version. |
| `.nvmrc` | Node.js 22 für lokale Entwicklung und andere Hosting-Anbieter. |
| `next.config.mjs` | Reine JavaScript-Konfiguration statt `next.config.ts` – beim Build wird kein TypeScript-Config-Loader mehr benötigt. |
| `src/config/site.ts` | Erkennt die Vercel-Domain automatisch. Eine fehlerhafte `NEXT_PUBLIC_SITE_URL` lässt den Build nicht mehr abbrechen. |
| Favicons | Das bereitgestellte Logo ist jetzt als kleines `icon.png`, `apple-icon.png` und `favicon.ico` optimiert eingebunden. |

## Einmalig in Vercel richtig einstellen

Projekt in Vercel öffnen (`velocity-crash / hummmelhof`), dann der Reihe nach:

1. **Domains:** Die tatsächlich zugewiesene Adresse steht unter *Settings → Domains*.
   Nur diese Adresse verwenden. Die im GitHub-Repository hinterlegte Adresse
   `hummmelhof.vercel.app` liefert aktuell 404 und gehört offenbar nicht zu diesem
   Projekt – sie ist nicht die Veröffentlichungsadresse.
2. **Deployment Protection:** *Settings → Deployment Protection → Vercel
   Authentication* auf **Disabled** stellen (oder zumindest für Production
   deaktivieren). Solange der Schutz aktiv ist, sehen Besucher statt der Website
   eine Vercel-Anmeldeseite. Das ist die häufigste Ursache für „die Seite geht
   nicht".
3. **Git → Production Branch:** `main`. Nur Commits auf `main` erzeugen die
   Produktionsveröffentlichung; andere Branches erzeugen Preview-Deployments,
   die standardmäßig geschützt sind.
4. **Root Directory:** Repository-Wurzel (`./`, Feld leer). **Muss** stimmen:
   `package.json`, `vercel.json` und `src/` liegen direkt im Wurzelverzeichnis.
   Ein Root Directory wie `public` oder ein Unterordner führt zu 404.
5. **Build and Deployment:** Framework **Next.js**, Build Command `npm run build`,
   Install Command `npm ci`, Installations-/Ausgabeverzeichnis nicht abweichend
   setzen. Durch `vercel.json` sind diese Werte bereits festgelegt; zur Sicherheit
   aber im Dashboard gegensätzliche Einträge entfernen.
6. **Node.js Version:** 22.x. Wird durch `engines` in `package.json` gesetzt.

> **Wenn das Projekt schon beim ersten Import falsch angelegt wurde**, ist ein
> Neuanlegen meist schneller als die Suche nach einzelnen Feldern:
> *Settings → General → Delete Project*, danach *Add New → Project → Import
> Git Repository* → `Spatzi-sketch/Hummelhof-50k` → Production Branch `main` →
> **Deploy** ohne Änderungen an Framework, Root oder Build Command. Die Werte aus
> `vercel.json` werden automatisch übernommen.

## Veröffentlichung auslösen und prüfen

1. Änderungen auf `main` speichern/pushen (oder in Vercel *Deployments → Redeploy*).
2. Warten, bis das Deployment „Ready" ist. In GitHub erscheint beim Commit ein
   grüner Vercel-Status.
3. Die unter *Domains* angezeigte Adresse in einem **privaten Browserfenster**
   öffnen. Es muss die Startseite erscheinen – keine Anmeldung, kein 404.
4. `/about-us` und `/anmeldung` direkt aufrufen. Beide Seiten müssen ohne
   Umleitung funktionieren.
5. Optional eigene Domain hinzufügen. Danach `NEXT_PUBLIC_SITE_URL` mit
   vollständiger `https://`-Adresse setzen und erneut deployen, damit
   Open-Graph-Links, Canonical-URLs und Sitemap stimmen.

## Häufige Fehlerbilder

| Anzeige | Ursache | Lösung |
| --- | --- | --- |
| `404 NOT_FOUND` (Vercel-Plattformseite) | Falsche Domain, falscher Production Branch oder falsches Root Directory | Domains, Git-Einstellungen und Root Directory prüfen |
| Vercel-Login statt Website | Deployment Protection aktiv | Vercel Authentication deaktivieren |
| Leere Seite / nur Bilder-Ordner | Framework Preset „Other" mit falschem Output Directory | `vercel.json` wirkt nach neuem Deploy; notfalls Projekt neu importieren |
| Build bricht ab mit Node-Fehler | Zu alte oder zu neue Node-Version | `engines` auf `22.x` belassen, Dashboard-Einstellung prüfen |
| Änderungen erscheinen nicht | Anderer Branch deployed / Browser-Cache | Production Branch `main`, Redeploy, privates Fenster |

Keine Datenbank, keine API-Schlüssel, keine Umgebungsvariablen und kein Backend
sind erforderlich. Alle drei Seiten werden beim Build statisch erzeugt.
