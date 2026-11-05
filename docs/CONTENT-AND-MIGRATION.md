# Content inventory and URL migration

Reviewed November 5, 2026. Primary source: https://www.lasserhochman.com/ and its live linked pages. Raw HTML evidence is retained in `research/`. The source server's certificate chain could not be validated by the local HTTP client; these public research downloads used a client-local verification override. No server or system security settings were changed. Search cache disagreed with the live directory; the live directory takes precedence.

## Verified URL inventory

| Existing path | Prototype destination | Action                                               |
| ------------- | --------------------- | ---------------------------------------------------- |
| `/`           | `/`                   | Preserve                                             |
| `/index`      | `/`                   | Verified homepage navigation target; 301 implemented |
| `/about`      | `/about`              | Preserve firm history                                |
| `/attorneys`  | `/attorneys`          | Preserve directory                                   |
| `/practice`   | `/practice`           | Preserve service overview                            |
| `/contact`    | `/contact`            | Preserve contact details; no submission form         |
| `/guryan`     | `/guryan`             | Preserve Sheppard A. Guryan profile                  |
| `/zucker`     | `/zucker`             | Preserve Richard L. Zucker profile                   |
| `/silver`     | `/silver`             | Preserve David Silver profile                        |
| `/stewart`    | `/stewart`            | Preserve Richard C. Stewart profile                  |
| `/kipnees`    | `/kipnees`            | Preserve Helane A. Kipnees profile                   |
| `/konzelman`  | `/konzelman`          | Preserve Gregory P. Konzelman profile                |
| `/bibergal`   | `/bibergal`           | Preserve Daniel Bibergal profile                     |
| `/cowell`     | `/cowell`             | Preserve Maryjane D. Cowell profile                  |
| `/shore`      | `/shore`              | Preserve Ryan S. Shore profile                       |
| `/brown`      | `/brown`              | Preserve Robert K. Brown profile                     |
| `/sprouls`    | `/sprouls`            | Preserve Patrick B. Sprouls profile                  |
| `/snyder`     | `/snyder`             | Preserve Bruce H. Snyder profile                     |
| `/agins`      | `/agins`              | Preserve Rand M. Agins profile                       |

The legacy practice overview has headings and lists, but no linked individual practice detail pages. These new routes expand that verified content:

- `/practice/real-property-tax-appeals`
- `/practice/real-estate`
- `/practice/litigation`
- `/practice/corporate-law`
- `/practice/estate-planning-and-administration`
- `/practice/taxation`

`/privacy` is new and prominently marked as an unapproved draft. No approved privacy policy or advertising disclaimer was found in the reviewed site navigation/footer.

## Content decisions

- Address: 75 Eisenhower Parkway, Suite 120, Roseland, NJ 07068. Telephone: 973-226-2700. Fax: 973-226-0844. Verified against contact page and footer.
- Founding year: 1954. Founders and judicial history verified against `/about`.
- Exact six service headings come from `/practice`. Descriptive detail copy synthesizes the practice overview, firm history, and attorney profiles; it avoids new claims about results or specialization.
- Thirteen attorneys are linked in the live `/attorneys` page. Seven members, two associates, four of counsel. Their published admissions, education, practice areas, experience, and email addresses were transcribed from live profiles. Bio introductory sentences identify the published firm position and office location without adding experience claims.
- Search-indexed `/jurick`, `/cohen`, `/kool`, and `/burnham` are not on the live roster reviewed. Do not publish those people or redirect their biographies to unrelated attorneys. Obtain firm confirmation and Search Console/server analytics before migration decisions.
- Search results also expose `/attorneys.php/index` and `/bibergal.php`. Their intended canonical behavior needs a separate legacy URL audit. They are not speculative application redirects.
- The existing branding is a text firm name, not a distinct graphic logo in the reviewed header. This prototype supplies a typographic wordmark and LH favicon, pending firm approval.

## Canonical and redirect considerations

Paths above remain unchanged except `/index` → `/`. On the final approved domain, preserved paths retain their canonical URLs. Prototype canonicals use the actual deployment origin (`SITE_URL`, then `VERCEL_URL`) and are blocked from indexing. Set `SITE_URL` explicitly in each deployment environment so canonical, structured data, social URLs, and sitemap agree.

Before launch, obtain a complete legacy sitemap and analytics/Search Console export to audit `.php` variants, case differences, retired profiles, query strings, backlinks, and any orphan URLs. Match a redirect only to a factually relevant destination. Redirect HTTP/nonpreferred hosts at the approved hosting layer after domain authorization, outside Phase 1. No existing Vercel project or domain configuration was altered.

## Review before production

1. Confirm the live attorney roster, titles, credentials, biography accuracy, and current contact information. Legacy text may itself be stale.
2. Approve expanded service descriptions and related-attorney associations.
3. Confirm authorization for existing portrait and artwork reuse; these came from the firm's own public website for its redesign, but ownership contracts were not available.
4. Approve the new wordmark, headline, and other supplied/prototype editorial copy.
5. Finalize privacy policy and any applicable attorney advertising, confidentiality, and website-use notices with the firm. No unverified compliance claims or awards were added.
6. Verify the full legacy URL set before replacing the live website.
