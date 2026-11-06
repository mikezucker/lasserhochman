import test from "node:test";
import assert from "node:assert/strict";
import { directionsUrl } from "../src/lib/directions.mjs";

const destination = "75 Eisenhower Parkway Suite 120 Roseland NJ 07068";
const web = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

test("iPhone and desktop-mode iPad receive Apple Maps driving directions", () => {
  for (const [ua, touch] of [["iPhone", 5], ["iPad", 5], ["Macintosh", 5]]) {
    const url = new URL(directionsUrl(web, ua, touch));
    assert.equal(url.hostname, "maps.apple.com");
    assert.equal(url.searchParams.get("daddr"), destination);
    assert.equal(url.searchParams.get("dirflg"), "d");
  }
});

test("Android leaves the map handler open and includes a browser fallback", () => {
  const url = directionsUrl(web, "Linux; Android 16");
  assert.ok(url.startsWith(`intent:0,0?q=${encodeURIComponent(destination)}#Intent;`));
  assert.ok(url.includes("scheme=geo;"));
  assert.ok(!url.includes("package="));
  assert.ok(url.includes(`S.browser_fallback_url=${encodeURIComponent(web)};end`));
});

test("desktop and unknown devices retain the working web directions", () => {
  for (const ua of ["Macintosh", "Windows NT", "Linux", ""]) {
    assert.equal(directionsUrl(web, ua), web);
  }
});
