// Fail closed: deployment labels alone never enable indexing.
export function indexingAllowed(env) {
  return (
    env.ENABLE_INDEXING === "true" &&
    env.APPROVED_PRODUCTION_ORIGIN === "https://www.lasserhochman.com" &&
    env.SITE_URL === env.APPROVED_PRODUCTION_ORIGIN &&
    env.VERCEL_ENV !== "preview" &&
    env.DEPLOYMENT_STAGE === "approved-production"
  );
}
export function siteOrigin(env) {
  const value =
    env.SITE_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000");
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("SITE_URL must use HTTP or HTTPS");
  return url.origin;
}
