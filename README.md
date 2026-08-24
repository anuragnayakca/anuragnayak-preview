# anuragnayak.ca — Jekyll + Decap CMS + Cloudflare Pages

Static-first website for Anurag Nayak, Insurance Advisor licensed in British Columbia, Alberta and Ontario.

## Core stack

- Jekyll 4.3
- GitHub source control
- Cloudflare Pages hosting
- Cloudflare Pages Functions / Workers for contact processing and CMS OAuth
- Cloudflare Turnstile for optional form anti-spam verification
- Decap CMS for browser-based content editing
- Zoho booking handoff at `https://booknow.anuragnayak.ca/discovery`

## Build

```bash
bundle install
bundle exec jekyll build
```

Cloudflare output directory: `_site`

## Important

This repository is configured as a **preview build** with crawler blocking in `robots.txt` and `_headers`. Follow `PRODUCTION_LAUNCH.md` before connecting the production domain.
