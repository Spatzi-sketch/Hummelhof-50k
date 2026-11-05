# Prüfprotokoll

5. November 2026

## Erfolgreich ausgeführt

- `npm run build`: alle drei Seiten und Icon-Routen statisch generiert, keine Build- oder TypeScript-Fehler.
- `npm run typecheck`: erfolgreich.
- `npm test` gegen laufenden Next-Server: alle drei URLs HTTP 200, je ein H1, deutsche Sprache und Meta-Beschreibung vorhanden. 30 interne Seiten-/Link-/Assetziele ohne fehlende Ressourcen. Ehrlich inaktiver Anmeldebereich ohne Formular. Nicht vorhandene URL liefert HTTP 404.
- `npm audit`: keine bekannten Schwachstellen zum Prüfzeitpunkt.
- Keine externen Fotodienste, Tracking-Skripte, Formularübermittlung oder Geheimnisse eingebaut.

## Implementiert, aber nicht als visuell bestanden ausweisen

- Breakpoints bei 700 und 1100 px, zusätzliche Breitbildanpassung.
- Mobile Navigation mit aria-expanded, eindeutiger Beschriftung, Schließen bei Navigation und Escape sowie Fokus auf dem Menüschalter.
- Sichtbare Fokuszustände, Skip-Link, semantische Navigation, deutscher Dokumenttitel und passende Bildbeschreibungen.
- Reduced Motion, feste Bildformate gegen Layoutverschiebungen, objektbasierter Bildausschnitt.

Der reguläre Playwright-Browserdownload scheiterte am eingeschränkten Netzwerk. Ein alternativ über npm verfügbarer Chromium konnte wegen fehlendem `libnspr4.so` nicht starten. Temporäre Browserabhängigkeiten wurden wieder entfernt. Deshalb keine behaupteten Screenshots, visuellen Tests oder erfolgreich geprüfte Browserkonsole.

## Vor öffentlicher Freigabe

Alle drei Seiten bei 375, 768 und 1440 px in der Live-Vorschau kontrollieren: keine Überlappungen oder horizontalen Scrollbalken, passende Fotoausschnitte, lesbare Texte und Kontraste. Navigation per Maus, Touch, Tab und Escape prüfen. Anmeldung muss noch als inaktiv erscheinen. Bei echtem Formular dessen Anbieter-/Datenschutz- und Einbettungsanforderungen gesondert kontrollieren. Veranstalter-/rechtliche Informationen ergänzen, soweit erforderlich.

## Erneute Prüfung und GitHub-Übertragung

Produktionsbuild nach Ergänzung von `next.config.ts` und Node.js-22-Vorgabe erneut erfolgreich. Die HTTP-Prüfung zusätzlich gegen `next start` auf Port 3001 ausgeführt: alle drei Seiten, 20 Produktions-Link-/Assetziele und 404 erfolgreich. TypeScript und `git diff --check` erfolgreich. Der frühere Test mit 30 Ressourcen bezog sich auf den Entwicklungsserver; im Produktionsbuild werden weniger separate Ressourcen geladen.
