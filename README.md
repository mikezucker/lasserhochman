# Lasser Hochman — Phase 1 website

A Vercel-ready Next.js 16.4 App Router application using TypeScript, Tailwind CSS 4, locally hosted Newsreader/Manrope fonts, and Motion for the mobile navigation. Server-rendered content, static public pages, no database, secrets, accounts, CMS, or contact submission endpoint. The contact page includes a clearly labeled prototype form with local validation; it does not send or store entries.

## Local development

Use Node.js 22 or 24 LTS and npm. The lockfile is committed. A scoped minimatch override patches a development-tool dependency; lint validation passes with it.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production checks:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# In a second terminal, while the production server is running:
node scripts/check-routes.mjs
```

`CHECK_URL` may override the smoke-check origin. Smoke tests expect the default noindex prototype configuration.

## Content and architecture

- `src/app/`: homepage, firm, directory, existing-root attorney slugs, practice overview/details, contact, draft privacy, sitemap, robots, social graphic, favicon, and 404.
- `src/components/`: shared layout, homepage contact band, links, heading/breadcrumbs, and lightweight progressive scroll reveal.
- `src/data/`: firm details, typed attorney data, and service content. Expanded practice guides are individually editable in `src/data/practice-guides/`; see `docs/PRACTICE-CONTENT-REVIEW.md` for sources and attorney review status. Content can later move to a CMS without redesigning page templates.
- `src/lib/`: metadata, JSON-LD, and the fail-closed indexing policy.
- `public/`: local portraits, architecture, history artwork, fonts and their licenses.
- `research/`: primary-source HTML evidence. `scripts/import-research.py` documents the one-time legacy profile import; do not rerun after hand-editing attorney data without review.
- `docs/CONTENT-AND-MIGRATION.md`: source inventory, preserved URLs, only verified redirect, content questions, and launch review.
- `docs/ASSETS.md`: image provenance and font licenses.

The homepage uses a split editorial hero, numbered service list, authentic attorney portraits, founding-year feature, and direct office contact. Motion is short and once-only, respects reduced motion, and does not hide useful content behind JavaScript. Header navigation includes a keyboard-contained mobile menu with Escape handling. The site has a skip link, visible focus, semantic landmarks, responsive image sizing, and no third-party embedded widgets.

## Deploy a separate Vercel prototype

Do not change the firm's current Vercel projects or domains.

1. Push this repository/branch to `mikezucker/lasserhochman`.
2. In Vercel, create a **new** project named `lasserhochman` if available, or a distinct prototype project if the name is already used. Import this repository; framework Next.js; root `.`; install `npm ci`; build `npm run build`; output default.
3. Set `SITE_URL` to that deployment's full HTTPS origin, `ENABLE_INDEXING=false`, and `DEPLOYMENT_STAGE=prototype`. Leave `APPROVED_PRODUCTION_ORIGIN` unset. No secrets are required. Use Vercel's generated hostname. No custom domain changes are needed.
4. Deploy and verify homepage, directory, a profile, a practice detail, contact, `/robots.txt`, `/sitemap.xml`, and `X-Robots-Tag`. Vercel production labels do **not** enable indexing. Redeploy when build-time environment settings change.

## Explicit final launch configuration

Only after the firm approves the content, policy, imagery, domain, migration, and launch, enable all four values on the approved production deployment:

```dotenv
SITE_URL=https://www.lasserhochman.com
APPROVED_PRODUCTION_ORIGIN=https://www.lasserhochman.com
ENABLE_INDEXING=true
DEPLOYMENT_STAGE=approved-production
```

Preview deployments remain noindex even with these values because `VERCEL_ENV=preview` takes precedence. Staging must retain `DEPLOYMENT_STAGE=prototype` and its own `SITE_URL`. Rebuild after any change. Both metadata and HTTP headers block indexing by default; robots.txt is an additional layer, not the sole protection. Noindex is not access control: enable Vercel deployment protection if private access is required.

## Phase 1 limitations

Privacy is a clearly labeled legal-review draft. Source-site facts are verified against published pages, not independently certified as current. Confirm the roster, credentials, imagery rights, copy, and required notices before production. Performance, accessibility, SEO and Core Web Vitals numbers are targets; no Lighthouse or real-user scores are claimed. See `docs/VALIDATION.md` for completed checks and verification limits.
