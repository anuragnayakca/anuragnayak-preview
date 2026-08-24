# Build notes — v6 conversion and visual simplification

## Direction

v6 keeps the Jekyll + GitHub + Cloudflare Pages architecture and focuses on conversion, scanability and progressive disclosure rather than another framework rebuild.

## Homepage changes

- Replaces the long mission-statement H1 with **Start with what you already have.**
- Moves the broad positioning statement into supporting copy.
- Replaces the hero portrait with a CSS-based current-picture visual connecting workplace benefits, personal insurance, investment options and responsibilities.
- Moves Anurag's professional photograph to the background/About section.
- Reduces homepage text density with shorter audience cards and four review points.
- Replaces six paragraph-heavy service cards with an interactive service explorer. Without JavaScript, the service labels remain normal links to the dedicated service pages.
- Adds a dedicated Business Owners spotlight for owner protection, key people, employee benefits and continuity.
- Reduces the homepage FAQ to four questions.
- Adds phone/email beside the final conversion section.

## Professional positioning

- Public title remains **Insurance Advisor**.
- Public LLQP wording has been removed.
- The preferred experience wording is **more than two decades in corporate IT across technical and leadership roles**.
- `From Technology to Financial Clarity` is retained as a secondary differentiator in the About/background section rather than the primary audience definition.

## Insights

Five educational articles are published in the build:

1. What Happens to Your Workplace Benefits When You Change Employers?
2. Workplace Life Insurance vs Personal Life Insurance: What Should You Review?
3. Disability Insurance: Questions to Ask When Your Income Depends on Your Ability to Work
4. Five Insurance Areas Business Owners May Want to Review
5. Employee Benefits for Small Businesses: What Should an Employer Consider?

Each includes a branded featured image and links to relevant Government of Canada / FCAC / CRA resources where factual guidance is referenced.

## Technical audit fixes

- Contact Pages Function accepts JSON, URL-encoded and multipart submissions.
- Native form submissions redirect to `/thank-you/` with HTTP 303 after success instead of returning raw JSON.
- Mobile navigation is progressively enhanced: it remains reachable without JavaScript and becomes collapsible when JavaScript is available.
- Remaining dark-panel eyebrow contrast was corrected.
- Important routing/social touch targets were enlarged.
- Meta descriptions and titles were refreshed across core pages.
- Public `[CONFIRM BEFORE PUBLISHING]` markers and draft labels were removed.
- FAQs remain on all six service pages and all three audience pages.

## Service-page presentation

Service-page content depth is retained, but the most important review areas are presented first in compact visual blocks. Limitations and the consultation process use accordions so the page is easier to scan without deleting useful educational content.

## Deployment dependencies

- CMS GitHub OAuth Worker still requires one-time configuration.
- Contact email Worker, optional Turnstile and optional KV rate limiting require Cloudflare bindings.
- Preview crawler blocking must be removed before the production domain is switched.
- Final compliance review should follow `COMPLIANCE_CHECKLIST.md`.
