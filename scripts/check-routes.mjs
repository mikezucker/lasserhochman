// Run against `npm start`: validates all public URLs and internal links.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const base = process.env.CHECK_URL || "http://localhost:3000";
const attorneys = JSON.parse(
  await readFile(
    new URL("../src/data/attorneys.json", import.meta.url),
    "utf8",
  ),
);
const pages = [
  "/",
  "/about",
  "/attorneys",
  "/practice",
  "/contact",
  "/privacy",
  ...attorneys.map((a) => `/${a.slug}`),
  ...[
    "real-property-tax-appeals",
    "real-estate",
    "litigation",
    "corporate-law",
    "estate-planning-and-administration",
    "taxation",
  ].map((p) => `/practice/${p}`),
];
const found = new Set();
const titles = new Set();
const descriptions = new Set();
for (const path of pages) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, path);
  assert.equal(
    res.headers.get("x-robots-tag"),
    "noindex, nofollow",
    `Indexing header ${path}`,
  );
  const html = await res.text();
  assert.match(
    html,
    /<meta name="robots" content="noindex, nofollow"\s*\/>/,
    path,
  );
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1 ${path}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title);
  assert.ok(!titles.has(title), `Unique title ${path}`);
  titles.add(title);
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  assert.ok(description, `Description ${path}`);
  assert.ok(!descriptions.has(description), `Unique description ${path}`);
  descriptions.add(description);
  assert.ok(html.includes('rel="canonical"'), `Canonical ${path}`);
  for (const script of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/g,
  ))
    JSON.parse(script[1]);
  for (const link of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g))
    found.add(link[1].replace(/&amp;/g, "&"));
}
for (const path of found) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, `Internal resource ${path}`);
}
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const path of pages)
  assert.ok(
    sitemap.includes(`<loc>${base}${path === "/" ? "" : path}</loc>`),
    `Sitemap ${path}`,
  );
const robots = await (await fetch(base + "/robots.txt")).text();
assert.match(robots, /Disallow: \//);
const redirect = await fetch(base + "/index", { redirect: "manual" });
assert.equal(redirect.status, 301);
assert.equal(redirect.headers.get("location"), "/");
assert.equal((await fetch(base + "/a-page-that-does-not-exist")).status, 404);
assert.equal((await fetch(base + "/practice/unknown")).status, 404);
const og = await fetch(base + "/opengraph-image");
assert.equal(og.status, 200);
assert.ok(og.headers.get("content-type")?.includes("image/png"));
console.log(
  `PASS: ${pages.length} pages, ${found.size} internal resources, unique titles/descriptions, optimized images, scripts, JSON-LD, canonical links, sitemap, robots, noindex headers, redirect, 404s, and social image.`,
);
