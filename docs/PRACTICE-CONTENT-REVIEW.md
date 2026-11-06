# Expanded practice guides — attorney review draft

Prepared November 6, 2026. All six guides are marked **Attorney review required before publication** on the page and in their content files. No attorney approval is represented. The existing site-wide default noindex policy remains in place; this work does not enable indexing or publish the site.

## Editing

Each guide has an independent JSON file in `src/data/practice-guides/`. The shared types/registry are in that directory's `index.ts`; the server-rendered template is `src/app/practice/[slug]/page.tsx`. Existing service names, firm descriptions, and biography-supported attorney links remain in `src/data/practices.ts`. Page-specific styling is confined to the detail route's CSS module. The homepage, header, fonts, global styles, and existing URLs are unchanged by this expansion.

Each guide contains an introduction, concepts, service explanations, three expressly hypothetical scenarios, four general process stages, six FAQs, related-practice links, and linked primary references. The shared template supplies the draft notice, informational disclaimer, breadcrumbs, firm-scope attribution, portraits, and contact band. Native HTML `details`/`summary` provides keyboard-operable FAQs without client JavaScript. The FAQ structured data uses the same questions and answers as the visible content. Structured data does not promise search rich results.

## Firm capability evidence

The existing source archive in `research/` contains the firm's practice page, history, directory, and individual biographies reviewed November 5, 2026. The firm's practice list and history were also located in web search November 6; direct retrieval of those pages timed out. Search results can contain retired attorneys, so no additional attorney was added based on search snippets. Confirm the roster and scope with the firm before release.

- Published service headings and subservices: https://www.lasserhochman.com/practice
- Published commercial, property, litigation, and institutional context: https://www.lasserhochman.com/about
- Biography sources: each attorney's `source` field in `src/data/attorneys.json`, with matching archived HTML in `research/`.

The educational explanations are new editorial content, not statements that the firm has handled the hypothetical matters or achieved particular results. No case outcomes, testimonials, credentials, awards, or additional service lines were created.

| Guide                              | Biography-supported attorney links                                                                                                                                                                                                  | Focus for attorney verification                                                                                                                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Real Property Tax Appeals          | Richard C. Stewart: real property tax appeals                                                                                                                                                                                       | Valuation framework, assessment ratios, forum, filing and payment requirements, entity representation, appraisal discussion. No numerical deadline is supplied.                                                                                                            |
| Real Estate                        | Richard L. Zucker; Richard C. Stewart; Helane A. Kipnees; Gregory P. Konzelman; Daniel Bibergal; Ryan S. Shore; Robert K. Brown; Patrick B. Sprouls; Rand M. Agins: published real estate, finance, transaction, or land use fields | Transaction and leasing explanations, due diligence, financing and municipal approval terminology, property-tax connections.                                                                                                                                               |
| Litigation Matters                 | Sheppard A. Guryan; Richard L. Zucker; Bruce H. Snyder: published commercial/business/property litigation fields                                                                                                                    | Dispute descriptions, remedies, trial/appeal distinctions, mediation and deadlines, bankruptcy stay discussion, current employment and environmental scope. These broader categories are confirmed at firm level, not attributed to every linked lawyer.                   |
| Corporate Law                      | David Silver: business                                                                                                                                                                                                              | Entity and governance explanations, formation versus registration, personal guarantees, client identity/conflicts, current commercial/banking, employment and bankruptcy scope. The latter categories are firm-level listings, not added to Silver's individual biography. |
| Estate Planning and Administration | David Silver: estate planning and administration; Maryjane D. Cowell: estate administration                                                                                                                                         | Will/trust/beneficiary coordination, fiduciary duties, probate versus contested proceedings, distributions, intestacy, and federal/state tax distinctions. Cowell is not described as an estate-planning attorney.                                                         |
| Taxation                           | David Silver: taxation                                                                                                                                                                                                              | Federal/state distinctions, LLC classification, business and estate intersections, gift reporting versus payment, and division of responsibilities with accountants. Audit defense, return preparation, and other unconfirmed offerings are not advertised.                |

## Educational references

Primary references are linked in each guide's Further reading section. They provide general context and are not an exhaustive authority for every sentence. Legal accuracy and applicability of the newly written copy still require attorney verification.

- Property tax: New Jersey Courts local property tax handbook and Tax Court rules handbook.
- Real estate: New Jersey Department of Community Affairs planning/land use resources and Business.NJ.gov commercial leasing guidance.
- Litigation: New Jersey Courts Civil Division FAQ and complementary dispute resolution guidance; United States Courts Bankruptcy Basics.
- Corporate: New Jersey Division of Revenue formation/registration guidance; IRS business structures and LLC classification guidance; United States Courts Bankruptcy Basics.
- Estates: Monmouth and Mercer County Surrogate guidance; New Jersey Division of Taxation inheritance/estate guidance; IRS estate/gift guidance.
- Tax: IRS business structure, LLC, and estate/gift resources; New Jersey Division of Taxation inheritance/estate guidance.

The guides deliberately omit tax rates, exemption amounts, filing-fee schedules, and numerical filing deadlines. That reduces avoidable maintenance but does not make the content attorney-approved. Before public release, verify the full copy and disclaimer, confirm services and attorney associations, and remove or replace the visible review notice only after actual approval. Do not label the content reviewed based solely on automated technical checks.

## Technical validation

Completed November 6, 2026:

- ESLint, TypeScript, and optimized production build passed; all six practice routes are statically generated.
- All 10 repository tests passed, including six guide contracts checking required sections, substantive FAQs, valid related practice slugs, source links, and draft status.
- Production route smoke check passed for 25 pages and 61 internal resources, including metadata uniqueness, canonical URLs, structured data, sitemap, default noindex, redirects, and 404 handling.
- Chromium checks passed for all six guides at 320, 375, 768, 1024, and 1440 pixels with no horizontal overflow. All 36 FAQ items opened with Enter and closed with Space. FAQ schema matched the visible data, section anchors resolved, all 22 linked internal destinations returned successfully, and no page runtime errors were observed.
- A representative FAQ was also tested with JavaScript disabled. Light/dark themes and the mobile dark FAQ view were checked; desktop overview, services, FAQ rows, and attorney portraits were visually inspected. Established portrait CSS and scroll reveal are reused.

These are technical checks, not legal approval or a claim of an accessibility certification or search ranking.
