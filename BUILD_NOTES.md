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


## v8 visual refinements
- Increased desktop header brand, navigation and consultation CTA typography for clearer hierarchy.
- Increased header height slightly so the larger type has comfortable spacing.
- Kept the mobile header proportionate with a larger brand name and readable menu type.
- Enforced landscape article thumbnails with a block-level 16:9 media container so cards cannot stretch into tall cropped panels.
- Tightened article-card body typography and excerpt length on the homepage.
- Reduced secondary page H1 maximum size for a calmer visual hierarchy.
- Removed the duplicate generic content CTA from the Book page; the page now has one primary scheduling panel.


## V9 audit refinements
- Primary booking CTAs now open the live booking calendar directly; `/book/` remains an explainer linked as a secondary path.
- Booking links announce that they open in a new tab.
- Contact select controls use stable machine values while email delivery maps them back to readable labels.
- Contact controls now have explicit `id`/`for` pairs and province licensing guidance.
- Employee-benefits article SEO title shortened.
- Service/audience CTA labels are more context-specific.

## v10 testimonial update
- Added four client testimonials supplied by Anurag Nayak.
- Testimonials appear on the homepage after the advisor-background section and before Insights.
- The homepage shows a concise exact excerpt from each testimonial, with the full supplied wording available through an accessible native details control.
- Added a plain-language testimonial/investment-results disclosure.
- No star ratings, performance statistics or invented review data were added.
- Before production publication, retain written client permission and obtain any required compliance approval for testimonial use.


## v11 brand integration and round-five audit fixes
- Added optimized transparent web assets derived from the supplied light and dark AN logos.
- Header and footer now use the gold monogram on navy; browser/app icons use the two-tone mark.
- Added the monogram to the social-sharing card without changing its 1200x630 dimensions.
- Scoped Insights filtering to `button[data-category]` and generate filters from published post categories only.
- Raised inactive service-arrow contrast from the washed-out audit value to a WCAG-safe slate.
- Changed the Professionals CTA to `Book a Professional Consultation`.
- Added an above-the-fold booking-calendar CTA to the `/book/` hero and retained the lower scheduling CTA.
- Increased breadcrumb/footer link targets for touch comfort.
- Compressed the mobile homepage using 2x2 review tiles plus horizontal scroll-snap layouts for testimonials and homepage Insights.
- Added FAQPage entities to the existing JSON-LD graph only on pages that visibly render FAQ content, using the same source questions/answers as the accordions.
