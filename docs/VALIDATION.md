# Phase 1 validation

Validated November 5, 2026 against the local production build.

## Passed

- `npm run lint`: no errors or warnings.
- `npm run typecheck`: no TypeScript errors.
- `npm test`: four tests covering default noindex, misleading production labels, preview environments, unapproved origins, explicit launch opt-in, and canonical-origin selection.
- `npm run build`: Next.js 16.4.5 production build succeeds; all 25 public content pages prerender successfully, plus metadata assets and the not-found route.
- `node scripts/check-routes.mjs` against `npm start`: all 25 pages and 56 internal resources return 200. Checks include optimized image URLs, scripts/fonts/styles, unique titles and descriptions, exactly one H1 per page, canonical presence, parseable JSON-LD, complete sitemap, disallowed robots, per-page robots meta, HTTP noindex headers, the verified `/index` 301, unknown-path 404s, and the generated Open Graph PNG.
- `npm audit`: zero vulnerabilities, including development dependencies. A scoped override updates the TypeScript ESLint tooling's minimatch dependency; lint and build pass with it.
- Safari visual review through native app controls: desktop homepage, 768px tablet homepage, 390px mobile homepage/directory/profile/practice detail, and 320px mobile homepage/service list. The 320px check exposed header overflow; responsive wordmark sizing and dedicated 44px touch targets resolved it. No horizontal scrollbar remained in the corrected 320px view.
- Mobile menu opens, focuses its first link, closes with Escape, and restores focus to its trigger. Directory-to-profile navigation works. A sticky-header scroll issue discovered during client navigation was corrected and visually retested: breadcrumb and page heading now remain visible after navigation.
- Primary-source research, documented URL mapping, locally served assets and font licenses, draft privacy labeling, and deployment instructions are included.

## Limits and remaining launch work

- This is a prototype, not a production-domain deployment. No existing Vercel project, domain, or live site was modified.
- Safari responsive testing does not replace physical-device testing or cross-browser QA. Automated Lighthouse, axe, full keyboard/screen-reader audit, and real-user Core Web Vitals were not run. Performance 90+, accessibility 95+, SEO 100, LCP/CLS/INP are targets, not measured results. Intentional noindex can lower a prototype's Lighthouse SEO score.
- Reduced-motion support is implemented in CSS, the reveal component, and Motion; it still needs verification with the OS preference enabled on target devices.
- Confirm current facts and imagery rights with the firm, approve the privacy policy and required legal notices, and audit legacy orphan/`.php` URLs before the separate production launch. See `CONTENT-AND-MIGRATION.md`.
