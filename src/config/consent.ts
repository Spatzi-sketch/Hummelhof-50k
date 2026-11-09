import { registration } from "@/config/registration";

// Alle Texte und Einstellungen des Zustimmungshinweises.
// Reine Inhaltsdatei: Der Hinweis lässt sich hier ohne Programmierkenntnisse
// anpassen. Die technische Logik liegt in src/lib/consent.ts.
export const consent = {
  // Bei einer inhaltlichen Änderung des Hinweises den Schlüssel erhöhen
  // (z. B. ...-v2): dann wird die Entscheidung für alle erneut abgefragt.
  storageKey: "hummelhof-externe-inhalte-v1",
  regionLabel: "Hinweis zu externen Inhalten und deiner Auswahl",
  title: "Ein kurzer Hinweis zu deinen Daten",
  intro: registration.enabled
    ? "Diese Website selbst setzt keine Cookies, kein Tracking und keine Analyse. Für die Anmeldung binden wir ein Formular von Brevo (Sendinblue) ein. Es wird erst geladen, wenn du zustimmst."
    : "Diese Website selbst setzt keine Cookies, kein Tracking und keine Analyse. Die Anmeldung ist derzeit noch nicht freigeschaltet; es wird kein Anmeldeformular geladen.",
  detailsSummary: "Alle Hinweise im Detail",
  details: registration.enabled ? [
    "Beim Laden des Formulars werden Verbindungsdaten wie IP-Adresse und Browsertyp an Brevo übertragen; dort können Cookies gesetzt werden. Ohne deine Zustimmung baut diese Website keine Verbindung zu diesem Anbieter auf.",
    "Das Formular fragt personenbezogene Daten ab, unter anderem Vorname, Nachname, Geburtsdatum und E-Mail-Adresse. Diese Angaben gehen direkt an den Anbieter. Wir betreiben keine Datenbank und speichern auf dieser Website keine Anmeldedaten.",
    "Beim Aufruf der Seiten verarbeitet unser Hosting-Anbieter Vercel technisch notwendige Verbindungsdaten. Das ist keine Analyse und lässt sich nicht abwählen.",
    "Wir speichern ausschließlich deine Auswahl lokal in deinem Browser (localStorage, kein Cookie), damit dieser Hinweis nicht bei jedem Besuch erscheint. Keine Werbung, keine Profilbildung, keine Weitergabe durch uns.",
    "„Ablehnen“ lässt das Formular ausgeblendet. Du kannst es dann über „Anmeldung extern öffnen“ selbst aufrufen oder deine Entscheidung jederzeit über „Datenschutz-Einstellungen“ im Footer ändern. Für den Formularanbieter gelten dessen eigene Datenschutzhinweise.",
    "„Akzeptieren“ lädt ausschließlich dieses Anmeldeformular. Es werden dadurch keine weiteren Dienste, Analysen oder Werbenetzwerke aktiviert.",
  ] : [
    "Die Anmeldung ist derzeit nicht freigeschaltet. Es wird kein Formular geladen und keine Verbindung zum Formularanbieter aufgebaut.",
    "Beim Aufruf der Seiten verarbeitet unser Hosting-Anbieter Vercel technisch notwendige Verbindungsdaten.",
    "Wir speichern ausschließlich deine Auswahl lokal in deinem Browser (localStorage, kein Cookie). Du kannst sie jederzeit über die Datenschutz-Einstellungen im Footer ändern.",
  ],
  acceptLabel: "Akzeptieren",
  rejectLabel: "Ablehnen",
  footnote: "Deine Auswahl kannst du jederzeit im Footer ändern.",
  settingsLabel: "Datenschutz-Einstellungen",
  blockedTitle: "Das Formular ist noch ausgeblendet.",
  blockedText:
    "Das Anmeldeformular wird von Brevo (Sendinblue) bereitgestellt und erst nach deiner Zustimmung geladen. Du kannst deine Auswahl ändern oder das Formular selbst beim Anbieter öffnen.",
  changeLabel: "Einstellungen ändern",
  externalLabel: "Anmeldung extern öffnen ↗",
};
