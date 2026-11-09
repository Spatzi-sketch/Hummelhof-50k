// Zentrale Anmeldung: nur diese Datei ändern.
// Ohne URL führen alle Anmelde-Buttons zur Informationsseite /anmeldung.
type RegistrationConfig = {
  enabled: boolean;
  registrationUrl: string;
  mode: "link" | "embed";
  provider: string;
  embedTitle: string;
  embedHeight: number;
};

export const registration: RegistrationConfig = {
  // Die bestehende Anmeldung bleibt aktiv und wird nach Zustimmung eingebettet.
  enabled: true,
  registrationUrl:
    "https://f2bc5405.sibforms.com/serve/MUIFAFkZ0eoF_wu5a96GtTvc6qSs2ETbLwTXC3MRdgpZ537X5AZGbahA3uxiWmHbDH3gRG4W7QvTAJ5ERcFwb-6luiOGiyD3DP1wkPApvzUuKhuIe-2v2sPYlHV5Cz-O5fHZAtclWt1l7woJeB63NIseIrv9T4GJjpWVMmMoylcYzeymDsreuBAagwvh7r_poS-k-TXDRWyYngNU",
  // "embed" = Formular auf /anmeldung (erst nach Zustimmung geladen).
  // "link"  = alle Anmelde-Buttons öffnen das Formular direkt beim Anbieter.
  mode: "embed",
  provider: "Brevo (Sendinblue)",
  embedTitle: "Anmeldeformular für den Hummelhof 50K",
  // Höhe des iframe in Pixeln. Falls das Formular unten abgeschnitten wirkt,
  // diesen Wert erhöhen – sonst keine Änderung am Code nötig.
  embedHeight: 1000,
};

export const registrationHref =
  registration.enabled && registration.registrationUrl && registration.mode === "link"
    ? registration.registrationUrl
    : "/anmeldung";
