// Nur hier ändern. Ohne URL führen sämtliche Anmeldelinks zur Informationsseite.
export const registration: { registrationUrl: string; mode: "link" | "embed" } =
  {
    registrationUrl: "",
    mode: "link",
  };
export const registrationHref =
  registration.registrationUrl && registration.mode === "link"
    ? registration.registrationUrl
    : "/anmeldung";
