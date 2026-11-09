import assert from "node:assert/strict";
import fs from "node:fs";

const base = process.env.TEST_URL || "http://localhost:3000";
const photoFiles = [
  "hero.webp",
  "about.webp",
  "location.webp",
  "community.webp",
  "sky.webp",
  "trail.webp",
  "grove.webp",
  "canopy.webp",
];

// Die Anmelde-URL kommt aus der zentralen Konfiguration; der Test liest sie
// dort aus, damit eine Änderung in registration.ts automatisch mitgeprüft wird.
const registrationConfig = fs.readFileSync(
  new URL("../src/config/registration.ts", import.meta.url),
  "utf8",
);
const urlMatch = registrationConfig.match(/registrationUrl:\s*"([^"]+)"/);
assert.ok(urlMatch, "Anmelde-URL in src/config/registration.ts");
const formUrl = urlMatch[1];
const registrationEnabled = /enabled:\s*true/.test(registrationConfig);
assert.ok(formUrl.startsWith("https://"), "Anmelde-URL verschlüsselt");

const targets = new Set([
  "/",
  "/about-us",
  "/faq",
  "/anmeldung",
  "/teilnahmebedingungen",
  "/icon.png",
  "/apple-icon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  ...photoFiles.map((f) => `/images/${f}`),
]);

let allHtml = "";
for (const route of ["/", "/about-us", "/faq", "/anmeldung", "/teilnahmebedingungen"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, `Seite: ${route}`);
  const html = await response.text();
  allHtml += html;
  // Nur das vorgerenderte HTML prüfen, nicht den ebenfalls enthaltenen React-Payload.
  const rendered = html.split("</body>")[0];
  const main = rendered.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
  const nav = rendered.match(/<nav\b[^>]*aria-label="Hauptnavigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || "";
  assert.match(nav, /href="\/"[\s\S]*href="\/about-us"[\s\S]*href="\/faq"[\s\S]*href="\/anmeldung"/, `Reihenfolge der Navigation: ${route}`);
  assert.match(rendered, /aria-label="Footernavigation"[\s\S]*href="\/faq"/, `FAQ im Footer: ${route}`);
  assert.match(rendered, /class="footer-legal"[\s\S]*Rechtliches[\s\S]*href="\/teilnahmebedingungen"/, `Rechtliches im Footer: ${route}`);
  assert.ok(!nav.includes("/teilnahmebedingungen"), `Keine rechtliche Seite in Hauptnavigation: ${route}`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Ein H1: ${route}`);
  assert.ok(html.includes('lang="de"'), `Sprache: ${route}`);
  assert.ok(html.includes('name="description"'), `Beschreibung: ${route}`);
  assert.ok(html.includes('rel="canonical"'), `Canonical: ${route}`);
  assert.ok(html.includes('property="og:title"'), `Open Graph: ${route}`);
  assert.ok(html.includes("/images/logo.png"), `Logo: ${route}`);
  assert.ok(
    !html.toLowerCase().includes("sulmlof"),
    `Alter Eventname auf ${route}`,
  );
  assert.ok(
    !html.includes("FOTOPLATZHALTER"),
    `Platzhalter-Label auf ${route}`,
  );
  assert.ok(
    html.includes("Datenschutz-Einstellungen"),
    `Zustimmung jederzeit änderbar: ${route}`,
  );

  // Interne href-/src-Ziele einsammeln und später auf 200 prüfen.
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
    const path = match[1].replaceAll("&amp;", "&");
    if (!path.startsWith("//")) targets.add(path);
  }

  if (route === "/") {
    assert.ok(html.includes("SAMSTAG"), "Wochentag im Hero");
    const heroCopy = main.match(/<div class="hero-copy"><p>([\s\S]*?)<\/p>/)?.[1].replaceAll("<!-- -->", "");
    assert.equal(heroCopy, "Ich bin 50 Kilometer im Hummelhofwald in 5:36 Stunden gelaufen. Am 5. Dezember machen wir daraus eine gemeinsame Challenge für die Laufcommunity.", "Einleitungstext exakt");
  }
  assert.ok(html.includes('href="/faq"'), `FAQ-Navigation: ${route}`);
  if (["/", "/faq", "/anmeldung"].includes(route)) {
    assert.ok(html.includes("09:00 Uhr") || html.includes("09:00 UHR"), `Startzeit: ${route}`);
    assert.ok(html.includes("08:15 Uhr"), `Startnummernausgabe: ${route}`);
    assert.ok(html.includes("48.275215%2C14.294004"), `Startpunkt-Koordinaten: ${route}`);
    assert.ok(html.includes("Pizzeria Tuana"), `Orientierung: ${route}`);
  }
  if (route === "/faq") {
    for (const text of ["Allgemeine Informationen", "Startort und Anreise", "Strecke und Orientierung", "Verpflegung und Versorgung", "Medaillen und Teilnahme", "Hatschekstraße", "41 und 43", "100 Meter", "gelben Bändern", "WC-Anlage", "Stromanschluss", "Wasserquelle", "Iso-Drink", "Riegeln", "Kuchen", "Bananen", "Medaille", "unabhängig davon", "kostenlos", "freiwillig"]) {
      assert.ok(main.toLowerCase().includes(text.toLowerCase()), `FAQ enthält ${text}`);
    }
    assert.ok(main.includes("Haltestelle+Hatschekstra%C3%9Fe+Linz"), "Haltestellenlink");
    assert.match(main, /Wer ist für die eigene Sicherheit während des Laufs verantwortlich\?[\s\S]*href="\/teilnahmebedingungen"[^>]*>hier<\/a>/, "FAQ-Haftungshinweis verlinkt");
    const faqItems = [...main.matchAll(/<details class="faq-item">([\s\S]*?)<\/details>/g)].map((match) => match[1]);
    const openCourse = faqItems.find((item) => item.includes("Ist die Strecke während der Veranstaltung gesperrt?"));
    assert.ok(openCourse && openCourse.includes("öffentlich zugänglich") && openCourse.includes("hat selbstverständlich Vorrang"), "Offene Strecke und Rücksichtnahme");
    const extraLaps = faqItems.find((item) => /Ist es möglich, mehr als (?:<!-- -->)?50(?:<!-- -->)? Runden zu laufen\?/.test(item));
    assert.ok(extraLaps && extraLaps.includes("keine Begrenzung nach oben") && extraLaps.includes("Eine nur teilweise absolvierte Runde") && /<strong>Wichtig für die Wertung:/.test(extraLaps), "Zusätzliche Runden und hervorgehobene Wertungsregel");
    assert.equal((main.match(/<details class="faq-item"/g) || []).length, 19, "Alle FAQ-Fragen nativ aufklappbar");
    assert.equal((main.match(/<summary>/g) || []).length, 19, "Jede FAQ hat eine Zusammenfassung");
  }
  if (route === "/anmeldung") {
    assert.match(main, /Bitte lies vor deiner Teilnahme unsere[\s\S]*href="\/teilnahmebedingungen"[^>]*>Teilnahmebedingungen und Haftungshinweise<\/a>/, "Anmeldungshinweis verlinkt");
    assert.ok(!html.includes("<form"), "Kein eigenes Formular im HTML");
    assert.ok(!html.includes("<iframe"), "Kein iframe ohne Zustimmung");
    if (registrationEnabled) {
      assert.ok(main.includes(formUrl), "Konfiguriertes Formular verlinkt");
      assert.ok(html.includes("Das Formular ist noch ausgeblendet."), "Sperre ohne Zustimmung sichtbar");
    } else {
      assert.ok(html.includes("Die Anmeldung wird in Kürze freigeschaltet."), "Anmeldung bleibt Platzhalter");
      assert.ok(!html.includes(formUrl), "Deaktiviertes Formular wird nicht verlinkt");
    }
  }
  if (route === "/teilnahmebedingungen") {
    for (const text of ["<h2>Haftung und Eigenverantwortung</h2>", "eigene Verantwortung und eigenes Risiko", "äußere Einflüsse", "Überlastungserscheinungen", "nicht gesperrt", "Gesetzlich zwingende Haftungsansprüche", "bei Personenschäden, bleiben davon unberührt."]) {
      assert.ok(main.includes(text), `Haftungshinweis enthält ${text}`);
    }
  }
  console.log(`PASS Seite und Metadaten ${route}`);
}
console.log("PASS Anmeldungsstatus und kein Scheinformular");

for (const file of photoFiles) {
  assert.ok(allHtml.includes(file), `Foto eingebunden: ${file}`);
}
console.log(`PASS alle ${photoFiles.length} Eventfotos auf den Seiten verwendet`);

for (const target of targets) {
  const response = await fetch(base + target);
  assert.equal(response.status, 200, `Ressource: ${target}`);
}
console.log(`PASS ${targets.size} interne Seiten, Links und Ressourcen`);

const robots = await (await fetch(base + "/robots.txt")).text();
assert.ok(robots.includes("Sitemap:"), "Sitemap in robots.txt");
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const path of ["/about-us", "/faq", "/anmeldung", "/teilnahmebedingungen"]) {
  assert.ok(sitemap.includes(path), `Sitemap enthält ${path}`);
}
console.log("PASS robots.txt und sitemap.xml");

assert.equal((await fetch(base + "/does-not-exist")).status, 404);
console.log("PASS 404");
