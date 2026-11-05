import assert from "node:assert/strict";
const base = process.env.TEST_URL || "http://localhost:3000";
const targets = new Set([
  "/",
  "/about-us",
  "/anmeldung",
  "/icon.png",
  "/apple-icon.png",
]);
for (const route of ["/", "/about-us", "/anmeldung"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Single H1: ${route}`);
  assert.ok(html.includes('lang="de"'));
  assert.ok(html.includes('name="description"'));
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
    const path = match[1].replaceAll("&amp;", "&");
    if (!path.startsWith("//")) targets.add(path);
  }
  if (route === "/anmeldung") {
    assert.ok(html.includes("Die Anmeldung wird in Kürze freigeschaltet."));
    assert.ok(!html.includes("<form"));
  }
  console.log(`PASS page and metadata ${route}`);
}
for (const target of targets) {
  const response = await fetch(base + target);
  assert.equal(response.status, 200, `Resource: ${target}`);
}
console.log(`PASS ${targets.size} internal pages, links and resources`);
assert.equal((await fetch(base + "/does-not-exist")).status, 404);
console.log("PASS 404");
