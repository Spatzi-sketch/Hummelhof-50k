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
  name: "50 Loop Hummelhof Challenge",
  shortName: "Hummelhof 50K",
  date: "05.12.2026",
  dateLong: "5. Dezember 2026",
  dateISO,
  weekdayLong,
  location: "Hummelhofwald, Linz",
  distance: 50,
  loops: 50,
  loopKm: 1,
  bestTime: "5:36",
  bestTimeLong: "5 Stunden und 36 Minuten",
};

// Organisatorische Angaben werden auf allen Seiten aus dieser Konfiguration bezogen.
const arrivalTime = "08:15 Uhr";
export const schedule = {
  start: "09:00 Uhr",
  arrival: arrivalTime,
  bibPickup: arrivalTime,
};

const coordinates = { latitude: 48.275215, longitude: 14.294004 };
export const location = {
  start: {
    name: "Eingang Hummelhofwald",
    address: "Eingang Hummelhofwald, Hanuschstraße, Linz",
    orientation: "Gegenüber der Pizzeria Tuana",
    coordinates,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude}%2C${coordinates.longitude}`,
  },
  transit: {
    stop: "Hatschekstraße",
    lines: ["41", "43"],
    distance: "ungefähr 100 Meter",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Haltestelle+Hatschekstra%C3%9Fe+Linz",
  },
  parking: "In den umliegenden Siedlungen gibt es Parkmöglichkeiten. Bitte achtet auf die geltenden Parkregelungen und nehmt Rücksicht auf die Anwohner. Es gibt keine eigens reservierten Veranstaltungsparkplätze.",
};

const supplyReminder = "Plant eure Verpflegung selbstständig und bringt vor allem ausreichend eigene Getränke und nach Möglichkeit eigene Snacks mit. Vor Ort gibt es keine Wasserquelle zum Nachfüllen von Trinkflaschen oder Trinksystemen und keinen Stromanschluss.";

export const eventInfo = {
  participation: "Die Teilnahme ist kostenlos. Freiwillige Spenden zur Unterstützung des Events sind herzlich willkommen, aber selbstverständlich keine Voraussetzung für die Teilnahme.",
  refreshments: "Wir stellen eine gewisse Menge an warmem Iso-Drink, Riegeln, Kuchen und Bananen zur Verfügung. Bitte beachtet, dass diese Menge begrenzt ist.",
  supplyReminder,
  selfCatering: `${supplyReminder} Gerade bei ${event.distance} Kilometern ist es sinnvoll, auf die persönlichen Bedürfnisse vorbereitet zu sein. Plant eure Getränkeversorgung daher im Voraus und verlasst euch nicht ausschließlich auf die bereitgestellten Getränke und Snacks. Vielen Dank für euer Verständnis!`,
  toilets: "Auf der Laufrunde befindet sich eine öffentliche WC-Anlage, die während des Laufs genutzt werden kann.",
  markings: "Die Laufrunde ist mit gelben Bändern markiert. Achtet während des Laufs auf diese Markierungen, damit ihr dem vorgesehenen Streckenverlauf folgen könnt.",
  medal: "Alle angemeldeten Teilnehmer erhalten eine Medaille – unabhängig davon, wie viele Runden sie am Ende absolvieren. Uns ist wichtig, dass ihr Teil des Events seid und gemeinsam mit uns einen schönen Lauftag erlebt.",
};
