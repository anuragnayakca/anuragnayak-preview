# anuragnayak.ca — v7

Static-first website for Anurag Nayak, Insurance Advisor serving British Columbia, Alberta and Ontario.

## Core stack

- Jekyll 4.3
- GitHub source control
- Cloudflare Pages hosting
- Cloudflare Pages Functions / Workers for contact processing and CMS OAuth
- Cloudflare Turnstile for optional form anti-spam verification
- Decap CMS for browser-based content editing
- Zoho booking handoff at `https://booknow.anuragnayak.ca/discovery`

## v7 focus

v7 keeps the stable technical architecture and closes the latest audit findings:

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
