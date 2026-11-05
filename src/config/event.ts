// Zentrale Eventdaten: Hier ändern, damit alle Seiten automatisch mitziehen.
const dateISO = "2026-12-05";

// Fester Wochentag statt Intl-Formatierung: Das Ergebnis ist auf jedem
// Build-System identisch, unabhängig von den installierten Sprachdaten.
const weekdayNames = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const weekdayLong =
  weekdayNames[new Date(`${dateISO}T12:00:00Z`).getUTCDay()];

export const event = {
  name: "50 Loop Sulmlof Challenge",
  shortName: "Hummelhof 50K",
  date: "05.12.2026",
  dateLong: "5. Dezember 2026",
  dateISO,
  weekdayLong,
  location: "Hummelhof",
  distance: 50,
  loops: 50,
  loopKm: 1,
  bestTime: "5:36",
  bestTimeLong: "5 Stunden und 36 Minuten",
};
