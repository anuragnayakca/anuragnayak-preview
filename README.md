# anuragnayak.ca — v11

Static-first website for Anurag Nayak, Insurance Advisor serving British Columbia, Alberta and Ontario.

## Core stack

- Jekyll 4.3
- GitHub source control
- Cloudflare Pages hosting
- Cloudflare Pages Functions / Workers for contact processing and CMS OAuth
- Cloudflare Turnstile for optional form anti-spam verification
- Decap CMS for browser-based content editing
- Zoho booking handoff at `https://booknow.anuragnayak.ca/discovery`

## Current focus

v8 keeps the stable technical architecture and closes the latest audit findings:

- visitor-facing hero question: **How well do your insurance, benefits and investment options fit together?**
- `Start with what you already have` retained as the review philosophy lower on the homepage
- repaired Contact, Insights and Privacy front matter
- build guard for pages missing the shared HTML shell
- compact mobile Services accordions
- five published educational articles with WebP thumbnails
- explicit service-to-article internal links
- improved mobile tap targets and styled contact-form error responses

## Build

```bash
bundle install
bundle exec jekyll build
```

Cloudflare output directory: `_site`

## Preview safety

This repository is configured as a crawler-blocked preview with `robots.txt` and `_headers`. Follow `PRODUCTION_LAUNCH.md` before connecting the production domain.


## V9 audit refinements
- Primary booking CTAs now open the live booking calendar directly; `/book/` remains an explainer linked as a secondary path.
- Booking links announce that they open in a new tab.
- Contact select controls use stable machine values while email delivery maps them back to readable labels.
- Contact controls now have explicit `id`/`for` pairs and province licensing guidance.
- Employee-benefits article SEO title shortened.
- Service/audience CTA labels are more context-specific.


## V11 brand and audit refinements
- Integrated the supplied AN monogram: gold mark on dark header/footer, two-tone mark for favicon/app icon, and a subtle mark on the social-sharing card.
- Insights category controls are now generated only from categories that have published posts.
- Insights JavaScript now binds category filtering only to filter buttons, not article cards.
- Increased inactive service-arrow contrast.
- Added a tailored Professionals booking label.
- Moved the first booking-calendar action into the /book/ page hero so it is above the fold.
- Increased breadcrumb/footer link target comfort.
- Reduced mobile homepage height with a 2x2 review grid and horizontal, swipeable testimonial and Insights cards.
