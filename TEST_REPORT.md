# Test and handoff report — v7

## Source checks completed

- Jekyll/YAML front-matter blocks recognized: **26 / 26 content files checked**.
- Malformed front-matter fences in Contact, Insights and Privacy: **fixed**.
- Duplicate SEO titles in source content: **0**.
- Literal internal route references missing from the known route set: **0**.
- Referenced article/brand images missing: **0**.
- JavaScript syntax: passed with `node --check` for public JS, the Pages Function and both Cloudflare Workers.
- CSS brace/parenthesis balance: matched.
- Published Insights articles: **5**.
- Five Insights thumbnails converted to WebP.
- Public `[CONFIRM BEFORE PUBLISHING]` markers: **0**.
- Public LLQP branding: **0**.

## Latest-audit items addressed

- Contact, Insights and Privacy front matter repaired.
- Build guard added so an output page missing `<title>` / document shell fails the Jekyll build.
- Employee Benefits article retitled to avoid competing with the service-page title.
- Related article links added to relevant service pages.
- Footer/mobile tap targets increased.
- Mobile service explorer replaced by compact native accordions below 620px.
- Contact error response now loads the site stylesheet and uses branded page components.
- Page `last_modified_at` metadata added to current non-post pages.

## Hero review

v7 replaces the process-led H1 with:

**How well do your insurance, benefits and investment options fit together?**

`Start with what you already have` remains as the philosophy of the next section, not the primary promise.

## Known limitation before production

A complete Jekyll render could not be run in this artifact environment because the Jekyll gem is not installed. Cloudflare Pages must perform the authoritative render after the package is pushed. The new output guard will fail that build if any generated HTML page is missing the shared page shell.

## Deployment checks after push

1. Verify `/contact/`, `/insights/` and `/privacy/` visually before reviewing anything else.
2. Confirm the Cloudflare build passes the new output guard.
3. Verify the hero CTA is above the fold at 1440×900 and 390px mobile width.
4. Check the compact Services accordions on mobile.
5. Submit an invalid contact form and confirm the error response looks branded.
6. Confirm all five Insights thumbnails load as `.webp`.
7. Re-run the external crawl/audit before production launch.
