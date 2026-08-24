# Cloudflare Pages deployment

## Pages build settings

- Framework: Jekyll
- Production branch: `main`
- Build command: `bundle exec jekyll build`
- Build output directory: `_site`
- Root directory: repository root

## Contact form bindings

The Pages Function at `functions/api/contact.js` expects:

- `CONTACT_WORKER` — Service Binding to the email-delivery Worker
- `CONTACT_SHARED_SECRET` — secret shared by the Pages Function and email Worker
- `TURNSTILE_SECRET` — optional but recommended Turnstile secret
- `FORM_RATE_LIMIT` — optional KV namespace used for a simple per-IP contact-form rate limit

The email Worker at `cloudflare/contact-email-worker.js` expects:

- `CONTACT_SHARED_SECRET`
- `FROM_EMAIL`
- `TO_EMAIL`
- `EMAIL` — Cloudflare Email service binding

## CMS OAuth Worker

Deploy `cloudflare/cms-oauth-worker.js` separately and configure:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `ALLOWED_ORIGIN`

Recommended route: `cms-auth.anuragnayak.ca/*`.

## Turnstile

Create a Turnstile widget for the production and preview domains. Add the public site key to `_data/site.yml` and store the secret only in Cloudflare environment variables.

## Analytics

No advertising or marketing pixels are installed by default. If Cloudflare Web Analytics is enabled later, update the privacy policy to match the actual configuration.
