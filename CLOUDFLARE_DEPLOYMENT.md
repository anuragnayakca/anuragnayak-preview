# Cloudflare Pages deployment

## Pages build settings

- Framework: Jekyll
- Production branch: `main`
- Build command: `bundle exec jekyll build`
- Build output directory: `_site`
- Root directory: repository root

## Contact form delivery

The Pages Function at `functions/api/contact.js` validates the form and sends the inquiry through the Resend REST API.

### Required Pages Variables and Secrets

In Cloudflare: **Workers & Pages → project → Settings → Variables and Secrets**.

Add for the **Production** environment:

- `RESEND_API_KEY` — **Secret**. Your Resend API key.
- `CONTACT_TO_EMAIL` — Plain text. Recommended: `contact@anuragnayak.ca`.
- `CONTACT_FROM_EMAIL` — Plain text. Recommended: `Anurag Nayak Website <website@forms.anuragnayak.ca>` after the `forms.anuragnayak.ca` sending domain is verified in Resend.

Optional:

- `TURNSTILE_SECRET` — Turnstile secret.
- `FORM_RATE_LIMIT` — KV namespace used for simple per-IP rate limiting.

After adding or changing Pages variables/secrets, redeploy the Pages project.

### Resend domain setup

Use a dedicated sending subdomain such as `forms.anuragnayak.ca` so existing Zoho Mail MX/SPF/DKIM records for the main domain are not replaced. Add only the DNS records Resend supplies for that subdomain, then verify it in Resend.

The form sends notifications to `contact@anuragnayak.ca` and sets the visitor's email as Reply-To.

## CMS OAuth Worker

Deploy `cloudflare/cms-oauth-worker.js` separately and configure:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `ALLOWED_ORIGIN=https://www.anuragnayak.ca`

Recommended route: `cms-auth.anuragnayak.ca/*`.

## Turnstile

Create a Turnstile widget for the production and preview domains. Add the public site key to `_data/site.yml` and store the secret only in Cloudflare environment variables.

## Analytics

No advertising or marketing pixels are installed by default. If Cloudflare Web Analytics is enabled later, update the privacy policy to match the actual configuration.
