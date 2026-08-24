# anuragnayak.ca — v6

Static-first website for Anurag Nayak, Insurance Advisor serving British Columbia, Alberta and Ontario.

## Core stack

- Jekyll 4.3
- GitHub source control
- Cloudflare Pages hosting
- Cloudflare Pages Functions / Workers for contact processing and CMS OAuth
- Cloudflare Turnstile for optional form anti-spam verification
- Decap CMS for browser-based content editing
- Zoho booking handoff at `https://booknow.anuragnayak.ca/discovery`

## v6 focus

v6 keeps the stable technical architecture and improves conversion and scanability:

- shorter hero with **Start with what you already have.**
- meaningful current-picture hero visual instead of a portrait
- interactive service explorer
- stronger Business Owners presentation
- shorter audience cards and homepage FAQ
- five published educational articles
- no public development/compliance placeholders
- progressive-enhancement fixes for the mobile menu and contact form

## Build

```bash
bundle install
bundle exec jekyll build
```

Cloudflare output directory: `_site`

## Preview safety

This repository is configured as a crawler-blocked preview with `robots.txt` and `_headers`. Follow `PRODUCTION_LAUNCH.md` before connecting the production domain.
