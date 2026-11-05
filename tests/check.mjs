import assert from "node:assert/strict";

const base = process.env.TEST_URL || "http://localhost:3000";
const targets = new Set([
  "/",
  "/about-us",
  "/anmeldung",
  "/icon.png",
  "/apple-icon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

for (const route of ["/", "/about-us", "/anmeldung"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, `Seite: ${route}`);
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Ein H1: ${route}`);
  assert.ok(html.includes('lang="de"'), `Sprache: ${route}`);
  assert.ok(html.includes('name="description"'), `Beschreibung: ${route}`);
  assert.ok(html.includes('rel="canonical"'), `Canonical: ${route}`);
  assert.ok(html.includes('property="og:title"'), `Open Graph: ${route}`);
  assert.ok(html.includes("/images/logo.png"), `Logo: ${route}`);

  // Interne href-/src-Ziele einsammeln und später auf 200 prüfen.
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
    const path = match[1].replaceAll("&amp;", "&");
    if (!path.startsWith("//")) targets.add(path);
  }

  if (route === "/") {
    assert.ok(html.includes("SAMSTAG"), "Wochentag im Hero");
  }
  if (route === "/anmeldung") {
    assert.ok(html.includes("Die Anmeldung wird in Kürze freigeschaltet."));
    assert.ok(!html.includes("<form"), "Kein vorgetäuschtes Formular");
  }
  console.log(`PASS Seite und Metadaten ${route}`);
}

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
