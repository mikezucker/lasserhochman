import test from "node:test";
import assert from "node:assert/strict";
import { indexingAllowed, siteOrigin } from "../src/lib/indexing.mjs";
const approved = {
  ENABLE_INDEXING: "true",
  APPROVED_PRODUCTION_ORIGIN: "https://www.lasserhochman.com",
  SITE_URL: "https://www.lasserhochman.com",
  DEPLOYMENT_STAGE: "approved-production",
  VERCEL_ENV: "production",
};
test("prototype and production-labeled deployments fail closed", () => {
  for (const env of [
    {},
    { VERCEL_ENV: "production" },
    { ENABLE_INDEXING: "true" },
    { ...approved, ENABLE_INDEXING: "false" },
    { ...approved, DEPLOYMENT_STAGE: "prototype" },
  ])
    assert.equal(indexingAllowed(env), false);
});
test("preview deployments and unapproved origins never become indexable", () => {
  for (const env of [
    { ...approved, VERCEL_ENV: "preview" },
    { ...approved, SITE_URL: "https://example.vercel.app" },
    { ...approved, APPROVED_PRODUCTION_ORIGIN: "https://example.com" },
    { ...approved, SITE_URL: "https://lasserhochman.com" },
  ])
    assert.equal(indexingAllowed(env), false);
});
test("only explicit approval of the final production origin enables indexing", () =>
  assert.equal(indexingAllowed(approved), true));
test("canonical origin uses deployment URL and never leaks paths", () => {
  assert.equal(
    siteOrigin({ VERCEL_URL: "prototype.vercel.app" }),
    "https://prototype.vercel.app",
  );
  assert.equal(
    siteOrigin({ SITE_URL: "https://www.lasserhochman.com/a" }),
    "https://www.lasserhochman.com",
  );
  assert.equal(siteOrigin({}), "http://localhost:3000");
  assert.throws(() => siteOrigin({ SITE_URL: "javascript:alert(1)" }));
});
