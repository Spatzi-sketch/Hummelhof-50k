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
assert.ok(formUrl.startsWith("https://"), "Anmelde-URL verschlüsselt");

const targets = new Set([
  "/",
  "/about-us",
  "/anmeldung",
  "/icon.png",
  "/apple-icon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  ...photoFiles.map((f) => `/images/${f}`),
]);

let allHtml = "";
for (const route of ["/", "/about-us", "/anmeldung"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, `Seite: ${route}`);
  const html = await response.text();
  allHtml += html;
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
  }
  if (route === "/anmeldung") {
    assert.ok(html.includes(formUrl), "Echtes Formular verlinkt");
    assert.ok(
      !html.includes("Die Anmeldung wird in Kürze freigeschaltet."),
      "Alter Platzhaltertext entfernt",
    );
    assert.ok(!html.includes("<form"), "Kein eigenes Formular im HTML");
    assert.ok(
      !html.includes("<iframe"),
      "iframe erst nach Zustimmung, nicht im HTML",
    );
    assert.ok(
      html.includes("Das Formular ist noch ausgeblendet."),
      "Sperre ohne Zustimmung sichtbar",
    );
  }
  console.log(`PASS Seite und Metadaten ${route}`);
}
console.log("PASS Anmeldung: echte URL, Zustimmungssperre, kein Scheinformular");

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
for (const path of ["/about-us", "/anmeldung"]) {
  assert.ok(sitemap.includes(path), `Sitemap enthält ${path}`);
}
console.log("PASS robots.txt und sitemap.xml");

assert.equal((await fetch(base + "/does-not-exist")).status, 404);
console.log("PASS 404");
