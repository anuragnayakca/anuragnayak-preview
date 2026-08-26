# Build notes — v7 audit correction and hero refinement

## Direction

v7 keeps the existing Jekyll + GitHub + Cloudflare Pages architecture. The latest audit showed that the technical foundation is strong; this revision fixes the three broken source pages, closes smaller audit items, and changes the hero from a process slogan to a visitor-facing question.

## Hero change

The v6 headline `Start with what you already have.` was useful as an internal philosophy, but it did not immediately tell a new visitor why the site matters.

v7 uses:

**How well do your insurance, benefits and investment options fit together?**

The supporting copy explains the audience and outcome. `Start with what you already have` is retained lower on the homepage as the review philosophy, where it has context.

The hero visual now resolves the four areas into **One Clearer Picture**.

## Audit blockers fixed

- Rebuilt the front matter fences in `contact.md`, `insights.html` and `privacy.md` so Jekyll applies the normal layout instead of exposing template code.
- Added a Jekyll post-write output guard that fails the build if any generated HTML page lacks a doctype or title.
- Styled non-JavaScript contact-form error responses with the public site stylesheet and branded page structure.
- Renamed the employee-benefits article so its title no longer duplicates the Employee Benefits service page.
- Added explicit related-article links from Personal Insurance, Business Insurance, Employee Benefits and Policy Reviews.
- Converted the five Insights thumbnails from PNG to WebP and updated article references.
- Increased mobile footer and legal-link tap targets.
- Added last-modified metadata to current public pages for sitemap freshness where supported by the sitemap generator.
- Added a compact native `<details>` service navigator on small screens so the homepage is materially shorter on mobile.

## Positioning retained

- Public title: **Insurance Advisor**.
- Licensed service area: British Columbia, Alberta and Ontario.
- Experience wording: **more than two decades in corporate IT across technical and leadership roles**.
- Technology remains a credibility differentiator, not an exclusive audience definition.
- Professionals, Business Owners and Families remain visually equal audience groups.

## Preview / production

The preview remains intentionally blocked from indexing. Follow `PRODUCTION_LAUNCH.md` before moving the production domain.
